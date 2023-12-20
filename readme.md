# Build server

```
docker compose build server
```

Start

```
docker compose up -d server
```

## Questions

- Does hio use blake3 dependency?

# Run curl

```
curl --verbose http://localhost:8081
```

Example output

```
*   Trying 127.0.0.1:8081...
* Connected to localhost (127.0.0.1) port 8081 (#0)
> GET / HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.81.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 204 No Content
< Server: Ioflo WSGI Server
< Date: Wed, 20 Dec 2023 15:32:31 GMT
< Transfer-Encoding: chunked
<
* Excess found: excess = 5 url = / (zero-length body)
* Connection #0 to host localhost left intact
```

Note the "Excess found" bit and "Transfer-Encoding: chunked"

## Questions

- Is there a reason that Transfer-Encoding is set to chunked, even though the body should be empty?

# Run node.js test scripts

These are a couple of test scripts that throw 100 concurrent requests to the server. The server does not seem to be able to handle it.

```
node test/client-fetch.js
```

```
node test/client-request.js
```
