// Find the sum of all the multiples of 3 or 5 below 1000.

const sumMultiplesOf3Or5 = range =>
  Array.from({ length: range }, (v, i) => i + 1)
    .filter(
      number => (number % 3 === 0 || number % 5 === 0) && number !== range
    )
    .reduce((prev, cur) => prev + cur)

console.log(sumMultiplesOf3Or5(1000))
