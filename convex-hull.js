function convexHull(points) {

  // Maybe sort the points here then pass through...
  let lh = lowerHull( points );
  let uh = upperHull( points );

  return [ ...uh, ...lh.slice(0, lh.length) ];
}

function lowerHull(points) {
  // Sort our points l->r so we can pick them out
  const sortedPoints = points.sort((p, q) => (q.x - p.x));

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
  const sortedPoints = points.sort((p, q) => (p.x - q.x))

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