# Convex Hull



From first principals. Among other things this means no external libs for figuring out if points lie left or right of the current line.

Animating the convex hull via the cursor x-position from within the canvas. Converting this to a percentage and using that to determine how much of the convex hull to draw. At the moment I'm simply mapping the `scale` function (partially applied to the current x-position percentage) which is causing the whole path to shrink/grow.

Also it's origin is the top left when my mental model is the lower left, so maybe I'll need a function to map these spaces too.



###### Parametric Line

I'll need lines in the form
$$
w = u + t(v)
$$


