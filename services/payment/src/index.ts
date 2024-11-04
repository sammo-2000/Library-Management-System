// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { env } from "./types/envTypes";

const app = express();
const PORT = env.Port;

app.get("/", (req: Request, res: Response) => {
  res.send("Calling /");
});

app.listen(PORT, () => {
  console.log();
});


