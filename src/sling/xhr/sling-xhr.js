export function slRequest(url, method, options = {}) {
    // Create the XHR request
    var request = new XMLHttpRequest();

    // Return it as a Promise
    return new Promise(function (resolve, reject) {

        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {

            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            } else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }

        };

        // Setup our HTTP request
        request.open(method || 'GET', url, true);

        request.timeout = options.timeout || 0;
        request.withCredentials = options.withCredentials || false;

        // Set request headers
        if (options.headers) {
            for (let [k, v] of Object.entries(options.headers)) {
                request.setRequestHeader(k, v);
            }
        } else {
            request.setRequestHeader('Content-Type', options.contentType || 'application/json');
        }

        // Send the request
        if (options.body) {
            request.send(options.body);
        } else {
            request.send();
        }
    });
}

export function slRequestWithBody(url, method, bodyObj = {}) {
    let options = { body: bodyObj };
    return slRequest(url, method, options);
}

export function slGet(url, bodyObj = {}) {
    return slRequestWithBody(url, 'GET', bodyObj);
}

export function slPost(url, bodyObj = {}) {
    return slRequestWithBody(url, 'POST', bodyObj);
}

export function slPut(url, bodyObj = {}) {
    return slRequestWithBody(url, 'PUT', bodyObj);
}

export function slPatch(url, bodyObj = {}) {
    return slRequestWithBody(url, 'PATCH', bodyObj);
}

export function slDelete(url, bodyObj = {}) {
    return slRequestWithBody(url, 'DELETE', bodyObj);
}
