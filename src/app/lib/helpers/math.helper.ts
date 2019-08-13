export function sin(deg: number) {
  return Math.round(Math.sin(toRadian(deg)) * 10) / 10;
}

export function cos(deg: number) {
  return Math.round(Math.cos(toRadian(deg)) * 10) / 10;
}

export function toRadian(deg: number) {
  return (deg * Math.PI) / 180;
}
