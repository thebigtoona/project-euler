// even fibbonaci numbers
// Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:

// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

// By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

function Fibonacci (limit = 10) {
  let array = [1, 2]
  let prev = 1
  let next = 2
  let current
  for (i = 0; i < limit - 2; i++) {
    current = prev + next
    array.push(current)
    prev = next
    next = current
  }
  return array
}

function sumEvenFibbonacciNumbers (limit) {
  return (
    Fibonacci(limit)
      .filter((v, i, a) => v % 2 === 0)
      // .map((v, i, arr) => v > 9007199254740992) // first 26 terms are below this threshold
      .reduce((prev, current) => BigInt(prev) + BigInt(current))
      .toLocaleString()
  )
}

console.log({
  output: sumEvenFibbonacciNumbers(4000000),
  test: 2 ** 53
})

//TODO: function is working.  Need to figure out how to work with BigInt
