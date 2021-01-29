# Convex Hull



<img src="https://github.com/mrgoldair/convex-hull/blob/master/screenshot.png" style="display:block; margin:0 auto;"/>

### Convex hull from first principals. No 3rd party libraries.

#### Pseudo code

The complete convex hull is formed in two passes – one for the upper hull, one for the lower hull.

This forms the upper hull, in a clock-wise fashion.

- Add the first 2 points from the point set `ps` (sorted by increasing x value) to the hull list `upper-hull`
  	- For each point `p` of the remaining points
  		- W- While hull list has more than two points and the last three points form a left turn
  	     - Remove the second-to-last point

To find the lower hull

- Add the last 2 points from the point set `ps` to `lower-hull`
  - For each point `p` of the remaining points
    - While hull list has more than two points and the last three points form a left turn
      - Remove the second-to-last point

Now, there are duplicate points between the two hulls – namely the first and last of each. So we remove the first and last points of the lower hull and join to the upper hull to complete the hull.



#### Determining left and right

This could be accomplished by calculating and comparing the gradient between the 3 points. This would take two vector subtractions and then the comparison of their respective ratios. For three points on the hull represented by `t, u, v` and two vectors represented by `u-t` and `v-u`, if the gradient for `v-u` is greater than that of `u-t` the three points make a left turn; if it's less the three points make a right turn.

However another technique could be used that could involve potentially less calculation.

Using the determinant we could reduce the number of calculations needed to find a "left or right turn" to `xx`. In order to use the determinant you need to realise the   determinant is only defined for 3 dimensions. This is obviously tricky because we're drawing on a HTMLCanvas which is 2D.

Because the purpose of the determinant is to calculate the volume created by 3 vectors, it's tempting to just slap on a third dimension (usually denoted `z`) set to 1. ~~Although all the vectors now have a third dimension the volume is 0. This is because by having all the same value for a particular dimension there's no depth – we need a difference of dimension to convey depth (and area in 2D) – and when we have no depth we only have area.~~

Simply setting `z` to 1 does actually work. For some reason in my working out, I thought there was something special about the `z` dimension not being homogeneous and therefore setting the `x` dimension to 1 and the `z` dimension takes on the `x` val of the points – in the end this just shifts the problem; there is nothing special about the `z` dimension in the calculation of the scalar triple product (or of any dimension over another). It must have been something off in my numbers used to do test data. Therefore, simply setting the `z` component to 1 for each point in the scalar-triple-product works.

#### Points as vectors

Animating the convex hull via the cursor x-position from within the canvas. Converting this to a percentage and using that to determine how much of the convex hull to draw. At the moment I'm simply mapping the `scale` function (partially applied to the current x-position percentage) which is causing the whole path to shrink/grow.

Also it's origin is the top left when my mental model is the lower left, so maybe I'll need a function to map these spaces too.



#### Drawing the line

We need lines in the form
$$
w = u + dt(v)
$$
But using linear interpolation also produces the same result
$$
v.(1-p) + u.p
$$
Hull was only drawing in complete edges, whereas I wanted the edges to smoothly and continuously be drawn out as the percentage changed. This was down to an issue with how was I was reporting the value to the `lerp` function – it expects a value in the range 0-1 whereas I was reporting the percentage as a natural number.

