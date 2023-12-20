const url = process.env.TEST_URL ?? "http://localhost:8081";
const start = Date.now();
const count = parseInt(process.env.TEST_COUNT ?? "100");

const requests = Array.from({ length: count }).map(async (_, i) => {
  const response = await fetch(`${url}?req=${i}`);
  const body = await response.text();
  console.log("Response", i, response.status, body);
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
