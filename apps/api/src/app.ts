import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
app.use(cors({
  origin: `*`,
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api", routes);

app.use(errorMiddleware);

export default app;
