console.log("[server]: Wait a moment!");

import express, { Express, Request, Response } from "express";
import routers from "./routers/router";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/images", express.static("uploads/images"));

const port = process.env.PORT || 3000;

app.use("/v1", routers);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome!!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
