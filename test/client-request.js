const http = require("http");
const { buffer } = require("stream/consumers");

Promise.all(
  Array.from({ length: 100 }).map((_, i) => {
    return new Promise((resolve, reject) => {
      const request = http.get(`http://localhost:8081?req=${i}`);

      request.on("response", async (response) => {
        try {
          const data = await buffer(response);
          console.log("Response", i, response.statusCode);
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      request.on("error", reject);
    });
  })
)
  .then(() => {
    console.log("All requests finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
