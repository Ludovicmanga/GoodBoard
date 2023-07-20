import express from "express";
import passport from "passport";
import { signUp } from "../controllers/auth.controller";
import { getUser, updateEmail } from "../controllers/user.controller";
var router = express();
router.get("/get/:id", getUser);
router.post('/checkIfAuthenticated', getUser);
router.post("/login", passport.authenticate("local"), function (req, res) {
    res.json({
        user: req.user
    });
});
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json({
            loggedOut: true
        });
    });
});
router.post("/sign-up", signUp);
router.post("/update-email", updateEmail);
export default router;
