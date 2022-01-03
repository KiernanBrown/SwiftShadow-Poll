const { Router } = require('express');
const passport = require('passport');
const HOMEPAGE_URL = 'http://localhost:3000';

const router = Router();

router.get('/login', passport.authenticate('twitch'));
router.get(
  '/login/callback',
  passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(HOMEPAGE_URL);
  }
);

router.get('/user', (req, res) => {
  if (req.user) {
    res.json({
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(HOMEPAGE_URL);
});


module.exports = router;