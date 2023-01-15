import express from 'express';
import passport from '../passport';

const router = express.Router();

const CLIENT_URL = process.env.ALLOW_ORIGIN || "";

router.get("/logout", (req, res) => {
    //req.logout();
    res.redirect(CLIENT_URL);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

export default router;

/* router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), (req: any, res: any) => {
  // Successful authentication, redirect home.
  const token = jwt.sign({ email: req.user.email }, 'secret', { expiresIn: '24h' });
  res.redirect(`http://localhost:3000?token=${token}`);
}); */
