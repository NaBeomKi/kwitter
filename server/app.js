import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-error";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  const server = app.listen(config.port, () =>
    console.log(
      `Start Server 🚀: http://localhost:${config.port}, ${new Date()}`
    )
  );
  initSocket(server);
});
