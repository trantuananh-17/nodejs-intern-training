import {colord} from 'colord';

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

export function hexToHsba(hex) {
  const {h, s, v, a} = colord(hex).toHsv();

  return {
    hue: h,
    saturation: s,
    brightness: v,
    alpha: a
  };
}

export function hex8ToRgba(hex8) {
  const {r, g, b, a} = colord(hex8).toRgb();

  return {
    red: r,
    green: g,
    blue: b,
    alpha: Number(a.toFixed(3))
  };
}
