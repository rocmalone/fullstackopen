sequenceDiagram
Browser->>Server: POST:  Form submit event to /exampleapp/new_note
Server->>Browser: HTTP STATUS 302: URL redirect to /exampleapp/notes
Browser->>Server: GET: /exampleapp/notes
Server->>Browser: HTTP STATUS 304: Resource unmodified, redirect to cached copy of /exampleapp/notes
Browser->>Server: GET: /exampleapp/main.css
Server->>Browser: HTTP STATUS 304: Resource unmodified, redirect to cached copy of /exampleapp/main.css
Browser->>Server: GET: /exampleapp/main.js
Server->>Browser: HTTP STATUS 304: Resource unmodified, redirect to cached copy of /exampleapp/main.js
Browser->>Server: GET: /exampleapp/data.json
Server->>Browser: HTTP STATUS 200: Request succeeded, /exampleapp/data.json sent