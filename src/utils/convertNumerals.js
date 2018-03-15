
const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
const latin = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

export const toLatin = (num) => {
  let result = ''

  for (let i = 0; i <= arabic.length; i++) {
    while (num % arabic[i] < num) {
      result += latin[i]
      num -= arabic[i]
    }
  }

  return result
}

export const fromLatin = (str) => {
  let result = null

  for (let i = 0; i <= arabic.length; i++) {
    while (str.indexOf(latin[i]) === 0) {
      result += arabic[i]
      str = str.replace(latin[i], '')
    }
  }

  return result
}
