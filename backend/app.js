const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const twitchStrategy = require('passport-twitch-strategy').Strategy;
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');

const User = require('./models/user');
const HttpError = require('./models/http-error');

const pollsRoutes = require('./routes/polls-routes');
const pollOptionsRoutes = require('./routes/poll-options-routes');
const userRoutes = require('./routes/users-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Access-Control-Allow-Credentials',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'session',
    keys: ['key2'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// Set up routing
app.use('/api/polls', pollsRoutes);
app.use('/api/options', pollOptionsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  console.dir(error);

  res.status(error.code || 500).json({
    message: error.message || 'An unknown error has occurred.',
  });
});

passport.use(
  'twitch',
  new twitchStrategy(
    {
      clientID: 'ma1u8tt7x0x5o8gdp3fw0hm5lx2a89',
      clientSecret: 'zz98ep01qvqk8xsdn972qh40cfl9nx',
      callbackURL: 'http://localhost:5000/api/auth/login/callback',
      scope: ['user_read', 'user:read:subscriptions'],
    },
    (accessToken, refreshToken, profile, done) => {
      console.dir(profile);
      User.findOne({ twitchId: profile.id })
        .then((user) => {
          if (!user) {
            // Create a new user
            const createdUser = new User({
              username: profile.displayName,
              twitchId: profile.id,
              image: profile.profile_image_url,
              votes: [],
            });

            createdUser
              .save()
              .then((savedUser) => {
                return done(null, savedUser);
              })
              .catch((err) => {
                const error = new HttpError(
                  'Creating user failed, please try again.',
                  500
                );
                return done(error, null);
              });
          }

          return done(null, user);
        })
        .catch((err) => {
          const error = new HttpError(
            'Something went wrong finding users, please try again.',
            500
          );
          return done(error, null);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(new Error('Failed to deserialize user'));
    });
});

mongoose
  .connect(
    'mongodb+srv://SwiftShadow:Bloo12345@cluster0.x57xs.mongodb.net/ssNet?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
