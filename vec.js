// Add two vectors
// Point, Point where Point { x,y }
export const add = (a, b) => {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  }
}

// Scalar multiple a point object by `n`
export const scale = (n, { x,y,z }) => ({ x:(x * n), y:(y * n), z:(z * n) });

// Translate or shift a point object by `n`
export const translate = n => ({ x, y }) => ({ x: (x + n), y: (y + n) });

// a, b, c -- d, e, f
export const cross = (a, b) => {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
  // return [
  //   b * f - c * e,
  //   c * d - a * f,
  //   a * e - b * d
  // ];
}

//return a * d + b * e + c * f;
export const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

export const determinant = (a, b, c) => {
  return dot(cross(a, b), c);
}

// Subtract one vector from another
export const difference = (v,w) => {
  let diff = {};
  for (const prop in v) {
    diff[prop] = v[prop] - w[prop];
  }
  return diff;
}
export const subtract = difference;

// Where `v` is of form { x,y }
export const magnitude = v => {
  let m = 0;
  
  // square and sum each term
  // for (const prop of Object.getOwnPropertyNames(v)){
  //   m += Math.pow(v[prop], 2);
  // }

  // square root sum
  return Math.sqrt( Math.pow(v['x'],2) + Math.pow(v['y'],2) );
}

// A vector which retains it's directionality but magnitude is 1
// -- divide each component by the magnitude of v
export const normalise = v => {
  const m = magnitude(v);
  return v.map(e => e / m);
}

// Linearly interpolate between two points
export const lerp = (p, a, b) => {
  return add(scale(1 - p, a), scale(p, b))
}