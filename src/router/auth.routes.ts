import express from 'express';
import passport from '../middlewares/passport';
import jwt from 'jsonwebtoken';
import enviroments from '../config/enviroments';

const router = express.Router();

const CLIENT_URL = "http://localhost:3000/profile";

router.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect("/");
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", {session: false}),
    (req: any, res: any) => {
    // Successful authentication, generate a token and redirect home.
    console.log("req user: ", req.user);
    const token = jwt.sign(req.user, enviroments.jwt.secret, { expiresIn: '24h' });
    res.cookie("token", token, { secure: true, maxAge: 2 * 60 * 60 * 1000 });
    res.redirect(`${CLIENT_URL}`);
});

export default router;