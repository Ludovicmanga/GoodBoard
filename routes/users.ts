import express from "express";
import passport from "passport";
import { signUp } from "../controllers/auth.controller";
import { getUser } from "../controllers/user.controller";

const router = express();

router.get("/get/:id", getUser);
router.post("/login", passport.authenticate("local"), (req: any, res) => {
  res.send(req.user);
});
router.post('/logout', (req: any, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({
      disconnected: true,
    })
  });
});
router.post("/sign-up", signUp);

export default router;
