import express from "express";
import cors from "cors";

import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

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

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
