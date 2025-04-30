/**
 * How I designed my stopping criterion, and why:
 * 
 * Initially for my stopping criterion I was planning on performing some number
 * of swaps up until we've failed to see improvement following some x number of
 * swaps. As I was designing and testing my code, this was a constant number, so
 * my code would perform a swap, and see if it improved the shortest route
 * length. If it did improve the shortest route length, it would reset a
 * counter to 0, and continue. If it didn't improve the shortest route length,
 * it would incriment that counter. Once that counter hit 50 swaps without
 * seeing any improvement we'd stop performing swaps, and return the shortest
 * length found thus far.
 * 
 * I was going to replace this max swaps without improvement, x, with something
 * along the lines of n * Math.log(n), where n represents the number of cities
 * in the input, so that as input size increased, we progressively performed
 * and checked more swaps.
 * 
 * However, when we were discussing the TSP bar crawl for South Korea, you said
 * something along the lines of "If I'm going on a bar crawl, I'd rather choose
 * a path and go, than wait some indeterminate amount of time for the perfect
 * route." My code, at best, represents an ineffective implementation of TSP,
 * and I don't have access to a particularly good computer to run it on, so for
 * large n, we're not seeing the best route in a resonable time frame, but I can
 * give you a route that's probably mediocre at best in a little more than 50 
 * milliseconds.
 * 
 * How I choose $i$ and $k$, and why:
 * 
 * $i$ and $k$, or indices[0] and indices[1] respectively in my code, are
 * chosen using Math.random from the pools of indices 0 through n - 1, for
 * indices[0], and then indices[1] is chosen the same way from indices[0] + 1
 * through n. Then the new $i$ and $k$ are compared to the old values, and if
 * both are the same, which would simply result in the next swap simply undoing
 * the last, they're re-randomized. 
 * 
 * Choosing $i$ and $k$ this way seemed like the simplest way to ensure
 * $i$ always preceeded $k$, making checking for indices that would undo a swap
 * simpler, and it easier to follow the flow of code mentally, while still
 * providing a good level of randomness to the swaps.
 * 
 */

function tsp_ls(distance_matrix)
{
    // If theres less than 2 cities, the shortest length is 0.
    if(distance_matrix.length < 2)
    {
        return 0;
    }

    var msToSearch = 50;
    var startTime = Date.now();
    // Default route is indices of dimensions of input distance_matrix.
    var route = [...Array(distance_matrix.length).keys()];
    // Shortest length defaults to default route's length.
    var shortestLength = routeLength(route, distance_matrix);
    var indices = randomizeIndices(distance_matrix.length, null);

    // Keep looking for shorter routes, 'til a shorter route hasn't been found
    // in some time.
    while(Date.now() - startTime < msToSearch)
    {
        var candidateRoute = reverseRouteSegment(route, indices);
        var candidateLength = routeLength(candidateRoute, distance_matrix);

        // If the new candidate route provides a better length, shorter,
        // replace the old route and length.
        if(candidateLength < shortestLength)
        {
            route = candidateRoute;
            shortestLength = candidateLength;
        }

        indices = randomizeIndices(distance_matrix.length, indices);
    }

    return shortestLength;
}

// Provides the length of a proposed route, using a distance matrix.
function routeLength(route, distance_matrix)
{
    var routeLength = 0;

    // For each element in the route, add the distance between the
    // current city, and the next to the routeLength.
    for(var routeIndex = 0; routeIndex < route.length - 1; routeIndex++)
    {
        routeLength += distance_matrix[route[routeIndex]][route[routeIndex + 1]];
    }

    return routeLength;
}

// Reverse the order of cities within a segment of a route.
function reverseRouteSegment(route, indices)
{
    // Saves the route preceeding firstIndex.
    var start = route.slice(0, indices[0]);
    // Reverses the route from fistIndex through secondIndex.
    var middle = route.slice(indices[0], indices[1] + 1).reverse();
    // Saves the route follownig secondIndex.
    var end = route.slice(indices[1] + 1);

    // Returns the new route.
    return start.concat(middle, end);
}

// Provides new indices to be used when reversing a route segment.
function randomizeIndices(numCities, previousIndices)
{
    var newFirst;
    var newSecond;

    // At least once randomly generate new indices to swap. If the two new indices
    // are the both the same as the old, randomize until they're not.
    do
    {
        // The newFirst index can be any index between 0, and 1 less than the
        // number of cities.
        newFirst = Math.floor(Math.random() * (numCities - 1));
        // The newSecond index can be any index between newFirst + 1, and the
        // number of cities.
        newSecond = Math.floor((Math.random() * (numCities - newFirst - 1)) + newFirst + 1);
    } while(previousIndices && previousIndices[0] == newFirst && previousIndices[1] == newSecond)

    // Return the indices that will be swapped next.
    return [newFirst, newSecond];
}