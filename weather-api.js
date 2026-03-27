/* ====================================================
   KiruKi - Open-Meteo 天気APIモジュール
   データソース: Open-Meteo (https://open-meteo.com)
   ライセンス: CC BY 4.0 (非商用・無料・APIキー不要)
   ==================================================== */

const WeatherAPI = {

  // 各地域の代表座標
  REGION_COORDS: {
    hokkaido: { lat: 43.06, lon: 141.35, name: '北海道', city: '札幌市' },
    tohoku:   { lat: 38.27, lon: 140.87, name: '東北',   city: '仙台市' },
    kanto:    { lat: 35.69, lon: 139.69, name: '関東',   city: '東京都' },
    chubu:    { lat: 35.18, lon: 136.90, name: '中部',   city: '名古屋市' },
    kinki:    { lat: 34.69, lon: 135.50, name: '近畿',   city: '大阪市' },
    chugoku:  { lat: 34.40, lon: 132.46, name: '中国',   city: '広島市' },
    shikoku:  { lat: 33.56, lon: 133.53, name: '四国',   city: '高知市' },
    kyushu:   { lat: 33.59, lon: 130.42, name: '九州',   city: '福岡市' },
    okinawa:  { lat: 26.21, lon: 127.68, name: '沖縄',   city: '那覇市' },
  },

  CACHE_KEY:      'kiruki_weather_cache',
  CACHE_DURATION: 30 * 60 * 1000, // 30分キャッシュ

  // WMOコード → 日本語天気・絵文字
  _parseCode(code) {
    if (code === 0)               return { condition: '快晴',         icon: '🌞' };
    if (code === 1)               return { condition: '晴れ',         icon: '☀️' };
    if (code === 2)               return { condition: 'くもり時々晴れ', icon: '⛅' };
    if (code === 3)               return { condition: 'くもり',        icon: '☁️' };
    if (code <= 48)               return { condition: '霧',           icon: '🌫️' };
    if (code <= 55)               return { condition: '小雨',         icon: '🌦️' };
    if (code <= 65)               return { condition: '雨',           icon: '🌧️' };
    if (code <= 77)               return { condition: '雪',           icon: '🌨️' };
    if (code <= 82)               return { condition: 'にわか雨',      icon: '🌦️' };
    if (code <= 86)               return { condition: '雪時々雨',      icon: '🌨️' };
    return                               { condition: '雷雨',         icon: '⛈️' };
  },

  // 今日から7日分の曜日ラベル
  _dayLabels() {
    const WEEK  = ['日','月','火','水','木','金','土'];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      if (i === 0) return '今日';
      if (i === 1) return '明日';
      if (i === 2) return '明後日';
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return WEEK[d.getDay()];
    });
  },

  // APIレスポンス → JAPAN_WEATHER と同じ形式に変換
  _build(key, api) {
    const cur    = api.current;
    const daily  = api.daily;
    const coords = this.REGION_COORDS[key];
    const { condition, icon } = this._parseCode(cur.weather_code);
    const labels = this._dayLabels();

    const forecast = daily.time.slice(0, 7).map((_, i) => {
      const ww = this._parseCode(daily.weather_code[i]);
      return {
        day:  labels[i],
        icon: ww.icon,
        high: Math.round(daily.temperature_2m_max[i]),
        low:  Math.round(daily.temperature_2m_min[i]),
      };
    });

    return {
      name:      coords.name,
      city:      coords.city,
      temp:      Math.round(cur.temperature_2m),
      high:      Math.round(daily.temperature_2m_max[0]),
      low:       Math.round(daily.temperature_2m_min[0]),
      condition,
      icon,
      humidity:  Math.round(cur.relative_humidity_2m ?? 60),
      rain:      daily.precipitation_probability_max[0] ?? 0,
      uv:        Math.round(daily.uv_index_max[0] ?? 0),
      wind:      Math.round((cur.wind_speed_10m ?? 0) / 3.6), // km/h → m/s
      forecast,
      outfit:    [], // getAIOutfit() がホーム・地域詳細で自動生成する
    };
  },

  // 1地域をOpen-Meteoから取得
  async _fetchOne(key) {
    const { lat, lon } = this.REGION_COORDS[key];
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
      `&daily=temperature_2m_max,temperature_2m_min,weather_code,` +
      `precipitation_probability_max,uv_index_max` +
      `&timezone=Asia%2FTokyo&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  // キャッシュ読み込み (30分以内ならそのまま使う)
  _loadCache() {
    try {
      const raw = localStorage.getItem(this.CACHE_KEY);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts > this.CACHE_DURATION) return null;
      return data;
    } catch { return null; }
  },

  _saveCache(data) {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
    } catch {}
  },

  // 全9地域を並列fetch → JAPAN_WEATHER と同形式のオブジェクトを返す
  // 取得に失敗した地域はモックデータのまま
  async fetchAll() {
    const cached = this._loadCache();
    if (cached) return cached;

    const keys = Object.keys(this.REGION_COORDS);
    const results = await Promise.all(
      keys.map(key =>
        this._fetchOne(key)
          .then(api => ({ key, data: this._build(key, api) }))
          .catch(() => ({ key, data: null }))
      )
    );

    const weather = {};
    results.forEach(({ key, data }) => {
      weather[key] = data; // null なら呼び出し側でフォールバック
    });

    this._saveCache(weather);
    return weather;
  },

  // キャッシュを強制クリア（手動更新用）
  clearCache() {
    localStorage.removeItem(this.CACHE_KEY);
  }
};
