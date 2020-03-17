// QUESTION:

// 2520 is the smallest number that can be divided by each of the numbers from
// 1 to 10 without any remainder.What is the smallest positive number that is
// evenly divisible by all of the numbers from 1 to 20 ?

// NOTES:

// ref comments in link below:
// https://codereview.stackexchange.com/questions/13086/smallest-multiple

// The solution is the smallest number for which the prime factorization of every number from 1 to 20 is a subset of its own prime factorization.At the least, you'll need one of every prime number from 1 to 20.

//  You will also discover that in order to be divisible by 16, the number must have 4 2s in its prime factorization, and to be divisible by 9 and 18, the number must have 2 3s.The smallest such number is the number that has ONLY the needed factors, so the answer is

// 2^4 * 3^ 2 * 5 * 7 * 11 * 13 * 17 * 19

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
// COMPOSITE number given
function prime_factorization (composite_number) {
  if (isPrime(composite_number)) return composite_number

  // create a filtered array of only factors for the composite number,
  // disincluding 1 and the composite number itself
  const factors = Array.from(
    { length: composite_number },
    (_, i) => i + 1
  ).filter(n => composite_number % n === 0 && n !== composite_number && n !== 1)

  // create factor pairs and remove duplicate pairs
  const pairs = factors
    .map(f => [f, composite_number / f].sort((a, b) => a - b))
    .sort()
  let unique_pairs = []

  for (pair of pairs) {
    if (unique_pairs.length === 0) {
      unique_pairs.push(pair)
    } else if (
      unique_pairs.filter(p => p[0] === pair[0] && p[1] === pair[1]).length < 1
    ) {
      unique_pairs.push(pair)
    } else {
      continue
    }
  }

  // start at the first pair and recursively create branches off that pair
  const branched_pairs = unique_pairs[0].map(p =>
    isPrime(p) ? p : prime_factorization(p)
  )

  // flatten out the multi-level array containing all primes needed
  // & return that array
  return branched_pairs.flat().sort()
}

// uses prime_factorization to solve the problem
function smallest_multiple (range) {
  // get all the factors greater than one and the range itself
  const all_factors = (divisors = Array.from(
    { length: range },
    (_, i) => i + 1
  ).filter(d => d > 1)).map(n => prime_factorization(n))

  // sort out primes
  const primes = all_factors
    .filter(v => !v.length)
    .map(p => ({ prime: p, count: 1 }))

  // sort out composites and get max counts of each prime they need
  const composites = all_factors
    .filter(v => v.length)
    .map(comp_set => {
      const count = value => [...comp_set].filter(x => x === value).length
      return [...comp_set.map(c => ({ prime: c, count: count(c) }))]
    })
    .flat()
    .sort((a, b) => b.prime - a.prime)

  const solution = primes
    // 1. reconcile the counts with the prime array
    .map(prime_object => {
      const s = composites.filter(
        obj =>
          obj.prime === prime_object.prime && obj.count > prime_object.count
      )

      if (s.length > 0) {
        const updated_object = s.sort((a, b) => b.count - a.count)[0]
        return updated_object
      } else {
        return prime_object
      }
    })
    // 2. raise the primes by the count
    .map(v => v.prime ** v.count)
    // 3. multiply the values together for the solution
    .reduce((p, c) => p * c)

  return solution
}

console.log({ answer: smallest_multiple(20) })
