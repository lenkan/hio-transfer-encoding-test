Promise.all(
  Array.from({ length: 100 }).map(async (_, i) => {
    const headers = new Headers();
    headers.set("Connection", "close");
    headers.set("Accept-Encoding", null);

    const response = await fetch(`http://localhost:8081?req=${i}`, {
      mode: "no-cors",
      headers,
    });

    const body = await response.text();
    console.log("Response", i, response.status, body);
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
