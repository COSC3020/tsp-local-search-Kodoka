function tsp_ls(distance_matrix)
{
    var route = [0, 1, 2, 3, 4]
    var indices = [2, 3];
    var newRoute = reverseRouteSegment(route, indices);
    var newIndices = randomizeIndices(distance_matrix.length, indices);
    var newerRoute = reverseRouteSegment(newRoute, newIndices);
    console.log(JSON.stringify(routeLength(route, distance_matrix)));
    console.log(JSON.stringify(route));
    console.log(JSON.stringify(routeLength(newRoute, distance_matrix)));
    console.log(JSON.stringify(newRoute));
    console.log(JSON.stringify(routeLength(newerRoute, distance_matrix)));
    console.log(JSON.stringify(newerRoute));
    return -1;
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
    } while(previousIndices[0] == newFirst && previousIndices[1] == newSecond)

    // Return the indices that will be swapped next.
    return [newFirst, newSecond];
}

dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];

      tsp_ls(dm);