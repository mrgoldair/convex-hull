
export const removeNthFromTail = (n, xs) => {
  return [ ...xs.slice(0, xs.length - n), ...xs.slice(xs.length - (n - 1)) ]
}

export const lastN = n => xs => (xs.slice(xs.length - n))

export const last = lastN(1);