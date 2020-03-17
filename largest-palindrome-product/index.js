// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3-digit numbers.

/**
 * @description tests if a number is a palindrome
 * @param {Number} number
 * @returns {Boolean}
 */
function isPalindrome (number) {
  return (
    Number(
      number
        .toString()
        .split('')
        .reverse()
        .join('')
    ) === number
  )
}

function product (x, y) {
  return x * y
}

// function largestPalindromeProduct () {
//   const allThreeDigitNumbers = Array.from({ length: 899 }, (v, i) => i + 100)
//   const copy = [...allThreeDigitNumbers]
// }

console.log({
  isPalindrome: isPalindrome(303)
  // largestPalindrome: largestPalindromeProduct()
})
