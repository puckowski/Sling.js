# XHR API

## s.request
__Promise s.request ( url, methodString, optionsObject = { } )__

Create a XML HTTP Request (XHR) for the specified URL using the specified method, such as ```GET```. Returns a Promise.

|Request Option    |Default                |Detail                                      |
|------------------|-----------------------|--------------------------------------------|
|contentType       |```application/json``` |Set ```Content-Type``` request header.      |
|body              |```''```               |Body of the request.                        |
|withCredentials   |```false```            |Send cookies to 3rd party domains.          |
|timeout           |```0```                |0 is no timeout. Specified in milliseconds. |
|headers           |```{}```               |Key/value request headers to set.           |
  
On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## s.get
__Promise s.get ( url, data = { } )__

Create a ```GET``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## s.post
__Promise s.post ( url, data = { } )__

Create a ```POST``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## s.put
__Promise s.put ( url, data = { } )__

Create a ```PUT``` XHR request with the specified ```data``` which returns a Promise.
On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## s.patch
__Promise s.patch ( url, data = { } )__

Create a ```PATCH``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## s.delete
__Promise s.delete ( url, data = { } )__

Create a ```DELETE``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```
