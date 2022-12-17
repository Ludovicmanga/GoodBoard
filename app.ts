import createError from 'http-errors';
import express from 'express';
import passport from 'passport';
import './config/db.ts';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    'allowed-Headers': ['sessionId', 'Content-type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, DELETE',
    'preflightContinue': false
}

import usersRouter from './routes/users';
import featureRequestRouter from './routes/featureRequest';

const PORT = 8080;

const sessionStore = MongoStore.create({
  mongoUrl: "mongodb+srv://ludovicmangaj:M433c'm442B@cluster0.fhytx.mongodb.net/goodboard",
  collectionName: 'sessions'
})

var app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'this is my secrethkjrhkfrhkfh',
  resave: false,
  saveUnitialized: true,
  store: sessionStore,
  cookie: {
    MaxAge: 1000 * 60 * 60 * 24
  }
}))

import './config/passport.setup';

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/feature-request', featureRequestRouter);

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

app.listen(process.env.PORT || 5000, () => {
  console.log(`le serveur est lancé sur le port ${PORT}`);
})

module.exports = app;