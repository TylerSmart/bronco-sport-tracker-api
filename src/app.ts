import express, { Request, Response } from "express";

import cors from "cors";
import { vehicleRouter } from "./routes";

export const app = express();
app.use(
  cors({
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "authorization",
    ],
    credentials: true,
    methods: "GET,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/health", (_req, res) => {
  const uptime = process.uptime();
  console.log({ uptime });
  res.status(200).json({ uptime });
});

app.use("/api/echo", (req, res) => {
  console.log(req.body);
  res.status(200).json({ data: req.body });
});

app.use("/vehicle", vehicleRouter);

app.all("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "That endpoint does not exist." });
});
