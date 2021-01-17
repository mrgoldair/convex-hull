// Add two vectors
// Point, Point where Point [ x,y ]
export const add = ([ ax,ay,az ], [ bx,by,bz ]) => {
  return [ ax + bx, ay + by, az + bz ];
}

// Scalar multiple a point object by `n`
// `p` :: Point [ x,y,z ]
export const scale = (n, p) => {
  return p.map(x => x * n);
}

// Translate or shift a point object by `n`
export const translate = n => p => {
  return p.map(x => x + n);
}

// a, b, c -- d, e, f
export const cross = ([ ax,ay,az ], [ bx,by,bz ]) => {
  return [
    ay * bz - az * by,
    az * bx - ax * bz,
    ax * by - ay * bx
  ];
}

//return a * d + b * e + c * f;
export const dot = ([ ax,ay,az ], [ bx,by,bz ]) => {
  return (ax * bx) + (ay * by) + (az * bz);
}

export const determinant = (a, b, c) => {
  return dot(cross(a, b), c);
}

// Subtract one vector from another
export const difference = ( [ ax,ay,az ], [ bx,by,bz ] ) => {
  return [
    ax - bx,
    ay - by,
    az - bz
  ];
}
export const subtract = difference;

export const magnitude = ([ x,y,z ]) => {
  return Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
}

// A vector which retains it's directionality but magnitude is 1
// -- divide each component by the magnitude of v
export const normalise = v => {
  const m = magnitude(v);
  return v.map(e => e / m);
}

// Linearly interpolate between two points
export const lerp = (n, a, b) => {
  return add(scale(1 - n, a), scale(n, b))
}