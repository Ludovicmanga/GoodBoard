import createError from 'http-errors';
import express from 'express';
import passport from 'passport';
import './config/db.ts';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootDirname = __dirname;

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000', 'https://goodboard-app.herokuapp.com'],
    credentials: true,
    'allowed-Headers': ['sessionId', 'Content-type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, DELETE',
    'preflightContinue': false
}

import usersRouter from './routes/users';
import featureRequestRouter from './routes/featureRequest';
import boardRouter from './routes/board';
import integrationRouter from './routes/integration';
import topicsRouter from './routes/topics';

var app = express();
import './config/passport.setup';

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable('trust proxy')
app.use(session({
  secret: 'this is my secrethkjrhkfrhkfh',
  resave: false,
  saveUnitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://ludovicmangaj:M433c'm442B@cluster0.fhytx.mongodb.net/goodboard",
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
  },
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', usersRouter);
app.use('/api/integration', integrationRouter);
app.use('/api/board', boardRouter);
app.use('/api/feature-request', featureRequestRouter);
app.use('/api/topics', topicsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`le serveur est lancé sur le port ${PORT}`);
})

export default app;
