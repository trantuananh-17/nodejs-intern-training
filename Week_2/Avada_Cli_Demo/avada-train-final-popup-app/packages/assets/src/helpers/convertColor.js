import {colord} from 'colord';

/**
 * HSBA (Polaris 0–1) → HEX8
 */
export function hsbaToHex8({hue, saturation, brightness, alpha = 1}) {
  return colord({
    h: hue,
    s: saturation * 100,
    v: brightness * 100,
    a: alpha
  })
    .toHex({alpha: true})
    .toUpperCase();
}

/**
 * HEX / HEX8 → HSBA (Polaris 0–1)
 */
export function hexToHsba(hex) {
  const {h, s, v, a} = colord(hex).toHsv();

  return {
    hue: h,
    saturation: s, // ✅ 0–1
    brightness: v, // ✅ 0–1
    alpha: a // ✅ 0–1
  };
}

/**
 * HEX8 → RGBA
 */
export function hex8ToRgba(hex8) {
  const {r, g, b, a} = colord(hex8).toRgb();

  return {
    red: r,
    green: g,
    blue: b,
    alpha: Number(a.toFixed(3))
  };
}

/**
 * Normalize any hex → HEX8
 */
export function normalizeHexToHex8(hex) {
  return colord(hex)
    .toHex({alpha: true})
    .toUpperCase();
}
