import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/httpLogger";

const app = express();
app.use(cors({
  origin: `${process.env.ALLOWED_ORIGIN}`,
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use(httpLogger);

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
