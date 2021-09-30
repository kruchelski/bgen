const normalizeColor = (color) => {
  let colorSubstring = ''
  if (color.charAt(0) === '#') {
    colorSubstring = color.substring(1)
  } else {
    colorSubstring = color
  }
  colorSubstring = colorSubstring.replace(/[^A-Za-z0-9]*$/, '')
  return `#${colorSubstring}`
}

const validateInputColor = (color) => {
  if (color.length !== 7) return false
  const colorSubstring = color.substring(1)
  if (!colorSubstring.match(/^[A-Za-z0-9]*$/)) return false
  if (colorSubstring < '000000' || colorSubstring > 'ffffff') return false
  return true
}

export {
  normalizeColor,
  validateInputColor
}