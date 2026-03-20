import "dotenv/config";
import app from "./app";

const port = process.env.PORT;

const server = app.listen(port, () => {
  const address = server.address();
  if (typeof address === "object" && address) {
    const host = address.address === "::" ? "localhost" : address.address;
    const port = address.port;

    console.log(`API running at http://${host}:${port}`)
  }
})
