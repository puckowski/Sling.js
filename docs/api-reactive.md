# Reactive API

## s.stream
__object s.stream( )__

Returns a Sling stream.

Example stream usage using Sling XHR API:

```javascript
s.get('https://jsonplaceholder.typicode.com/posts').then(xhrResp => {
	let postArr = JSON.parse(xhrResp.response);
	let postStream = s.stream().from(postArr).transform(function(arr) {
		return arr.filter(v => v.userId === 1);
	}).transform(function(arr) {
		return arr.filter(v => v.body.includes('quo'));
	});
});
```

Equivalent stream usage using preexisting stream object and Sling XHR API:

```javascript
let postStream2 = s.stream();
postStream2.transform(function(arr) {
	return arr.filter(v => v.userId === 1);
}).transform(function(arr) {
	return arr.filter(v => v.body.includes('quo'));
});

s.get('https://jsonplaceholder.typicode.com/posts').then(xhrResp => {
	let postArr = JSON.parse(xhrResp.response);
	postArr.forEach(post => {
		postStream2.push(post);
	});
});
```

## Stream Functions

## push
__object push( value )__

Push a value onto a stream. All transformers automatically called. Transformers are only applied on new data. Returns the stream.

## transform
__object transform ( function(arrayData) { } )__

Add a new transformer to stream. Is automatically applied to all existing and new data. Returns the stream.

## call
__object call ( function(arrayData) { } )__

Call a function which operates on the stream's data. Returns the stream.

## getData
__[] getData( )__

Returns a copy of stream array data.

## clearTransformers
__object clearTransformers( )__

Clears all transformers acting on the stream. Data will remain in state of last transformation. Returns the stream.

## from
__object from ( newArray )__

Set stream data to ```newArray``` and apply all existing transformers. Returns the stream.
