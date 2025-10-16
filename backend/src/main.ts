import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import { readFileSync } from "fs";
import authRouter from "./routes/auth.routes";
import costRouter from "./routes/cost.routes";
import projectRouter from "./routes/project.routes";
import milestonesRouter from "./routes/milestones.routes";
import userRouter from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from "./packages/error-handler/error-middleware";

const swaggerDocument = JSON.parse(readFileSync("swagger-output.json", "utf8"));

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://webvirtus.it.com",
    ],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

//swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs-json", (_req, res) => {
  res.json(swaggerDocument);
});

// Example route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send({ message: "Health of webVirtus server is Good..." });
});

app.use("/", authRouter);
app.use("/", costRouter);
app.use("/", projectRouter);
app.use("/", milestonesRouter);
app.use("/", userRouter);

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.log(`Error while starting the server`, err);
});
