# Routing Strategies

## setRouteStrategy
__void setRouteStrategy ( newStrategy )__

Sets the router strategy. Valid options for ```newStrategy``` are listed in the table below.

|Strategy |Description                     |Example                                  |
|---------|--------------------------------|-----------------------------------------|
|'#'      |A hash based strategy.          |http://localhost:8080/todo.html#/docs    |
|'?'      |A query string route strategy.  |http://localhost:8080/?/query=1          |
|''       |A path name strategy.           |http://localhost:8080/docs/1             |

The default routing strategy is the hash based strategy.

The query string strategy allows server-side detection. Use this strategy if you want to support and potentially detect anchored links server-side.

The pathname strategy requires setting up the server to serve the single page application code from every URL that the application can route to.
