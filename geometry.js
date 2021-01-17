import { determinant } from './vec.js'
import { lastN, removeNthFromTail } from './list.js'

// xs :: [ Point ]
// type Polygon = Array Point / [ Point ]
// returns :: [ Edge ]
export const edges = xs => {
  let edges = [];

  for (let edge = 0; edge < (xs.length - 1); edge++) {
    // Take each point and it's subsequent to form an edge
    edges.push([xs[edge], xs[(edge + 1)]]);
  }

  return edges;
}

// [ Point ] -> Boolean
const leftTurn = (xs) => {
  let [ [px,py], [qx,qy], [rx,ry] ] = lastN(3)(xs);
  let p = [ px, py, 1 ],
      q = [ qx, qy, 1 ],
      r = [ rx, ry, 1 ];

  return determinant(p, q, r) <= 0;
}

// [ Point ] -> [ Point ]
export function convexHull(points) {

  // Maybe sort the points here then pass through...
  let uh = upperHull( points );
  let lh = lowerHull( points );

  return [ ...uh, ...lh.slice(0, lh.length) ];
}

// [ Point ] -> [ Point ]
function lowerHull(points) {
  // Sort our points l->r so we can pick them out
  const sortedPoints = points.sort(( [px,py], [qx,qy] ) => {
    // If x values are equal, sort by y
    if ((qx - px) == 0){
      return (qy - py)
    }

    return (qx - px);
  });

  // The list of points in the convex hull
  let boundary = [];

  // Add the first two points to kick off our chain
  boundary.push(sortedPoints[0]);
  boundary.push(sortedPoints[1]);

  // Test each point in the sorted set
  for (let i = 2; i < sortedPoints.length; i++) {
    // Push our candidate onto the chain
    boundary.push(sortedPoints[i]);

    // While the last 3 points make a left turn, remove the 2nd-to-last
    while(boundary.length > 2 && leftTurn(boundary)) {
      boundary = removeNthFromTail(2, boundary);
    }
  }

  return boundary;
}

// [ Point ] -> [ Point ]
function upperHull(points) {

  // Sort our points l->r so we can pick them out
  const sortedPoints = points.sort(([px,py], [qx,qy]) => {
    if ((px - qx) == 0){
      return (py - qy);
    }

    return (px - qx);
  })

  // The list of points in the convex hull
  let boundary = [];

  // Add the first two points to kick off our chain
  boundary.push(sortedPoints[0]);
  boundary.push(sortedPoints[1]);

  // Test each point
  for (let i = 2; i < sortedPoints.length; i++) {
    // Push our candidate onto the chain
    boundary.push(sortedPoints[i]);

    // While the last 3 points make a left turn, remove the 2nd-to-last
    while(boundary.length > 2 && leftTurn(boundary)) {
      boundary = removeNthFromTail(2, boundary);
    }
  }

  return boundary;
}