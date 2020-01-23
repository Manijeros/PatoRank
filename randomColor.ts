function toHex(d: number) {
  return ('0' + Number(Math.floor(d)).toString(16)).slice(-2).toUpperCase()
}
export function randomColor(seed: string, multiplier: number = 255) {
  const hash = seed
    .split('')
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    )
  const hue = (hash & 0xffffff) / 0xffffff
  const r = Math.abs((hue > 0.5 ? hue - 1 : hue) * multiplier)
  const g = Math.abs(
    (hue - 0.333 > 0.5 ? hue - 1.333 : hue - 0.333) * multiplier
  )
  const b = Math.abs(
    (hue - 0.666 > 0.5 ? hue - 1.666 : hue - 0.666) * multiplier
  )
  return '#' + toHex(r) + toHex(g) + toHex(b)
}
