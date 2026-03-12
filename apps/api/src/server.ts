import express from "express";

const app = express();

app.use(express.json());

const port = process.env.PORT

app.get("/", (_, res) => {
  res.json({
    message: "API Server Running successfully",
    info:`check health checkpoint at /health`
  });
});


app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()>=60?process.uptime()>=3600?`${process.uptime()/3600} HRS ${process.uptime()%3600} MIN ${process.uptime()%60} SEC`:`${process.uptime()/60} MIN ${process.uptime()%60} SEC`:`${process.uptime()} SEC`,
    timestamp: new Date(Date.now())
  });
});

const server = app.listen(port, () => {
  const address = server.address();
  if (typeof address === "object" && address) {
    const host = address.address === "::" ? "localhost" : address.address;
    const port = address.port;

    console.log(`API running at http://${host}:${port}`)
  }
})
