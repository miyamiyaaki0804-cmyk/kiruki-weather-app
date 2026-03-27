/* ====================================================
   KiruKi - 着る気象アプリ  app.js
   ==================================================== */

// ===== OCCASION TAGS =====
const OCCASION_TAGS = [
  { id: 'univ',     emoji: '🎓', label: '大学・授業' },
  { id: 'work',     emoji: '💼', label: 'バイト・仕事' },
  { id: 'date',     emoji: '💕', label: 'デート' },
  { id: 'sports',   emoji: '⚽', label: 'スポーツ' },
  { id: 'party',    emoji: '🎉', label: '飲み会' },
  { id: 'shopping', emoji: '🛍️', label: 'ショッピング' },
  { id: 'home',     emoji: '🏠', label: 'おうち' },
  { id: 'travel',   emoji: '✈️', label: '旅行' },
  { id: 'outing',   emoji: '🎨', label: 'おでかけ' },
  { id: 'formal',   emoji: '👔', label: 'フォーマル' },
  { id: 'friends',  emoji: '🎮', label: '友達と遊ぶ' },
  { id: 'gym',      emoji: '🏋️', label: 'ジム' },
];

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

// ===== MOUNTAINS DATA =====
const MOUNTAINS = {
  fuji: {
    name: '富士山', elevation: 3776, region: 'chubu', emoji: '🗻',
    type: 'volcano',
    desc: '日本最高峰。山頂の気温は平地より約24°C低く、真夏でも氷点下になる。冬季は-30°C以下になることも。'
  },
  alps: {
    name: '北アルプス（穂高岳）', elevation: 3190, region: 'chubu', emoji: '🏔️',
    type: 'mountain',
    desc: '槍ヶ岳・穂高岳など3000m超が連なる日本アルプス最高峰地帯。高山植物と雪渓が美しい。'
  },
  hakusan: {
    name: '白山', elevation: 2702, region: 'chubu', emoji: '🏔️',
    type: 'mountain',
    desc: '石川・岐阜・福井・富山の県境に位置する霊山。日本三名山の一つ。山頂付近は万年雪が残る。'
  },
  daisetsu: {
    name: '大雪山', elevation: 2291, region: 'hokkaido', emoji: '🏔️',
    type: 'mountain',
    desc: '北海道の屋根。初雪は例年8月下旬で北海道に秋の到来を告げる。ヒグマの生息地でもある。'
  },
  aso: {
    name: '阿蘇山', elevation: 1592, region: 'kyushu', emoji: '🌋',
    type: 'volcano',
    desc: '世界最大級のカルデラを持つ活火山。火山活動により登山規制あり。農産物が育む大自然の恵みも。'
  }
};

// ===== AUTH MODULE =====
const Auth = {
  currentTab: 'login',

  switchTab(tab, btn) {
    this.currentTab = tab;
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('auth-login-form').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('auth-register-form').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('login-error').textContent = '';
    document.getElementById('reg-error').textContent = '';
  },

  async register() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    const errEl = document.getElementById('reg-error');
    const btn = document.querySelector('#auth-register-form .btn-auth-submit');
    if (!name || !email || !password) { errEl.textContent = '全ての項目を入力してください'; return; }
    if (password.length < 6) { errEl.textContent = 'パスワードは6文字以上必要です'; return; }
    btn.disabled = true; btn.textContent = '登録中...';
    try {
      const cred = await fbAuth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      const profile = { name, email, emoji: '😊', createdAt: Date.now() };
      await fbDb.ref(`users/${cred.user.uid}/profile`).set(profile);
      State.user = { id: cred.user.uid, email, name, emoji: '😊' };
      this.showLocationStep();
    } catch (e) {
      errEl.textContent = {
        'auth/email-already-in-use': 'このメールは既に登録されています',
        'auth/weak-password': 'パスワードは6文字以上必要です',
        'auth/invalid-email': 'メールアドレスの形式が正しくありません',
      }[e.code] || '登録に失敗しました。もう一度お試しください';
      btn.disabled = false; btn.textContent = '登録する →';
    }
  },

  async login() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    const btn = document.querySelector('#auth-login-form .btn-auth-submit');
    if (!email || !password) { errEl.textContent = 'メールとパスワードを入力してください'; return; }
    btn.disabled = true; btn.textContent = 'ログイン中...';
    try {
      const cred = await fbAuth.signInWithEmailAndPassword(email, password);
      const snap = await fbDb.ref(`users/${cred.user.uid}/profile`).once('value');
      const profile = snap.val() || {};
      State.user = {
        id: cred.user.uid,
        email: cred.user.email,
        name: profile.name || cred.user.displayName || 'ユーザー',
        emoji: profile.emoji || '😊',
      };
      if (!Location.load()) {
        this.showLocationStep();
      } else {
        App.launchApp();
      }
    } catch (e) {
      errEl.textContent = {
        'auth/user-not-found': 'メールアドレスが登録されていません',
        'auth/wrong-password': 'パスワードが違います',
        'auth/invalid-credential': 'メールアドレスまたはパスワードが違います',
        'auth/too-many-requests': 'しばらく時間をおいてから再試行してください',
        'auth/invalid-email': 'メールアドレスの形式が正しくありません',
      }[e.code] || 'ログインに失敗しました。もう一度お試しください';
      btn.disabled = false; btn.textContent = 'ログイン →';
    }
  },

  continueAsGuest() {
    State.user = { name: 'ゲスト', email: '', id: 'guest', emoji: '👤' };
    // ゲストは毎回位置情報ステップを表示（セッションが毎回新しいため）
    this.showLocationStep();
  },

  showLocationStep() {
    // フォームを隠して位置情報ステップを表示
    ['auth-login-form', 'auth-register-form'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    document.querySelector('.auth-tabs').style.display  = 'none';
    document.querySelector('.auth-divider').style.display = 'none';
    document.querySelector('.btn-auth-guest').style.display = 'none';
    document.getElementById('auth-location-step').style.display = 'block';
  },

  requestLocation() {
    if (!navigator.geolocation) {
      this._locError('お使いのブラウザは位置情報に対応していません。');
      return;
    }
    const btn = document.getElementById('btn-loc-allow');
    btn.innerHTML = '<span style="display:inline-block;animation:spin 1s linear infinite">📡</span> 取得中...';
    btn.disabled = true;
    btn.style.opacity = '0.75';

    // ステップ1: ネットワーク測位（速い・省電力）で試行
    navigator.geolocation.getCurrentPosition(
      (pos) => this._locSuccess(pos),
      (err) => {
        if (err.code === 1) {
          // PERMISSION_DENIED: ユーザーが拒否
          this._locError(
            '位置情報が拒否されました。<br>' +
            'ブラウザの設定から許可を変更するか、スキップしてください。'
          );
        } else {
          // POSITION_UNAVAILABLE or TIMEOUT: GPSで再試行
          navigator.geolocation.getCurrentPosition(
            (pos) => this._locSuccess(pos),
            () => this._locError('位置情報を取得できませんでした。<br>電波の良い場所で再試行するか、スキップしてください。'),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
          );
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  },

  _locSuccess(pos) {
    const { latitude, longitude } = pos.coords;
    const region = Location.findNearestRegion(latitude, longitude);
    Location.save(region, latitude, longitude);
    App.launchApp();
  },

  _locError(msg) {
    const btn = document.getElementById('btn-loc-allow');
    btn.textContent = '📍 もう一度試す';
    btn.disabled = false;
    btn.style.opacity = '1';
    const note = document.querySelector('.loc-step-note');
    if (note) { note.innerHTML = '⚠️ ' + msg; note.style.color = '#DC2626'; }
  },

  skipLocation() {
    App.launchApp();
  }
};

// ===== LOCATION UTIL =====
const Location = {
  REGIONS: {
    hokkaido: { lat: 43.06, lon: 141.35, label: '北海道・札幌市' },
    tohoku:   { lat: 38.27, lon: 140.87, label: '東北・仙台市' },
    kanto:    { lat: 35.69, lon: 139.69, label: '関東・東京都' },
    chubu:    { lat: 36.65, lon: 137.21, label: '中部・名古屋市' },
    kinki:    { lat: 34.69, lon: 135.50, label: '近畿・大阪府' },
    chugoku:  { lat: 34.40, lon: 132.46, label: '中国・広島市' },
    shikoku:  { lat: 33.56, lon: 133.53, label: '四国・高知市' },
    kyushu:   { lat: 33.59, lon: 130.42, label: '九州・福岡市' },
    okinawa:  { lat: 26.21, lon: 127.68, label: '沖縄・那覇市' }
  },

  findNearestRegion(lat, lon) {
    let nearest = 'kanto', minDist = Infinity;
    for (const [key, r] of Object.entries(this.REGIONS)) {
      const d = Math.hypot(lat - r.lat, lon - r.lon);
      if (d < minDist) { minDist = d; nearest = key; }
    }
    return nearest;
  },

  load() {
    const raw = localStorage.getItem('kiruki_location');
    return raw ? JSON.parse(raw) : null;
  },

  save(region, lat, lon) {
    localStorage.setItem('kiruki_location', JSON.stringify({ region, lat, lon }));
  },

  clear() {
    localStorage.removeItem('kiruki_location');
  }
};

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
  wardrobeFilter: 'cold',
  selectedFeeling: null,
  photoDataUrl: null,
  wardrobe: [],
  user: null,

  // ユーザー別のlocalStorageキー生成
  _key(base) {
    const uid = this.user?.id || 'guest';
    return `kiruki_${base}_${uid}`;
  },

  async init() {
    if (!State.user?.id || State.user.id === 'guest') {
      this.wardrobe = [];
      return;
    }
    try {
      const snap = await fbDb.ref(`users/${State.user.id}/wardrobe`).once('value');
      const data = snap.val();
      this.wardrobe = data
        ? Object.values(data).sort((a, b) => b.date.localeCompare(a.date))
        : [];
    } catch {
      // Fallback: localStorage
      const saved = localStorage.getItem(this._key('wardrobe'));
      this.wardrobe = saved ? JSON.parse(saved) : [];
    }
    // 招待コードを復元
    const code = localStorage.getItem(this._key('my_code'));
    if (code) {
      const el = document.getElementById('my-invite-code');
      if (el) el.textContent = code;
    }
  },

  saveWardrobe() {
    // localStorage にキャッシュ
    localStorage.setItem(this._key('wardrobe'), JSON.stringify(this.wardrobe));
    // Firebase Realtime Database に永続化（fire and forget）
    if (State.user?.id && State.user.id !== 'guest') {
      const obj = {};
      this.wardrobe.forEach(item => { obj[item.id] = item; });
      fbDb.ref(`users/${State.user.id}/wardrobe`).set(obj).catch(() => {});
    }
  }
};

// ===== APP =====
const App = {

  goToAuth() {
    document.getElementById('view-intro').classList.add('hidden');
    document.getElementById('view-auth').classList.add('active');
  },

  async launchApp() {
    State.started = true;
    await State.init();
    document.getElementById('view-auth').classList.remove('active');
    document.getElementById('view-auth').classList.add('slide-out');
    document.getElementById('bottom-nav').style.display = 'flex';
    this.navigate('home');
    this.initHome();
    this.initMap();
    // Update user name if shown
    if (State.user?.name) {
      const el = document.getElementById('my-invite-code');
      if (el && el.textContent === '------') {
        const saved = localStorage.getItem(State._key('my_code'));
        if (saved) el.textContent = saved;
      }
    }
    // リアルタイム天気をバックグラウンドで取得
    this._loadRealWeather();
  },

  async _loadRealWeather() {
    if (!window.WeatherAPI) return;
    try {
      const realData = await WeatherAPI.fetchAll();
      let updated = false;
      Object.entries(realData).forEach(([key, data]) => {
        if (data && JAPAN_WEATHER[key]) {
          Object.assign(JAPAN_WEATHER[key], data);
          updated = true;
        }
      });
      if (updated) {
        this.initHome();
        this.initMap();
        this.showToast('🌤️ リアルタイム天気に更新しました');
      }
    } catch {
      // サイレントフェイル: モックデータのまま継続
    }
  },

  // Legacy alias
  start() { this.goToAuth(); },

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
    if (view === 'profile') Profile.render();
  },

  refreshWeather() {
    const btn = document.querySelector('.view-header .icon-btn');
    if (btn) { btn.style.transform = 'rotate(360deg)'; btn.style.transition = 'transform 0.5s'; setTimeout(() => { btn.style.transform = ''; btn.style.transition = ''; }, 500); }

    // キャッシュをクリアして最新データを取得
    if (window.WeatherAPI) WeatherAPI.clearCache();

    const afterGeo = () => {
      if (window.WeatherAPI) {
        WeatherAPI.fetchAll().then(realData => {
          Object.entries(realData).forEach(([key, data]) => {
            if (data && JAPAN_WEATHER[key]) Object.assign(JAPAN_WEATHER[key], data);
          });
          this.initHome();
          this.initMap();
          this.showToast('🌤️ 天気情報を更新しました');
        }).catch(() => {
          this.initHome();
          this.showToast('天気情報を更新しました');
        });
      } else {
        this.initHome();
        this.showToast('天気情報を更新しました');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const region = Location.findNearestRegion(pos.coords.latitude, pos.coords.longitude);
          Location.save(region, pos.coords.latitude, pos.coords.longitude);
          afterGeo();
        },
        () => afterGeo(),
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      afterGeo();
    }
  },

  // ===== HOME =====
  initHome() {
    // 位置情報から地域を決定
    const locData = Location.load();
    const regionKey = locData ? locData.region : 'kanto';
    const w = JAPAN_WEATHER[regionKey] || JAPAN_WEATHER.kanto;
    const now = new Date();

    // Header location
    const locLabel = locData
      ? (Location.REGIONS[regionKey]?.label || w.city)
      : w.city;
    document.getElementById('location-name').textContent = locLabel;

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
      el.setAttribute('title', `${d.day}の服装プランを見る`);
      el.innerHTML = `
        <div class="forecast-dayname">${d.day}</div>
        <div class="forecast-icon">${d.icon}</div>
        <div class="forecast-high">${d.high}°</div>
        <div class="forecast-low">${d.low}°</div>
        <div class="forecast-tap-hint">👆</div>
      `;
      el.onclick = () => App.showDayPlan(d, i);
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

  showDayPlan(d, dayIndex) {
    // 気温推定: 朝=低め, 昼=最高, 夕=中間, 夜=最低
    const swing = d.high - d.low;
    const morn  = Math.round(d.low  + swing * 0.15);
    const noon  = d.high;
    const eve   = Math.round(d.low  + swing * 0.35);
    const night = d.low;
    const avgTemp = Math.round((d.high + d.low) / 2);

    // 降水リスク推定 (iconから)
    const hasRain = /🌧️|🌦️|☔|🌨️/.test(d.icon);
    const hasSnow = /🌨️|❄️/.test(d.icon);

    // AI outfitを朝・昼・夜それぞれ生成
    const outfitMorn  = getAIOutfit(morn,  hasRain ? '雨' : '晴れ');
    const outfitNoon  = getAIOutfit(noon,  hasRain ? '雨' : '晴れ');
    const outfitNight = getAIOutfit(night, '曇り');

    // 一日通じたアドバイス
    let dayAdvice = '';
    if (swing >= 10) dayAdvice += '⚠️ <strong>気温差が大きい日</strong>です。脱ぎ着しやすい重ね着を。';
    if (hasRain)     dayAdvice += (dayAdvice ? '<br>' : '') + '☔ 雨が予想されます。<strong>折り畳み傘</strong>を忘れずに。';
    if (hasSnow)     dayAdvice += (dayAdvice ? '<br>' : '') + '❄️ 雪の可能性あり。<strong>防水・滑り止め</strong>の靴がおすすめ。';
    if (noon >= 28)  dayAdvice += (dayAdvice ? '<br>' : '') + '🌡️ <strong>熱中症注意</strong>。こまめな水分補給を。';
    if (noon <= 5)   dayAdvice += (dayAdvice ? '<br>' : '') + '🥶 <strong>防寒必須</strong>。露出を最小限に。';

    // 類似ワードローブ
    const similar = State.wardrobe.filter(w => Math.abs(w.temp - avgTemp) <= 4);

    // タイトル
    const label = dayIndex === 0 ? '今日' : dayIndex === 1 ? '明日' : d.day;
    document.getElementById('day-plan-title').textContent = `${d.icon} ${label}の服装プラン`;

    document.getElementById('day-plan-body').innerHTML = `
      <!-- 気温サマリー -->
      <div class="dayplan-temp-row">
        <div class="dayplan-temp-badge" style="background:var(--primary-dark);color:white">
          <span class="dpt-label">最高</span>
          <span class="dpt-val">${d.high}°</span>
        </div>
        <div class="dayplan-temp-arrow">→</div>
        <div class="dayplan-temp-badge" style="background:#E0E8FF;color:var(--primary-dark)">
          <span class="dpt-label">最低</span>
          <span class="dpt-val">${d.low}°</span>
        </div>
        <div class="dayplan-temp-swing ${swing >= 10 ? 'warn' : ''}">
          気温差 ${swing}°${swing >= 10 ? ' ⚠️' : ''}
        </div>
      </div>

      <!-- 時間帯別気温バー -->
      <div class="dayplan-timeline">
        <div class="dpt-slot">
          <div class="dpt-time">🌅 朝</div>
          <div class="dpt-thermometer">
            <div class="dpt-bar" style="height:${40 + (morn/d.high)*40}px;background:${tempColor(morn)}"></div>
          </div>
          <div class="dpt-temp">${morn}°</div>
          <div class="dpt-item">${outfitMorn.items[0].emoji} ${outfitMorn.items[0].label}</div>
        </div>
        <div class="dpt-slot">
          <div class="dpt-time">☀️ 昼</div>
          <div class="dpt-thermometer">
            <div class="dpt-bar" style="height:80px;background:${tempColor(noon)}"></div>
          </div>
          <div class="dpt-temp">${noon}°</div>
          <div class="dpt-item">${outfitNoon.items[0].emoji} ${outfitNoon.items[0].label}</div>
        </div>
        <div class="dpt-slot">
          <div class="dpt-time">🌆 夕</div>
          <div class="dpt-thermometer">
            <div class="dpt-bar" style="height:${30 + (eve/d.high)*50}px;background:${tempColor(eve)}"></div>
          </div>
          <div class="dpt-temp">${eve}°</div>
          <div class="dpt-item">${outfitMorn.items[0].emoji} 羽織もの持参</div>
        </div>
        <div class="dpt-slot">
          <div class="dpt-time">🌙 夜</div>
          <div class="dpt-thermometer">
            <div class="dpt-bar" style="height:${20 + (night/d.high)*40}px;background:${tempColor(night)}"></div>
          </div>
          <div class="dpt-temp">${night}°</div>
          <div class="dpt-item">${outfitNight.items[0].emoji} ${outfitNight.items[0].label}</div>
        </div>
      </div>

      <!-- AIアドバイス -->
      ${dayAdvice ? `<div class="dayplan-advice">${dayAdvice}</div>` : ''}

      <!-- 一日コーデ提案 -->
      <div class="dayplan-section-title">🤖 一日を通じたAIコーデ</div>
      <div class="dayplan-ai-comment">${getAIOutfit(avgTemp, d.icon).comment}</div>
      <div class="dayplan-outfit-grid">
        ${getAIOutfit(avgTemp, d.icon).items.map(item => `
          <div class="dayplan-outfit-item">
            <span class="dayplan-outfit-emoji">${item.emoji}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
        ${hasRain ? `<div class="dayplan-outfit-item rain">☔<span>折り畳み傘</span></div>` : ''}
      </div>

      <!-- 過去の似た日 -->
      ${similar.length > 0 ? `
        <div class="dayplan-section-title">📂 似た気温の過去コーデ</div>
        <div class="dayplan-wardrobe-list">
          ${similar.slice(0, 3).map(w => `
            <div class="dayplan-wardrobe-item">
              <span style="font-size:1.6rem">${w.emoji || '👕'}</span>
              <div>
                <div style="font-size:0.78rem;color:var(--text-sub)">${w.date} / ${w.temp}°C ${w.icon || ''}</div>
                <div style="font-weight:600;font-size:0.88rem">${w.outfit}</div>
                ${w.feeling ? `<div style="font-size:0.75rem;color:var(--primary-dark)">${FEELING_LABELS[w.feeling] || ''}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    this.openModal('modal-day-plan');
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
      const color = tempColor(w.temp);
      // id="shape-{key}" 後方互換 (fallback + GeoJSON 1枚目)
      const shapeEl = document.getElementById(`shape-${key}`);
      if (shapeEl) shapeEl.setAttribute('fill', color);
      // GeoJSONレンダリング後: 全都道府県パスに一括着色
      document.querySelectorAll(`.region-shape[data-region="${key}"]`).forEach(el => {
        el.setAttribute('fill', color);
      });
      // バッジ円
      const badge = document.getElementById(`badge-${key}`);
      if (badge) badge.setAttribute('fill', color);
      // テキスト
      const tempEl = document.getElementById(`rtemp-${key}`);
      const iconEl = document.getElementById(`icon-${key}`);
      if (tempEl) tempEl.textContent = `${w.temp}°`;
      if (iconEl) iconEl.textContent = w.icon;
    });
  },

  switchMapView(mode) {
    const mapPanel  = document.getElementById('map-svg-panel');
    const rankPanel = document.getElementById('map-rank-panel');
    document.querySelectorAll('.map-vtoggle').forEach(b => b.classList.remove('active'));
    if (mode === 'map') {
      mapPanel.style.display  = '';
      rankPanel.style.display = 'none';
      document.getElementById('vtoggle-map').classList.add('active');
    } else {
      mapPanel.style.display  = 'none';
      rankPanel.style.display = '';
      document.getElementById('vtoggle-rank').classList.add('active');
      this.renderRankView();
    }
  },

  renderRankView() {
    const sorted = Object.entries(JAPAN_WEATHER)
      .sort((a, b) => b[1].temp - a[1].temp);
    const maxTemp = sorted[0][1].temp;
    const minTemp = sorted[sorted.length - 1][1].temp;
    const range   = maxTemp - minTemp || 1;

    const medalMap = ['🥇','🥈','🥉'];
    const list = document.getElementById('rank-list');
    list.innerHTML = sorted.map(([key, w], i) => {
      const pct   = Math.round(((w.temp - minTemp) / range) * 100);
      const color = tempColor(w.temp);
      const rankClass = i < 3 ? ` rank-${i+1}` : '';
      const numLabel  = i < 3 ? medalMap[i] : `${i+1}`;
      return `
        <div class="rank-item" onclick="App.showRegion('${key}')">
          <span class="rank-num${rankClass}">${numLabel}</span>
          <span style="font-size:1.4rem">${w.icon}</span>
          <span class="rank-region-name">${w.name}</span>
          <span class="rank-city">${w.city}</span>
          <div class="rank-bar-wrap">
            <div class="rank-bar" style="width:${Math.max(pct,6)}%;background:${color}"></div>
          </div>
          <span class="rank-temp-val" style="color:${color}">${w.temp}°</span>
          <span class="rank-range">▲${w.high}°▼${w.low}°</span>
        </div>`;
    }).join('');
  },

  _tapFeedback(regionKey) {
    // バウンスアニメーション
    const grp = document.querySelector(`.region-group[data-region="${regionKey}"]`);
    if (grp) {
      grp.classList.add('tapped', 'tapped-anim');
      setTimeout(() => grp.classList.remove('tapped-anim'), 350);

      // リップルエフェクト (SVG circle 追加)
      const shape = document.getElementById(`shape-${regionKey}`);
      if (shape) {
        const svg  = document.getElementById('japan-map');
        const bbox = shape.getBBox();
        const cx   = bbox.x + bbox.width  / 2;
        const cy   = bbox.y + bbox.height / 2;
        const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ripple.setAttribute('cx', cx);
        ripple.setAttribute('cy', cy);
        ripple.setAttribute('r', '0');
        ripple.classList.add('tap-ripple');
        svg.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    }

    // ヒント非表示 (一度タップしたら)
    const hint = document.getElementById('map-tap-hint');
    if (hint) hint.classList.add('hidden');
  },

  showRegion(key) {
    const w = JAPAN_WEATHER[key];
    if (!w) return;
    this._tapFeedback(key);

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
    const allItems = [...State.wardrobe];
    let items = allItems;

    if (filter === 'cold') items = allItems.filter(i => i.temp < 8);
    else if (filter === 'cool') items = allItems.filter(i => i.temp >= 8 && i.temp < 15);
    else if (filter === 'warm') items = allItems.filter(i => i.temp >= 15 && i.temp < 22);
    else if (filter === 'hot') items = allItems.filter(i => i.temp >= 22);

    // If current filter has no items, show all
    if (items.length === 0 && allItems.length > 0) items = allItems;

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

        const occasionHtml = (item.occasions || []).length > 0
          ? `<div class="wardrobe-occasions">${(item.occasions || []).map(id => {
              const t = OCCASION_TAGS.find(x => x.id === id);
              return t ? `<span class="occasion-tag-display">${t.emoji}${t.label}</span>` : '';
            }).join('')}</div>` : '';

        card.innerHTML = `
          ${photoContent}
          <div class="wardrobe-info">
            <div class="wardrobe-date">${item.date}</div>
            <div class="wardrobe-temp">${item.icon} ${item.temp}°C</div>
            <div class="wardrobe-feeling">${FEELING_LABELS[item.feeling] || ''}</div>
            ${occasionHtml}
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
      ${(item.occasions||[]).length > 0 ? `
        <div style="font-weight:700;margin-bottom:6px">🏷️ シーン</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">${(item.occasions||[]).map(id => {
          const t = OCCASION_TAGS.find(x => x.id === id);
          return t ? `<span class="occasion-tag-display" style="font-size:0.8rem;padding:4px 10px">${t.emoji} ${t.label}</span>` : '';
        }).join('')}</div>` : ''}
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
    State.selectedFeeling   = null;
    State.photoDataUrl      = null;
    State.selectedOccasions = [];

    document.getElementById('photo-preview').style.display = 'block';
    document.getElementById('photo-preview-img').style.display = 'none';
    document.getElementById('log-outfit-text').value = '';
    document.getElementById('log-comment').value = '';
    document.querySelectorAll('.feeling-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('log-share-friends').checked = true;
    document.getElementById('log-share-national').checked = false;

    // Populate occasion tags
    const tagsEl = document.getElementById('occasion-tags');
    if (tagsEl) {
      tagsEl.innerHTML = OCCASION_TAGS.map(t =>
        `<button class="occasion-btn" data-id="${t.id}"
          onclick="App.toggleOccasion(this,'${t.id}')">${t.emoji} ${t.label}</button>`
      ).join('');
    }

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

  toggleOccasion(btn, id) {
    btn.classList.toggle('selected');
    if (btn.classList.contains('selected')) {
      if (!State.selectedOccasions.includes(id)) State.selectedOccasions.push(id);
    } else {
      State.selectedOccasions = State.selectedOccasions.filter(o => o !== id);
    }
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
      sharedNational: document.getElementById('log-share-national').checked,
      occasions: [...(State.selectedOccasions || [])]
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
        ${(item.occasions||[]).map(id => {
          const t = OCCASION_TAGS.find(x => x.id === id);
          return t ? `<span class="occasion-tag-display">${t.emoji} ${t.label}</span>` : '';
        }).join('')}
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
    const codeSection = document.getElementById('friend-code-section');
    if (codeSection) codeSection.style.display = group === 'friends' ? 'block' : 'none';
    if (group === 'friends') this.renderMyGroups();
    this.renderGroupFeed();
  },

  // ===== MOUNTAINS =====
  showMountain(key) {
    const m = MOUNTAINS[key];
    if (!m) return;

    // タップフィードバック (山グループ)
    const grpEl = document.querySelector(`.mountain-group[onclick*="${key}"]`);
    if (grpEl) {
      grpEl.classList.add('tapped-anim');
      setTimeout(() => grpEl.classList.remove('tapped-anim'), 350);
    }
    const hint = document.getElementById('map-tap-hint');
    if (hint) hint.classList.add('hidden');

    const region = JAPAN_WEATHER[m.region];
    const summitTemp = region ? Math.round(region.temp - (m.elevation * 0.0065)) : '?';
    const cold = typeof summitTemp === 'number' && summitTemp < 0;

    document.getElementById('modal-region-title').textContent = `${m.emoji} ${m.name}`;
    document.getElementById('modal-region-body').innerHTML = `
      <div style="text-align:center;font-size:3rem;margin-bottom:8px">${m.emoji}</div>
      <div style="text-align:center;color:var(--text-sub);font-size:0.82rem;line-height:1.5;margin-bottom:14px">${m.desc}</div>
      <div class="region-detail-grid">
        <div class="region-detail-item">
          <div class="rdi-label">標高</div>
          <div class="rdi-val">${m.elevation.toLocaleString()}m</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">山頂気温(推定)</div>
          <div class="rdi-val" style="color:${cold?'#2563EB':'inherit'}">${summitTemp}°C</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">周辺地域</div>
          <div class="rdi-val">${region?.name || '-'}</div>
        </div>
        <div class="region-detail-item">
          <div class="rdi-label">地域気温</div>
          <div class="rdi-val">${region?.temp ?? '-'}°C</div>
        </div>
      </div>
      <div style="background:var(--bg);border-radius:var(--radius-sm);padding:10px 12px;font-size:0.78rem;color:var(--text-sub);margin-top:6px;line-height:1.5">
        📐 気温低下率: 高度100m上昇につき約0.65°C低下<br>
        ⚠️ 登山時は天気予報と装備を十分に確認してください
      </div>
      ${cold ? `<div style="background:#DBEAFE;border-radius:var(--radius-sm);padding:10px 12px;font-size:0.8rem;color:#1E40AF;margin-top:8px">❄️ 現在、山頂付近は氷点下の可能性があります</div>` : ''}
    `;
    this.openModal('modal-region');
  },

  // ===== GROUP CODES =====
  generateGroupCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];

    const groups = JSON.parse(localStorage.getItem('kiruki_groups') || '{}');
    groups[code] = {
      code,
      name: `${State.user?.name || 'ゲスト'}のグループ`,
      creatorId: State.user?.id || 'guest',
      members: [State.user?.id || 'guest'],
      created: new Date().toISOString()
    };
    localStorage.setItem('kiruki_groups', JSON.stringify(groups));

    const myGroups = JSON.parse(localStorage.getItem(State._key('my_groups')) || '[]');
    if (!myGroups.includes(code)) myGroups.push(code);
    localStorage.setItem(State._key('my_groups'), JSON.stringify(myGroups));
    localStorage.setItem(State._key('my_code'), code);

    document.getElementById('my-invite-code').textContent = code;
    this.showToast(`コード発行: ${code}`);
    this.renderMyGroups();
  },

  joinGroup() {
    const input = document.getElementById('join-code-input');
    const code = input.value.trim().toUpperCase();
    if (code.length !== 6) { this.showToast('6文字のコードを入力してください'); return; }

    const groups = JSON.parse(localStorage.getItem('kiruki_groups') || '{}');
    if (!groups[code]) { this.showToast('グループが見つかりません'); return; }

    const myGroups = JSON.parse(localStorage.getItem(State._key('my_groups')) || '[]');
    if (myGroups.includes(code)) { this.showToast('既に参加しています'); return; }

    if (!groups[code].members.includes(State.user?.id || 'guest')) {
      groups[code].members.push(State.user?.id || 'guest');
      localStorage.setItem('kiruki_groups', JSON.stringify(groups));
    }
    myGroups.push(code);
    localStorage.setItem(State._key('my_groups'), JSON.stringify(myGroups));
    input.value = '';
    this.showToast(`「${groups[code].name}」に参加しました！`);
    this.renderMyGroups();
  },

  leaveGroup(code) {
    if (!confirm('このグループから退出しますか？')) return;
    const myGroups = JSON.parse(localStorage.getItem(State._key('my_groups')) || '[]');
    localStorage.setItem(State._key('my_groups'), JSON.stringify(myGroups.filter(c => c !== code)));
    this.showToast('グループから退出しました');
    this.renderMyGroups();
  },

  renderMyGroups() {
    const container = document.getElementById('my-groups-list');
    if (!container) return;
    const myGroups = JSON.parse(localStorage.getItem(State._key('my_groups')) || '[]');
    const groups = JSON.parse(localStorage.getItem('kiruki_groups') || '{}');
    if (myGroups.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = myGroups.map(code => {
      const g = groups[code];
      if (!g) return '';
      return `
        <div class="group-item">
          <div class="group-item-icon">👥</div>
          <div class="group-item-info">
            <div class="group-item-name">${g.name}</div>
            <div class="group-item-code">コード: ${g.code} · ${g.members.length}人参加中</div>
          </div>
          <button class="btn-leave-group" onclick="App.leaveGroup('${code}')">退出</button>
        </div>`;
    }).join('');
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

// ===== PROFILE MODULE =====
const Profile = {

  render() {
    const u = State.user;
    if (!u) return;

    document.getElementById('profile-avatar').textContent = u.emoji || '😊';
    document.getElementById('profile-display-name').textContent = u.name || 'ユーザー';
    document.getElementById('profile-email').textContent = u.email || 'ゲスト（メール未登録）';
    document.getElementById('profile-name-input').value = u.name || '';

    // Stats
    document.getElementById('stat-wardrobe').textContent = State.wardrobe.length;
    const groups = JSON.parse(localStorage.getItem(State._key('my_groups')) || '[]');
    document.getElementById('stat-groups').textContent = groups.length;

    // 利用日数 (ユーザーIDはタイムスタンプ)
    if (u.id && u.id !== 'guest' && !isNaN(parseInt(u.id))) {
      const days = Math.max(1, Math.floor((Date.now() - parseInt(u.id)) / 86400000) + 1);
      document.getElementById('stat-days').textContent = days;
    } else {
      document.getElementById('stat-days').textContent = '-';
    }

    // 位置情報
    const loc = Location.load();
    const region = loc ? Location.REGIONS[loc.region] : null;
    document.getElementById('profile-location').textContent =
      region ? region.label : '未設定';
  },

  startEdit() {
    document.getElementById('profile-edit-section').style.display = 'block';
    document.getElementById('profile-name-input').focus();
  },

  cancelEdit() {
    document.getElementById('profile-edit-section').style.display = 'none';
  },

  saveEdit() {
    const name = document.getElementById('profile-name-input').value.trim();
    if (!name) return;
    State.user.name = name;
    if (State.user?.id && State.user.id !== 'guest') {
      fbDb.ref(`users/${State.user.id}/profile/name`).set(name).catch(() => {});
    }
    this.cancelEdit();
    this.render();
    App.showToast('名前を更新しました');
  },

  pickEmoji() {
    const EMOJIS = [
      '😊','😎','🌸','⚡','🎯','🎨','🎮','🌊','🏔️','🌈',
      '🦊','🐼','🦋','🌙','☀️','❄️','🔥','💎','🎵','🌟',
      '🐶','🐱','🐸','🌺','🍀','🍭','🎸','👒','🚀','🏄'
    ];
    const current = State.user.emoji || '😊';
    let pick;
    do { pick = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; } while (pick === current);
    State.user.emoji = pick;
    document.getElementById('profile-avatar').textContent = pick;
    if (State.user?.id && State.user.id !== 'guest') {
      fbDb.ref(`users/${State.user.id}/profile/emoji`).set(pick).catch(() => {});
    }
    App.showToast('アバターを変更しました');
  },

  resetLocation() {
    if (!confirm('位置情報をリセットしますか？次回起動時に再取得できます。')) return;
    Location.clear();
    document.getElementById('profile-location').textContent = '未設定';
    App.showToast('位置情報をリセットしました');
  },

  async deleteAccount() {
    const u = State.user;
    if (!u || u.id === 'guest') { App.showToast('ゲストはアカウント削除できません'); return; }
    if (!confirm('本当にアカウントを削除しますか？\nコーデ記録・グループなどすべてのデータが削除されます。')) return;
    if (!confirm('もう一度確認します。この操作は取り消せません。\n削除しますか？')) return;
    try {
      await fbDb.ref(`users/${u.id}`).remove();
      const firebaseUser = fbAuth.currentUser;
      if (firebaseUser) await firebaseUser.delete();
    } catch {}
    localStorage.removeItem(State._key('wardrobe'));
    localStorage.removeItem(State._key('my_code'));
    localStorage.removeItem(State._key('my_groups'));
    State.user = null;
    State.wardrobe = [];
    State.started = false;
    this._goToAuth();
    App.showToast('アカウントを削除しました');
  },

  logout() {
    if (!confirm('ログアウトしますか？')) return;
    fbAuth.signOut().catch(() => {});
    State.user = null;
    State.started = false;
    this._goToAuth();
  },

  _goToAuth() {
    document.getElementById('bottom-nav').style.display = 'none';
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const authView = document.getElementById('view-auth');
    authView.classList.remove('slide-out');
    authView.classList.add('active');
    document.getElementById('auth-login-form').style.display = 'block';
    document.getElementById('auth-register-form').style.display = 'none';
    document.getElementById('auth-location-step').style.display = 'none';
    const tabs = document.querySelector('.auth-tabs');
    const divider = document.querySelector('.auth-divider');
    const guestBtn = document.querySelector('.btn-auth-guest');
    if (tabs) tabs.style.display = '';
    if (divider) divider.style.display = '';
    if (guestBtn) guestBtn.style.display = '';
    document.querySelectorAll('.auth-tab').forEach((t, i) => {
      if (i === 0) t.classList.add('active'); else t.classList.remove('active');
    });
    document.getElementById('login-error').textContent = '';
    document.getElementById('reg-error').textContent = '';
  }
};

// Init map colors on load (before start)
window.addEventListener('DOMContentLoaded', () => {
  // フォールバック: 手書きSVGに初期色を適用
  Object.entries(JAPAN_WEATHER).forEach(([key, w]) => {
    const color = tempColor(w.temp);
    const shape = document.getElementById(`shape-${key}`);
    const badge = document.getElementById(`badge-${key}`);
    if (shape) shape.setAttribute('fill', color);
    if (badge) badge.setAttribute('fill', color);
  });
  const mapDate = document.getElementById('map-date');
  if (mapDate) mapDate.textContent = '';

  // GeoJSON地図を非同期で読み込み・描画
  // 完了後 initMap() で気温カラーを再適用
  if (window.MapGeo) {
    MapGeo.init(() => {
      if (window.App && App.initMap) App.initMap();
    });
  }

  // Firebase Auth state で自動ログイン判定
  fbAuth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser && !State.started) {
      const snap = await fbDb.ref(`users/${firebaseUser.uid}/profile`).once('value');
      const profile = snap.val() || {};
      State.user = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: profile.name || firebaseUser.displayName || 'ユーザー',
        emoji: profile.emoji || '😊',
      };
      document.getElementById('view-intro').classList.add('hidden');
      App.launchApp();
    }
  });
});
