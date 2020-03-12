// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?

// The quickest way to find the factors of a number is to divide it by the smallest prime number (bigger than 1) that goes into it evenly with no remainder. Continue this process with each number you get, until you reach 1.

function findSmallestPrime (number) {
  let smallestPrime = null
  let inc = 2
  while (smallestPrime === null) {
    if (number % inc === 0) {
      smallestPrime = inc
      break
    } else {
      inc++
    }
  }
  return smallestPrime
}

function findPrimeFactors (number, factors = []) {
  if (number / findSmallestPrime(number) > 1) {
    factors.push(findSmallestPrime(number))
    findPrimeFactors(number / findSmallestPrime(number), factors)
  } else {
    factors.push(findSmallestPrime(number))
  }
  return factors
}

function findLargestPrimeFactor (number) {
  return findPrimeFactors(number).reduce((prev, current) =>
    prev > current ? prev : current
  )
}

// test values
const largestPrimeFactor = 29
const number = 13195

// test case
console.log(largestPrimeFactor === findLargestPrimeFactor(number)) // true

// solution case
console.log({
  answer: findLargestPrimeFactor(600851475143)
})
