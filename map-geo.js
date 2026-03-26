/**
 * map-geo.js
 * 国土地理院/GitHub公開GeoJSONデータによるSVG地図レンダラー
 *
 * データソース:
 *   dataofjapan/land (GitHub, MIT License)
 *   https://github.com/dataofjapan/land
 *   ※ 元データ: 国土地理院 基盤地図情報
 *
 * 描画エンジン:
 *   D3.js v7 (d3-geo モジュール)
 *   https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js
 */

/* global d3 */
'use strict';

// ─────────────────────────────────────────────
//  都道府県 → 地方 マッピング
// ─────────────────────────────────────────────
const PREF_REGION = {
  '北海道': 'hokkaido',
  '青森県': 'tohoku', '岩手県': 'tohoku', '宮城県': 'tohoku',
  '秋田県': 'tohoku', '山形県': 'tohoku', '福島県': 'tohoku',
  '茨城県': 'kanto',  '栃木県': 'kanto',  '群馬県': 'kanto',
  '埼玉県': 'kanto',  '千葉県': 'kanto',  '東京都': 'kanto',
  '神奈川県': 'kanto',
  '新潟県': 'chubu',  '富山県': 'chubu',  '石川県': 'chubu',
  '福井県': 'chubu',  '山梨県': 'chubu',  '長野県': 'chubu',
  '岐阜県': 'chubu',  '静岡県': 'chubu',  '愛知県': 'chubu',
  '三重県': 'kinki',  '滋賀県': 'kinki',  '京都府': 'kinki',
  '大阪府': 'kinki',  '兵庫県': 'kinki',  '奈良県': 'kinki',
  '和歌山県': 'kinki',
  '鳥取県': 'chugoku', '島根県': 'chugoku', '岡山県': 'chugoku',
  '広島県': 'chugoku', '山口県': 'chugoku',
  '徳島県': 'shikoku', '香川県': 'shikoku', '愛媛県': 'shikoku',
  '高知県': 'shikoku',
  '福岡県': 'kyushu',  '佐賀県': 'kyushu',  '長崎県': 'kyushu',
  '熊本県': 'kyushu',  '大分県': 'kyushu',  '宮崎県': 'kyushu',
  '鹿児島県': 'kyushu',
  '沖縄県': 'okinawa'
};

// バッジ半径（地方ごと）
const BADGE_R = {
  hokkaido: 25, tohoku: 22, kanto: 22, chubu: 21,
  kinki: 22, chugoku: 20, shikoku: 20, kyushu: 22, okinawa: 20
};

// GeoJSONデータソース
// dataofjapan/land (MIT) - 元データ: 国土地理院
const GEOJSON_URL =
  'https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson';

// ─────────────────────────────────────────────
//  MapGeo モジュール
// ─────────────────────────────────────────────
const MapGeo = {
  loaded: false,
  _projMain: null,
  _projOki: null,

  /**
   * GeoJSONを読み込んで地図を描画する
   * @param {Function} onReady - 描画完了後のコールバック
   */
  async init(onReady) {
    if (!window.d3) {
      console.warn('[MapGeo] D3.js が読み込まれていません。CDNを確認してください。');
      return;
    }
    try {
      const resp = await fetch(GEOJSON_URL);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const geo = await resp.json();
      this._renderAll(geo);
      this.loaded = true;
      if (onReady) onReady();
    } catch (err) {
      console.warn('[MapGeo] GeoJSON取得失敗 → 手書きSVGにフォールバック:', err.message);
    }
  },

  _getPrefName(feat) {
    return feat.properties?.nam_ja || feat.properties?.name || '';
  },

  _getRegion(feat) {
    return PREF_REGION[this._getPrefName(feat)] || null;
  },

  _renderAll(geo) {
    const SVG_W = 440, SVG_H = 600;
    const svgEl = document.getElementById('japan-map');
    if (!svgEl) return;

    // 沖縄と本島を分けて投影
    const mainFeats = geo.features.filter(f => this._getRegion(f) !== 'okinawa');
    const okiFeats  = geo.features.filter(f => this._getRegion(f) === 'okinawa');

    const mainGeo = { type: 'FeatureCollection', features: mainFeats };
    const okiGeo  = { type: 'FeatureCollection', features: okiFeats };

    // 投影法: メルカトル
    // 本島 → SVG上部エリアにフィット
    this._projMain = d3.geoMercator()
      .fitExtent([[18, 14], [SVG_W - 8, SVG_H - 108]], mainGeo);
    // 沖縄 → 左下インセットにフィット
    this._projOki = d3.geoMercator()
      .fitExtent([[16, SVG_H - 105], [115, SVG_H - 12]], okiGeo);

    // 地方ごとにフィーチャーを収集
    const regionFeats = {};
    geo.features.forEach(feat => {
      const region = this._getRegion(feat);
      if (!region) return;
      (regionFeats[region] = regionFeats[region] || []).push(feat);
    });

    // 各地方を描画
    Object.entries(regionFeats).forEach(([rk, feats]) => {
      const grp = svgEl.querySelector(`[data-region="${rk}"]`);
      if (!grp) return;

      const isOki   = rk === 'okinawa';
      const proj    = isOki ? this._projOki : this._projMain;
      const pathGen = d3.geoPath().projection(proj);

      // 既存の手書きパスを削除（バッジ/テキスト要素は保持）
      Array.from(grp.children).forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag === 'path' || tag === 'ellipse' ||
           (tag === 'line' && !el.classList.contains('keep'))) {
          el.remove();
        }
      });

      // 地方全体の重心を D3 で計算
      const mergedGeom = {
        type: 'GeometryCollection',
        geometries: feats.map(f => f.geometry)
      };
      const centroidLL = d3.geoCentroid({ type: 'Feature', geometry: mergedGeom });
      const [cx, cy]   = proj(centroidLL);

      // 1) テラインベース（緑の地形色）
      feats.forEach(feat => {
        const dStr = pathGen(feat);
        if (!dStr) return;
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        el.setAttribute('d', dStr);
        el.setAttribute('fill', 'url(#terrain-jp)');
        el.setAttribute('stroke', '#3A6030');
        el.setAttribute('stroke-width', '0.5');
        el.setAttribute('filter', 'url(#terrain-shadow)');
        grp.insertBefore(el, grp.firstChild);
      });

      // 2) 気温オーバーレイ（半透明・fillはinitMapで設定）
      feats.forEach((feat, i) => {
        const dStr = pathGen(feat);
        if (!dStr) return;
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        el.setAttribute('d', dStr);
        el.setAttribute('class', 'region-shape');
        el.setAttribute('data-region', rk);
        if (i === 0) el.setAttribute('id', `shape-${rk}`); // JS後方互換
        el.setAttribute('fill-opacity', '0.38');
        el.setAttribute('stroke', 'rgba(255,255,255,0.65)');
        el.setAttribute('stroke-width', '1.5');
        el.setAttribute('stroke-linejoin', 'round');
        const badge = grp.querySelector('circle');
        if (badge) grp.insertBefore(el, badge);
        else grp.appendChild(el);
      });

      // 3) バッジ・テキスト位置を重心に更新
      this._repositionBadge(grp, rk, cx, cy);
    });
  },

  _repositionBadge(grp, regionKey, cx, cy) {
    const r = BADGE_R[regionKey] || 22;
    // バッジ円
    const circle = grp.querySelector('circle');
    if (circle) {
      circle.setAttribute('cx', cx.toFixed(1));
      circle.setAttribute('cy', cy.toFixed(1));
    }
    // テキスト群: [0]=icon, [1]=temp, [2]=name
    const texts   = Array.from(grp.querySelectorAll('text'));
    const offsets = [-r * 0.52, r * 0.14, r + 12];
    texts.forEach((t, i) => {
      t.setAttribute('x', cx.toFixed(1));
      t.setAttribute('y', (cy + (offsets[i] ?? 0)).toFixed(1));
    });
  }
};

window.MapGeo = MapGeo;
