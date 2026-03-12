import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Mindscape API running");
});

app.listen(4000, () => {
  console.log("API running on port 4000");
});
