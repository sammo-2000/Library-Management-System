import express, { Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Test");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
