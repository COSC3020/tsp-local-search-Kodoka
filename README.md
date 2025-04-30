# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## My Runtime Complexity  

There are two processes in my code whose performance in based on the input,
where $n$ will represent the number of cities or nodes in the input distance
matrix.  

First routeLength iterates over cities in the route to calculate the length of
the proposed route using the distances included in the distance_matrix. This
runs in $\Theta(n)$.  

Next reverseRouteSegment iterates over the cities creating a new route using
slice, reverse, and concat. This runs in $\Theta(n)$.  

These two processes are performed some constant number of time upper bounded by
our 50 millisecond time limit. This runs in constant time, $\Theta(1)$.  

Multiplying our constant number of loops, by the two processes: routeLength, and
reverseRouteSegments, we get $\Theta(1)(\Theta(n) \cdot \Theta(n)) = \Theta(n)
\cdot \Theta(n)$. Thus the worst case time complexity of my code is $\Theta(n)$.  

## My Memory Complexity  

Not accounting for the $n \cdot n = n^2$ memory necessary to hold the input of
distance_matrix, my code only requires extra space in two places. In the form of
route, which throughout the runtime of my code holds an array of length $n$, and
within reverseRouteSegment, where across three subarrays, we temporarily hold a
further $n$ elements. Thus the worst case memory complexity of my code is
$\Theta(n) + \Theta(n)$ or simply $\Theta(n)$ if we don't account for memory
necessary for the input distance_matrix, or $\Theta(n^2) + \Theta(n) +
\Theta(n)$ or simply $\Theta(n^2)$ if we do account for the memory necessary for
the input distance_matrix.  

## Sources  

I used the LAU15 data from the following link during testnig for a larger test
input:  

https://people.sc.fsu.edu/~jburkardt/datasets/cities/cities.html  

## Plagiarism Notice  

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.  
