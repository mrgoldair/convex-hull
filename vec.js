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