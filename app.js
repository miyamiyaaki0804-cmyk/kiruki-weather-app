/* ====================================================
   KiruKi - 着る気象アプリ  app.js
   ==================================================== */

// ===== MOCK DATA =====

const JAPAN_WEATHER = {
  hokkaido: {
    name: '北海道', city: '札幌市', temp: 3, high: 6, low: -1,
    condition: '雪', icon: '🌨️', humidity: 72, rain: 60, uv: 1, wind: 8,
    forecast: [
      { day: '今日', icon: '🌨️', high: 6, low: -1 },
      { day: '明日', icon: '☁️', high: 5, low: 0 },
      { day: '明後日', icon: '☁️', high: 8, low: 2 },
      { day: '木', icon: '🌤️', high: 10, low: 3 },
      { day: '金', icon: '☀️', high: 12, low: 4 },
      { day: '土', icon: '☀️', high: 11, low: 3 },
      { day: '日', icon: '⛅', high: 9, low: 1 },
    ],
    outfit: ['🧥 厚手ダウン', '🧤 手袋・マフラー', '👖 裏起毛パンツ', '🥾 ブーツ']
  },
  tohoku: {
    name: '東北', city: '仙台市', temp: 8, high: 12, low: 3,
    condition: 'くもり', icon: '☁️', humidity: 65, rain: 30, uv: 2, wind: 5,
    forecast: [
      { day: '今日', icon: '☁️', high: 12, low: 3 },
      { day: '明日', icon: '🌧️', high: 9, low: 4 },
      { day: '明後日', icon: '☁️', high: 11, low: 5 },
      { day: '木', icon: '🌤️', high: 14, low: 6 },
      { day: '金', icon: '☀️', high: 16, low: 7 },
      { day: '土', icon: '☀️', high: 17, low: 8 },
      { day: '日', icon: '⛅', high: 14, low: 6 },
    ],
    outfit: ['🧥 ウールコート', '👕 長袖シャツ', '👖 チノパン', '👟 スニーカー']
  },
  kanto: {
    name: '関東', city: '東京都', temp: 18, high: 23, low: 12,
    condition: 'くもり時々晴れ', icon: '⛅', humidity: 65, rain: 20, uv: 3, wind: 4,
    forecast: [
      { day: '今日', icon: '⛅', high: 23, low: 12 },
      { day: '明日', icon: '☀️', high: 25, low: 14 },
      { day: '明後日', icon: '☀️', high: 24, low: 13 },
      { day: '木', icon: '🌦️', high: 19, low: 11 },
      { day: '金', icon: '☁️', high: 17, low: 10 },
      { day: '土', icon: '🌧️', high: 15, low: 9 },
      { day: '日', icon: '⛅', high: 18, low: 11 },
    ],
    outfit: ['🧥 薄手ジャケット', '👕 長袖Tシャツ', '👖 デニム', '👟 スニーカー']
  },
  chubu: {
    name: '中部', city: '名古屋市', temp: 14, high: 19, low: 8,
    condition: '晴れ', icon: '☀️', humidity: 55, rain: 10, uv: 4, wind: 3,
    forecast: [
      { day: '今日', icon: '☀️', high: 19, low: 8 },
      { day: '明日', icon: '☀️', high: 21, low: 10 },
      { day: '明後日', icon: '⛅', high: 18, low: 9 },
      { day: '木', icon: '🌦️', high: 15, low: 8 },
      { day: '金', icon: '🌧️', high: 13, low: 7 },
      { day: '土', icon: '☁️', high: 14, low: 7 },
      { day: '日', icon: '⛅', high: 17, low: 9 },
    ],
    outfit: ['🧤 カーディガン', '👕 長袖シャツ', '👖 チノパン', '👟 スニーカー']
  },
  kinki: {
    name: '近畿', city: '大阪市', temp: 16, high: 21, low: 10,
    condition: '晴れ', icon: '☀️', humidity: 58, rain: 10, uv: 4, wind: 3,
    forecast: [
      { day: '今日', icon: '☀️', high: 21, low: 10 },
      { day: '明日', icon: '☀️', high: 22, low: 11 },
      { day: '明後日', icon: '⛅', high: 20, low: 10 },
      { day: '木', icon: '🌦️', high: 16, low: 9 },
      { day: '金', icon: '🌧️', high: 14, low: 8 },
      { day: '土', icon: '☁️', high: 15, low: 8 },
      { day: '日', icon: '⛅', high: 18, low: 10 },
    ],
    outfit: ['🧥 薄手コート', '👕 長袖カットソー', '👖 デニム', '👞 ローファー']
  },
  chugoku: {
    name: '中国', city: '広島市', temp: 14, high: 18, low: 8,
    condition: 'くもり', icon: '☁️', humidity: 70, rain: 35, uv: 2, wind: 5,
    forecast: [
      { day: '今日', icon: '☁️', high: 18, low: 8 },
      { day: '明日', icon: '⛅', high: 19, low: 9 },
      { day: '明後日', icon: '☀️', high: 20, low: 10 },
      { day: '木', icon: '🌦️', high: 16, low: 8 },
      { day: '金', icon: '🌧️', high: 13, low: 7 },
      { day: '土', icon: '☁️', high: 14, low: 7 },
      { day: '日', icon: '⛅', high: 16, low: 9 },
    ],
    outfit: ['🧥 ジャケット', '👕 長袖シャツ', '👖 スラックス', '👟 スニーカー']
  },
  shikoku: {
    name: '四国', city: '高知市', temp: 17, high: 22, low: 11,
    condition: '晴れ', icon: '☀️', humidity: 60, rain: 10, uv: 4, wind: 4,
    forecast: [
      { day: '今日', icon: '☀️', high: 22, low: 11 },
      { day: '明日', icon: '☀️', high: 23, low: 12 },
      { day: '明後日', icon: '⛅', high: 21, low: 11 },
      { day: '木', icon: '🌦️', high: 17, low: 9 },
      { day: '金', icon: '🌧️', high: 15, low: 8 },
      { day: '土', icon: '☁️', high: 16, low: 8 },
      { day: '日', icon: '☀️', high: 20, low: 10 },
    ],
    outfit: ['🧥 薄手ジャケット', '👕 長袖Tシャツ', '👖 デニム', '👟 スニーカー']
  },
  kyushu: {
    name: '九州', city: '福岡市', temp: 19, high: 24, low: 13,
    condition: '晴れ', icon: '☀️', humidity: 60, rain: 10, uv: 5, wind: 4,
    forecast: [
      { day: '今日', icon: '☀️', high: 24, low: 13 },
      { day: '明日', icon: '☀️', high: 25, low: 14 },
      { day: '明後日', icon: '⛅', high: 22, low: 13 },
      { day: '木', icon: '🌦️', high: 18, low: 11 },
      { day: '金', icon: '🌧️', high: 16, low: 10 },
      { day: '土', icon: '☁️', high: 17, low: 11 },
      { day: '日', icon: '☀️', high: 21, low: 12 },
    ],
    outfit: ['👕 薄手長袖', '👖 デニム', '👟 スニーカー']
  },
  okinawa: {
    name: '沖縄', city: '那覇市', temp: 24, high: 27, low: 21,
    condition: '晴れ', icon: '🌞', humidity: 75, rain: 20, uv: 7, wind: 6,
    forecast: [
      { day: '今日', icon: '🌞', high: 27, low: 21 },
      { day: '明日', icon: '☀️', high: 27, low: 22 },
      { day: '明後日', icon: '⛅', high: 26, low: 21 },
      { day: '木', icon: '🌦️', high: 25, low: 20 },
      { day: '金', icon: '🌦️', high: 24, low: 20 },
      { day: '土', icon: '☀️', high: 27, low: 21 },
      { day: '日', icon: '🌞', high: 28, low: 22 },
    ],
    outfit: ['👕 半袖Tシャツ', '🩳 ショートパンツ', '👟 サンダル', '🕶️ サングラス']
  }
};

const WEEK_DAYS = ['日', '月', '火', '水', '木', '金', '土'];

const FEELING_LABELS = {
  'too-cold': '🥶 寒すぎ',
  'cold': '😰 少し寒い',
  'perfect': '😊 ちょうど良い',
  'warm': '😅 少し暑い',
  'too-hot': '🥵 暑すぎ'
};

const FEELING_CHIP_CLASS = {
  'too-cold': 'chip-cold',
  'cold': 'chip-cold',
  'perfect': 'chip-perfect',
  'warm': 'chip-warm',
  'too-hot': 'chip-warm'
};

// Sample wardrobe + friends data (used if localStorage empty)
const SAMPLE_WARDROBE = [
  {
    id: 1, date: '2026-03-20', temp: 12, high: 16, low: 7,
    condition: '晴れ', icon: '☀️', outfit: 'ニット + デニム + スニーカー',
    feeling: 'perfect', comment: '気温のわりに風が弱く過ごしやすかった。',
    photo: null, emoji: '🧶', sharedFriends: true, sharedNational: false
  },
  {
    id: 2, date: '2026-03-15', temp: 8, high: 11, low: 4,
    condition: 'くもり', icon: '☁️', outfit: 'ダウンジャケット + タートルネック + チノパン',
    feeling: 'perfect', comment: 'ダウンがちょうどよかった。',
    photo: null, emoji: '🧥', sharedFriends: true, sharedNational: true
  },
  {
    id: 3, date: '2026-03-10', temp: 20, high: 24, low: 14,
    condition: '晴れ', icon: '☀️', outfit: '薄手シャツ + チノパン + スニーカー',
    feeling: 'warm', comment: '日中は暑くて上着不要だった。',
    photo: null, emoji: '👔', sharedFriends: false, sharedNational: true
  }
];

const SAMPLE_FRIENDS_FEED = [
  {
    user: 'Yuki', emoji: '🌸', location: '神奈川県・横浜市', temp: 17, condition: '晴れ', icon: '☀️',
    outfit: 'ベージュトレンチ + 白ブラウス + デニム', feeling: 'perfect',
    comment: 'トレンチ大活躍の季節になってきた！', date: '2時間前', photoEmoji: '🌸'
  },
  {
    user: 'Taro', emoji: '⚽', location: '大阪府・梅田', temp: 16, condition: '晴れ', icon: '☀️',
    outfit: 'パーカー + ジョガーパンツ + スニーカー', feeling: 'perfect',
    comment: '春らしくなってきた〜スポーツしやすい気温！', date: '4時間前', photoEmoji: '⚽'
  },
  {
    user: 'Hana', emoji: '🌺', location: '福岡県・天神', temp: 19, condition: '快晴', icon: '🌞',
    outfit: '薄手ニット + スカート + サンダル', feeling: 'warm',
    comment: '福岡はもう春本番！午後は少し暑かった', date: '昨日', photoEmoji: '🌺'
  }
];

const SAMPLE_NATIONAL_FEED = [
  {
    user: 'sapporo_fashion', emoji: '❄️', location: '北海道・札幌', temp: 3, condition: '雪', icon: '🌨️',
    outfit: 'ヘビーダウン + マフラー + ニット帽', feeling: 'cold',
    comment: 'まだまだダウン手放せません…東京が羨ましい', date: '1時間前', photoEmoji: '❄️'
  },
  {
    user: 'okinawa_life', emoji: '🏖️', location: '沖縄・那覇', temp: 24, condition: '晴れ', icon: '🌞',
    outfit: '半袖Tシャツ + ショートパンツ + サンダル', feeling: 'perfect',
    comment: 'もう夏！半袖で過ごせる最高の季節', date: '3時間前', photoEmoji: '🏖️'
  },
  {
    user: 'kyoto_style', emoji: '⛩️', location: '京都府・京都市', temp: 15, condition: '晴れ', icon: '☀️',
    outfit: '和洋折衷コーデ / 羽織 + ガウチョパンツ', feeling: 'perfect',
    comment: '桜が咲いてきた！観光客も増えてきたね', date: '5時間前', photoEmoji: '⛩️'
  },
  {
    user: 'sendai_snap', emoji: '🌸', location: '宮城県・仙台', temp: 8, condition: 'くもり', icon: '☁️',
    outfit: 'ウールコート + タートルネック + ブーツ', feeling: 'cold',
    comment: 'まだコートが手放せない仙台、早く桜が咲いてほしい', date: '8時間前', photoEmoji: '🌸'
  }
];

// ===== TEMPERATURE COLOR UTIL =====
function tempColor(temp) {
  if (temp < 0)  return '#6366F1';
  if (temp < 5)  return '#3B82F6';
  if (temp < 10) return '#06B6D4';
  if (temp < 15) return '#10B981';
  if (temp < 20) return '#84CC16';
  if (temp < 25) return '#F59E0B';
  if (temp < 30) return '#EF4444';
  return '#991B1B';
}

// ===== OUTFIT AI LOGIC =====
function getAIOutfit(temp, condition) {
  if (temp < 5) return {
    comment: '今日は非常に寒い一日です。しっかりとした防寒対策をしましょう。',
    items: [
      { emoji: '🧥', label: '厚手ダウンジャケット' },
      { emoji: '🧣', label: 'マフラー・手袋' },
      { emoji: '👕', label: '重ね着 (インナー+ニット)' },
      { emoji: '🥾', label: '防寒ブーツ' }
    ]
  };
  if (temp < 10) return {
    comment: '肌寒い一日です。暖かいアウターと重ね着がおすすめです。',
    items: [
      { emoji: '🧥', label: 'ウールコート' },
      { emoji: '👕', label: 'タートルネックニット' },
      { emoji: '👖', label: 'ウールパンツ' },
      { emoji: '👞', label: 'ローファーまたはブーツ' }
    ]
  };
  if (temp < 15) return {
    comment: '少し肌寒い気候です。薄手のアウターで体温調節しましょう。',
    items: [
      { emoji: '🧥', label: 'ジャケット・カーディガン' },
      { emoji: '👕', label: '長袖カットソー' },
      { emoji: '👖', label: 'チノパン' },
      { emoji: '👟', label: 'スニーカー' }
    ]
  };
  if (temp < 20) return {
    comment: `今日は${condition}で過ごしやすい気候です。軽めのアウターがあると安心。`,
    items: [
      { emoji: '🧥', label: '薄手ジャケット・パーカー' },
      { emoji: '👕', label: '長袖Tシャツ' },
      { emoji: '👖', label: 'デニムパンツ' },
      { emoji: '👟', label: 'スニーカー' }
    ]
  };
  if (temp < 25) return {
    comment: `春らしい${condition}の日です。長袖をベースに体温調節しやすい服装を。`,
    items: [
      { emoji: '👕', label: '薄手長袖 or 半袖' },
      { emoji: '🧤', label: '薄手カーディガン (朝夕用)' },
      { emoji: '👖', label: 'デニムまたはチノパン' },
      { emoji: '👟', label: 'スニーカー' }
    ]
  };
  if (temp < 30) return {
    comment: '暑くなってきました。通気性の良い素材を選んで快適に過ごしましょう。',
    items: [
      { emoji: '👕', label: '半袖Tシャツ' },
      { emoji: '🩳', label: 'ショートパンツ or 薄手パンツ' },
      { emoji: '🕶️', label: 'サングラス' },
      { emoji: '👟', label: 'サンダル or スニーカー' }
    ]
  };
  return {
    comment: '今日は非常に暑いです！熱中症に気をつけて、日差し対策を忘れずに。',
    items: [
      { emoji: '👕', label: '吸湿速乾の半袖' },
      { emoji: '🩳', label: 'ショートパンツ' },
      { emoji: '🧢', label: '帽子・日焼け止め必須' },
      { emoji: '👟', label: 'サンダル' }
    ]
  };
}

function getLaundryIndex(rain, humidity) {
  if (rain > 60) return '✕';
  if (rain > 30 || humidity > 75) return '△';
  if (rain < 20 && humidity < 60) return '◎';
  return '○';
}

// ===== STATE =====
const State = {
  started: false,
  currentView: 'home',
  currentGroup: 'personal',
  wardrobeFilter: 'all',
  selectedFeeling: null,
  photoDataUrl: null,
  wardrobe: [],

  init() {
    const saved = localStorage.getItem('kiruki_wardrobe');
    this.wardrobe = saved ? JSON.parse(saved) : [...SAMPLE_WARDROBE];
  },

  saveWardrobe() {
    localStorage.setItem('kiruki_wardrobe', JSON.stringify(this.wardrobe));
  }
};

// ===== APP =====
const App = {

  start() {
    State.started = true;
    State.init();
    document.getElementById('view-intro').classList.add('hidden');
    document.getElementById('bottom-nav').style.display = 'flex';
    this.navigate('home');
    this.initHome();
    this.initMap();
  },

  navigate(view) {
    // hide all
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(`view-${view}`).classList.add('active');
    const navEl = document.getElementById(`nav-${view}`);
    if (navEl) navEl.classList.add('active');

    State.currentView = view;

    if (view === 'wardrobe') this.renderWardrobe();
    if (view === 'groups') this.renderGroupFeed();
  },

  refreshWeather() {
    const btn = document.querySelector('.view-header .icon-btn');
    if (btn) { btn.style.transform = 'rotate(360deg)'; btn.style.transition = 'transform 0.5s'; setTimeout(() => { btn.style.transform = ''; btn.style.transition = ''; }, 500); }
    this.initHome();
    this.showToast('天気情報を更新しました');
  },

  // ===== HOME =====
  initHome() {
    const w = JAPAN_WEATHER.kanto;
    const now = new Date();

    // Header
    document.getElementById('today-date').textContent =
      `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日(${WEEK_DAYS[now.getDay()]})`;

    // Weather
    document.getElementById('weather-icon-main').textContent = w.icon;
    document.getElementById('temp-now').textContent = `${w.temp}°`;
    document.getElementById('temp-range').textContent = `最高 ${w.high}° / 最低 ${w.low}°`;
    document.getElementById('weather-desc').textContent = w.condition;
    document.getElementById('idx-humidity').textContent = `${w.humidity}%`;
    document.getElementById('idx-rain').textContent = `${w.rain}%`;
    document.getElementById('idx-uv').textContent = w.uv;
    document.getElementById('idx-laundry').textContent = getLaundryIndex(w.rain, w.humidity);

    // Week forecast
    const fc = document.getElementById('week-forecast');
    fc.innerHTML = '';
    w.forecast.forEach((d, i) => {
      const el = document.createElement('div');
      el.className = 'forecast-day' + (i === 0 ? ' today' : '');
      el.innerHTML = `
        <div class="forecast-dayname">${d.day}</div>
        <div class="forecast-icon">${d.icon}</div>
        <div class="forecast-high">${d.high}°</div>
        <div class="forecast-low">${d.low}°</div>
      `;
      fc.appendChild(el);
    });

    // AI outfit
    const ai = getAIOutfit(w.temp, w.condition);
    document.getElementById('ai-comment').textContent = ai.comment;
    const sug = document.getElementById('outfit-suggestion');
    sug.innerHTML = '';
    ai.items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'outfit-item';
      el.innerHTML = `<span class="outfit-emoji">${item.emoji}</span><span>${item.label}</span>`;
      sug.appendChild(el);
    });

    // Similar day
    this.showSimilarDay(w.temp);
  },

  showSimilarDay(temp) {
    const similar = State.wardrobe.find(item => Math.abs(item.temp - temp) <= 3);
    const section = document.getElementById('similar-day-section');
    if (!similar) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    const card = document.getElementById('similar-day-card');
    card.innerHTML = `
      <div style="font-size:2.5rem">${similar.emoji || '👕'}</div>
      <div>
        <div style="font-size:0.8rem;color:var(--text-sub)">${similar.date} / ${similar.temp}°C ${similar.icon}</div>
        <div style="font-weight:600;margin-top:3px">${similar.outfit}</div>
        <div style="font-size:0.8rem;color:var(--text-sub);margin-top:3px">${FEELING_LABELS[similar.feeling] || ''}</div>
      </div>
    `;
  },

  // ===== MAP =====
  initMap() {
    const now = new Date();
    const mapDate = document.getElementById('map-date');
    if (mapDate) mapDate.textContent = `${now.getMonth()+1}月${now.getDate()}日 現在`;

    Object.entries(JAPAN_WEATHER).forEach(([key, w]) => {
      const shape = document.getElementById(`shape-${key}`);
      const tempEl = document.getElementById(`rtemp-${key}`);
      if (shape) shape.setAttribute('fill', tempColor(w.temp));
      if (tempEl) tempEl.textContent = `${w.temp}°`;
    });
  },

  showRegion(key) {
    const w = JAPAN_WEATHER[key];
    if (!w) return;

    document.getElementById('modal-region-title').textContent = `${w.name} - ${w.city}`;

    const ai = getAIOutfit(w.temp, w.condition);
    const body = document.getElementById('modal-region-body');
    body.innerHTML = `
      <div style="text-align:center;font-size:3.5rem;margin-bottom:8px">${w.icon}</div>
      <div style="text-align:center;font-size:2.5rem;font-weight:800;margin-bottom:4px">${w.temp}°C</div>
      <div style="text-align:center;color:var(--text-sub);font-size:0.9rem;margin-bottom:14px">${w.condition}</div>
      <div class="region-detail-grid">
        <div class="region-detail-item">
          <div class="rdi-label">最高気温</div>
          <div class="rdi-val">${w.high}°</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">最低気温</div>
          <div class="rdi-val">${w.low}°</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">降水確率</div>
          <div class="rdi-val">${w.rain}%</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">UV指数</div>
          <div class="rdi-val">${w.uv}</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">湿度</div>
          <div class="rdi-val">${w.humidity}%</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">風速</div>
          <div class="rdi-val">${w.wind}m/s</div>
        </div>
      </div>

      <div style="font-size:0.82rem;font-weight:700;color:var(--text-sub);margin-bottom:8px">7日間予報</div>
      <div class="region-forecast">
        ${w.forecast.map(d => `
          <div class="rf-day">
            <div class="rf-name">${d.day}</div>
            <div class="rf-icon">${d.icon}</div>
            <div class="rf-temp">${d.high}°/${d.low}°</div>
          </div>
        `).join('')}
      </div>

      <div class="region-outfit-section">
        <h4>🤖 AIおすすめコーデ</h4>
        <div style="font-size:0.82rem;color:var(--text-sub);margin-bottom:8px">${ai.comment}</div>
        ${w.outfit.map(o => `<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:0.85rem">${o}</div>`).join('')}
      </div>
    `;

    this.openModal('modal-region');
  },

  // ===== WARDROBE =====
  renderWardrobe(filter) {
    filter = filter || State.wardrobeFilter;
    let items = [...State.wardrobe];

    if (filter === 'cold') items = items.filter(i => i.temp < 8);
    else if (filter === 'cool') items = items.filter(i => i.temp >= 8 && i.temp < 15);
    else if (filter === 'warm') items = items.filter(i => i.temp >= 15 && i.temp < 22);
    else if (filter === 'hot') items = items.filter(i => i.temp >= 22);

    const grid = document.getElementById('wardrobe-grid');
    const empty = document.getElementById('wardrobe-empty');

    if (items.length === 0) {
      grid.style.display = 'none';
      empty.style.display = 'block';
    } else {
      grid.style.display = 'grid';
      empty.style.display = 'none';
      grid.innerHTML = '';
      items.sort((a,b) => b.date.localeCompare(a.date)).forEach(item => {
        const card = document.createElement('div');
        card.className = 'wardrobe-card';
        card.onclick = () => this.showWardrobeItem(item.id);

        const photoContent = item.photo
          ? `<img src="${item.photo}" class="wardrobe-photo" alt="コーデ写真">`
          : `<div class="wardrobe-photo-placeholder">${item.emoji || '👕'}</div>`;

        card.innerHTML = `
          ${photoContent}
          <div class="wardrobe-info">
            <div class="wardrobe-date">${item.date}</div>
            <div class="wardrobe-temp">${item.icon} ${item.temp}°C</div>
            <div class="wardrobe-feeling">${FEELING_LABELS[item.feeling] || ''}</div>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  },

  filterWardrobe(filter, btn) {
    State.wardrobeFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.renderWardrobe(filter);
  },

  showWardrobeItem(id) {
    const item = State.wardrobe.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modal-item-title').textContent = item.date + 'のコーデ';

    const photoContent = item.photo
      ? `<img src="${item.photo}" class="item-detail-photo">`
      : `<div class="item-detail-photo">${item.emoji || '👕'}</div>`;

    document.getElementById('modal-item-body').innerHTML = `
      ${photoContent}
      <div class="item-detail-grid">
        <div class="item-detail-item">
          <div class="idi-label">気温</div>
          <div class="idi-val">${item.icon} ${item.temp}°C</div>
        </div>
        <div class="item-detail-item">
          <div class="idi-label">最高/最低</div>
          <div class="idi-val">${item.high}° / ${item.low}°</div>
        </div>
        <div class="item-detail-item">
          <div class="idi-label">天気</div>
          <div class="idi-val">${item.condition}</div>
        </div>
        <div class="item-detail-item">
          <div class="idi-label">体感</div>
          <div class="idi-val">${FEELING_LABELS[item.feeling] || '-'}</div>
        </div>
      </div>
      <div style="font-weight:700;margin-bottom:6px">👗 服装</div>
      <div class="item-comment" style="margin-bottom:10px">${item.outfit}</div>
      ${item.comment ? `<div style="font-weight:700;margin-bottom:6px">📝 メモ</div><div class="item-comment">${item.comment}</div>` : ''}
      <button onclick="App.deleteItem(${item.id})" style="width:100%;margin-top:16px;background:#FEE2E2;color:#991B1B;border:none;border-radius:50px;padding:12px;font-weight:700;cursor:pointer;font-size:0.9rem">
        🗑️ このコーデを削除
      </button>
    `;
    this.openModal('modal-item');
  },

  deleteItem(id) {
    if (!confirm('このコーデを削除しますか？')) return;
    State.wardrobe = State.wardrobe.filter(i => i.id !== id);
    State.saveWardrobe();
    this.closeModal('modal-item');
    this.renderWardrobe();
    this.showToast('コーデを削除しました');
  },

  // ===== LOG OUTFIT =====
  showLogOutfit() {
    State.selectedFeeling = null;
    State.photoDataUrl = null;

    document.getElementById('photo-preview').style.display = 'block';
    document.getElementById('photo-preview-img').style.display = 'none';
    document.getElementById('log-outfit-text').value = '';
    document.getElementById('log-comment').value = '';
    document.querySelectorAll('.feeling-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('log-share-friends').checked = true;
    document.getElementById('log-share-national').checked = false;

    const w = JAPAN_WEATHER.kanto;
    const now = new Date();
    document.getElementById('log-date-display').textContent =
      `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;
    document.getElementById('log-temp-display').textContent = `${w.temp}°C (最高${w.high}° 最低${w.low}°)`;
    document.getElementById('log-weather-display').textContent = `${w.icon} ${w.condition}`;

    this.openModal('modal-log');
  },

  previewPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      State.photoDataUrl = e.target.result;
      document.getElementById('photo-preview').style.display = 'none';
      const img = document.getElementById('photo-preview-img');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  },

  selectFeeling(btn, feeling) {
    document.querySelectorAll('.feeling-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    State.selectedFeeling = feeling;
  },

  saveOutfit() {
    const outfitText = document.getElementById('log-outfit-text').value.trim();
    if (!outfitText) {
      this.showToast('服装のメモを入力してください');
      return;
    }

    const w = JAPAN_WEATHER.kanto;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

    const emojis = ['👕','👗','🧥','🧶','👔','🥻','🩱','🧤'];
    const newItem = {
      id: Date.now(),
      date: dateStr,
      temp: w.temp, high: w.high, low: w.low,
      condition: w.condition, icon: w.icon,
      outfit: outfitText,
      feeling: State.selectedFeeling || 'perfect',
      comment: document.getElementById('log-comment').value.trim(),
      photo: State.photoDataUrl,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      sharedFriends: document.getElementById('log-share-friends').checked,
      sharedNational: document.getElementById('log-share-national').checked
    };

    State.wardrobe.unshift(newItem);
    State.saveWardrobe();
    this.closeModal('modal-log');
    this.showToast('✓ コーデを記録しました！');
    this.showSimilarDay(w.temp);

    if (State.currentView === 'wardrobe') this.renderWardrobe();
  },

  // ===== GROUPS =====
  renderGroupFeed() {
    const feed = document.getElementById('group-feed');
    feed.innerHTML = '';

    let posts = [];
    if (State.currentGroup === 'personal') {
      posts = State.wardrobe.slice(0, 10);
      if (posts.length === 0) {
        feed.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text-sub)">📸 まだコーデが記録されていません<br><br><button class="btn-start" onclick="App.showLogOutfit()" style="margin:0 auto">最初のコーデを記録</button></div>';
        return;
      }
      posts.forEach(item => {
        feed.appendChild(this.createPersonalFeedCard(item));
      });
      return;
    }

    posts = State.currentGroup === 'friends' ? SAMPLE_FRIENDS_FEED : SAMPLE_NATIONAL_FEED;

    // Inject user's shared items
    const myShared = State.wardrobe.filter(i =>
      State.currentGroup === 'friends' ? i.sharedFriends : i.sharedNational
    );
    if (myShared.length > 0) {
      feed.appendChild(this.createPersonalFeedCard(myShared[0]));
    }

    posts.forEach(post => {
      feed.appendChild(this.createFeedCard(post));
    });
  },

  createPersonalFeedCard(item) {
    const card = document.createElement('div');
    card.className = 'feed-card';
    const photoContent = item.photo
      ? `<img src="${item.photo}" style="width:100%;aspect-ratio:4/3;object-fit:cover">`
      : `<div class="feed-photo">${item.emoji || '👕'}</div>`;

    card.innerHTML = `
      <div class="feed-header">
        <div class="feed-avatar">🧑</div>
        <div>
          <div class="feed-user">あなた</div>
          <div class="feed-meta">${item.date}</div>
        </div>
        <div class="feed-location" style="margin-left:auto">📍 東京都</div>
      </div>
      ${photoContent}
      <div class="feed-body">
        <div class="feed-outfit">${item.outfit}</div>
        ${item.comment ? `<div class="feed-comment">${item.comment}</div>` : ''}
        <span class="feed-weather-chip">${item.icon} ${item.temp}°C ${item.condition}</span>
        <span class="feed-feeling-chip ${FEELING_CHIP_CLASS[item.feeling] || ''}">${FEELING_LABELS[item.feeling] || ''}</span>
      </div>
    `;
    return card;
  },

  createFeedCard(post) {
    const card = document.createElement('div');
    card.className = 'feed-card';
    const chipClass = FEELING_CHIP_CLASS[post.feeling] || 'chip-perfect';
    card.innerHTML = `
      <div class="feed-header">
        <div class="feed-avatar">${post.emoji}</div>
        <div>
          <div class="feed-user">${post.user}</div>
          <div class="feed-meta">${post.date}</div>
        </div>
        <div class="feed-location" style="margin-left:auto">📍 ${post.location}</div>
      </div>
      <div class="feed-photo">${post.photoEmoji}</div>
      <div class="feed-body">
        <div class="feed-outfit">${post.outfit}</div>
        <div class="feed-comment">${post.comment}</div>
        <span class="feed-weather-chip">${post.icon} ${post.temp}°C ${post.condition}</span>
        <span class="feed-feeling-chip ${chipClass}">${FEELING_LABELS[post.feeling] || ''}</span>
      </div>
    `;
    return card;
  },

  switchGroup(group, btn) {
    State.currentGroup = group;
    document.querySelectorAll('.group-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.renderGroupFeed();
  },

  // ===== MODAL =====
  openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  },

  // ===== TOAST =====
  showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }
};

// Init map colors on load (before start)
window.addEventListener('DOMContentLoaded', () => {
  Object.entries(JAPAN_WEATHER).forEach(([key, w]) => {
    const shape = document.getElementById(`shape-${key}`);
    if (shape) shape.setAttribute('fill', tempColor(w.temp));
  });
  document.getElementById('map-date') && (document.getElementById('map-date').textContent = '');
});
