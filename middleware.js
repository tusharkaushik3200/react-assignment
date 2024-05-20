export default function middleware(req, res, next) {
    // Your middleware logic goes here
    console.log("Middleware executed!");
    // next(); // Call next() to pass control to the next middleware or route handler
  }

export const config = {
    matcher: ["/work-orders-create", "/work-orders"],
  };