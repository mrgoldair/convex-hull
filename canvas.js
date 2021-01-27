// [ Edge ]
export const drawEdges = (ctx,xs) => {
  ctx.beginPath();

  xs.forEach(([[ax,ay], [bx,by]]) => {
    ctx.moveTo( ax, ay );
    ctx.lineTo( bx, by );
  });

  ctx.stroke();
}

// [ Path ]
export const drawPath = (ctx, [ [ax,ay], ...rest ]) => {
  ctx.beginPath();
  ctx.moveTo( ax,ay );
  for (const [ x,y ] of rest) {
    ctx.lineTo( x, y );
  }
  ctx.stroke();
}

// A random 2d point
export const randomPoint = (v) => {
  return [ (v * Math.random()), (v * Math.random()) ];
};