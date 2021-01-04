# Convex Hull



Convex hull from first principals. This means no 3rd party libraries.

###### Pseudo code

This forms the upper hull, in a clock-wise fashion.

```
Add the first 2 points from the point set (sorted by increasing x value) to the hull list
	For each point `p` of the remaining points
		While hull list has more than two points and the last 		    		three points form a left turn
			Remove the second-to-last point
```

To find the lower hull

```
Add the last 2 points from the point set
	For each point `p` of the remaining points
		While hull list has more than two points and the last 		    		three points form a left turn
			Remove the second-to-last point
			
Remove the first and last points from the lower hull and join to the upper hull.
```

###### Determining left and right

This could be accomplished by calculating and comparing the gradient between the 3 points; 

Using the determinant - which implies we need 3-dimensional vectors.



###### Points as vectors

Animating the convex hull via the cursor x-position from within the canvas. Converting this to a percentage and using that to determine how much of the convex hull to draw. At the moment I'm simply mapping the `scale` function (partially applied to the current x-position percentage) which is causing the whole path to shrink/grow.

Also it's origin is the top left when my mental model is the lower left, so maybe I'll need a function to map these spaces too.



###### <u>Parametric Line</u>

I'll need lines in the form
$$
w = u + t(v)
$$
But using linear interpolation also produces the same result
$$
v.(1-p) + u.p
$$
Hull was only drawing in complete edges, whereas I wanted the edges to smoothly and continuously be drawn out as the percentage changed. This was down to an issue with how was I was reporting the value to the `lerp` function – it expects a value in the range 0-1 whereas I was reporting the percentage as a natural number.

