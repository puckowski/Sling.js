Sling.js implements an Incremental DOM (IDOM). This is similar to Angular Ivy and different than React's Virtual DOM (VDOM).

* IDOM differs from VDOM in that a diff operation is performed incrementally (that is one node at a time) against the DOM, rather than on a virtual DOM tree. 
* IDOM, by removing the additional copy of the DOM, results in reduced memory usage. 
* Each component gets compiled into a series of instructions. These instructions then create DOM trees and update them in-place when the data changes.