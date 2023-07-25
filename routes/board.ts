import express from "express";
import {
  createBoard,
  getBoard,
  getUserBoards,
  getShareUrl,
  updateColor,
  updatePublicStatus,
  getPublicStatus,
  deleteUserFromBoard,
  updateUserRole,
  getBoardUsersList,
  inviteUsers,
  setBoardImage,
  createCheckoutSession,
  createPortalSession,
  updateBoardBillingPlan,
} from "../controllers/board.controller";
import { multerUpload } from "../middleware/multer";

const router = express();

router.get("/get/user-boards", getUserBoards);
router.get("/get/:boardId", getBoard);
router.get("/get-board-users-list/:boardId", getBoardUsersList);
router.post("/invite-users", inviteUsers);
router.post("/create", createBoard);
router.post("/get-public-status", getPublicStatus);
router.post("/update-color", updateColor);
router.post("/update-public-status", updatePublicStatus);
router.post("/get-share-url", getShareUrl);
router.post("/set-board-image", multerUpload.single("image"), setBoardImage);
router.post("/delete-user", deleteUserFromBoard);
router.put("/update-user-role", updateUserRole);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/create-portal-session", createPortalSession);
router.post('/update-board-billing-plan', updateBoardBillingPlan);

//router.get('/:token', getPublicBoard);

export default router;
