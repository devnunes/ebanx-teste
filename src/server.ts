import { app } from "./app";

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`HTTP Server running on: http://localhost:3333`);
  });

// //GET /balance
// //POST /event
