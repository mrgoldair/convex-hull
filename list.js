// Removes nth element from tail
export const removeNthFromTail = (n, xs) => {
  // Copy our input array
  let res = Array.from(xs);

  // Splice works in-place
  res.splice(res.length - n, 1);
  return res;
}

// Get last n elements from xs
export const lastN = n => xs => (xs.slice(xs.length - n))

// Last 1
export const last = lastN(1);