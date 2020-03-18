// QUESTION:

// 2520 is the smallest number that can be divided by each of the numbers from
// 1 to 10 without any remainder.What is the smallest positive number that is
// evenly divisible by all of the numbers from 1 to 20 ?

// I found this fn for checking the primes at the link below, credit
// to Sarah Herr
// ref: https://medium.com/@sarahdherr/prime-number-algorithm-in-js-f9fb2439c7ae
function isPrime (num) {
  if (num <= 1) {
    return true
  } else if (num <= 3) {
    return true
  } else if (num % 2 === 0 || num % 3 === 0) {
    return false
  }

  let i = 5
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false
    }
    i += 6
  }
  return true
}

// uses factor tree method to build an array of all the primes needed for any
// number given. if number is a prime, number is returned unaltered
function prime_factorization (composite_number) {
  if (isPrime(composite_number)) return composite_number

  const factors = Array.from(
    { length: composite_number },
    (_, i) => i + 1
  ).filter(n => composite_number % n === 0 && n !== composite_number && n !== 1)

  const first_branch = factors
    .map(f => [f, composite_number / f].sort((a, b) => a - b))
    .sort()[0]

  const branched_pairs = first_branch.map(p =>
    isPrime(p) ? p : prime_factorization(p)
  )

  return branched_pairs.flat().sort()
}

// uses prime_factorization to solve the problem
function smallest_multiple (range) {
  const all_factors = (divisors = Array.from(
    { length: range },
    (_, i) => i + 1
  ).filter(d => d > 1)).map(n => prime_factorization(n))

  const prime_factors = all_factors
    .filter(v => !v.length)
    .map(p => ({ prime: p, count: 1 }))

  const composite_factors = all_factors
    .filter(v => v.length)
    .map(comp_set => {
      const count = value => [...comp_set].filter(x => x === value).length
      return [...comp_set.map(c => ({ prime: c, count: count(c) }))]
    })
    .flat()
    .sort((a, b) => b.prime - a.prime)

  const solution = prime_factors
    .map(prime_factor => {
      const s = composite_factors.filter(
        composite_factor =>
          composite_factor.prime === prime_factor.prime &&
          composite_factor.count > prime_factor.count
      )

      if (s.length > 0) {
        const updated_object = s.sort((a, b) => b.count - a.count)[0]
        return updated_object
      } else {
        return prime_factor
      }
    })
    .map(v => v.prime ** v.count)
    .reduce((p, c) => p * c)

  return solution
}

console.log({ answer: smallest_multiple(20) })
