const http = require("http");
const { buffer } = require("stream/consumers");

const url = process.env.TEST_URL ?? "http://localhost:8081";
const count = parseInt(process.env.TEST_COUNT ?? "100");
const start = Date.now();

const requests = Array.from({ length: count }).map((_, i) => {
  return new Promise((resolve, reject) => {
    const request = http.get(`${url}?req=${i}`);

    request.on("response", async (response) => {
      try {
        const data = await buffer(response);
        console.log("Response", i, response.statusCode, data.toString("utf-8"));
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
});

Promise.all(requests)
  .then(() => {
    console.log(`Finished ${count} requests in ${Date.now() - start}ms`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

process.on("SIGTERM", () => process.exit(1));
