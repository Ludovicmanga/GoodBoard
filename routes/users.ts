import express from "express";
import passport from "passport";
import { loginOrSignupGoogle, signUp } from "../controllers/auth.controller";
import {
  deletePicture,
  getUser,
  updateEmail,
  updatePicture,
} from "../controllers/user.controller";
import { multerUpload } from "../middleware/multer";
import { getUserRoleOnThisBoard } from "../helpers/user";

const router = express();

router.get("/get/:id", getUser);
router.post('/login-google', loginOrSignupGoogle)
router.post("/checkIfAuthenticated", getUser);
router.post("/login", passport.authenticate("local"), async (req: any, res) => {
  try {
    let roleOnThisBoard;
  if (req.user) {
    if (req.body.boardId) {
      roleOnThisBoard = await getUserRoleOnThisBoard(req.user, req.body.boardId);
    }
    res.json({
      user: { ...req.user, roleOnThisBoard },
    });
  }
  } catch(e) {
    console.log(e, ' is the error')
  }
  
});
router.post("/logout", (req: any, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({
      loggedOut: true,
    });
  });
});
router.post("/sign-up", signUp);
router.post("/update-email", updateEmail);
router.post("/update-picture", multerUpload.single("image"), updatePicture);
router.put("/delete-picture", deletePicture);

export default router;
