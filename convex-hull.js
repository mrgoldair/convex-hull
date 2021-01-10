import { cross, dot, determinant } from './vec.js';
import { last, lastN, removeNthFromTail } from './list.js'

// Determines if tail of chain makes a left turn
const leftTurn = (xs) => {
  let [ p, q, r ] = lastN(3)(xs),
      pp = { x:1, y:p.x, z:p.y },
      qq = { x:1, y:q.x, z:q.y },
      rr = { x:1, y:r.x, z:r.y };

  return determinant(pp, qq, rr) <= 0;
}

export function convexHull(points) {

  // Maybe sort the points here then pass through...
  let lh = lowerHull( points );
  let uh = upperHull( points );

  return [ ...uh, ...lh.slice(0, lh.length) ];
}

function lowerHull(points) {
  // Sort our points l->r so we can pick them out
  const sortedPoints = points.sort((p, q) => {
    // If x values are equal, sort by y
    if ((q.x - p.x) == 0){
      return (q.y - p.y)
    }

    return (q.x - p.x);
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

function upperHull(points) {

  // Sort our points l->r so we can pick them out
  const sortedPoints = points.sort((p, q) => {
    if ((p.x - q.x) == 0){
      return (p.y - q.y);
    }

    return (p.x - q.x);
  })

  // The list of points in the convex hull
  let boundary = [];

  // Add the first two points to kick off our chain
  let [ p1, p2, ...rest ] = sortedPoints;
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