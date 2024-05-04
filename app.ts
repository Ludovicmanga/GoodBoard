import createError from "http-errors";
import express from "express";
import passport from "passport";
import "./config/db.ts";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootDirname = __dirname;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://goodboard-app-41de944b1f08.herokuapp.com",
  ],
  credentials: true,
  "allowed-Headers": ["sessionId", "Content-type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, DELETE",
  preflightContinue: false,
};

import usersRouter from "./routes/users";
import featureRequestRouter from "./routes/featureRequest";
import boardRouter from "./routes/board";
import integrationRouter from "./routes/integration";

var app = express();
import "./config/passport.setup";

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable("trust proxy");
app.use(
  session({
    secret: "this is my secrethkjrhkfrhkfh",
    resave: false,
    saveUnitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", usersRouter);
app.use("/api/integration", integrationRouter);
app.use("/api/board", boardRouter);
app.use("/api/feature-request", featureRequestRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`le serveur est lancé sur le port ${PORT}`);
});

export default app;
