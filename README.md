# Http server mock

## Requirements

Node 18 (fetch API)

## What is it even for?

Well.. It's for testing purposes.

---

## How it works?

You are in control. Declare what http server should return.

Just like that:

```javascript
server.on(
  {
    url: "/api/test",
    method: "GET",
  },
  {
    status: 200,
    body: {
      errors: [],
      success: true,
      value: {
        data: "Let's go!",
      },
    },
    headers: {
      x: "y",
    },
  }
);
```

Then make http request.

That's it.

Simple.

---

## Try it out

### Install packages

`npm ci`

### Run tests

`npm run test`
