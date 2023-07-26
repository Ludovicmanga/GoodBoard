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
  createCheckoutSession,
  createPortalSession,
  updateBoardBillingPlan,
  checkUserHasAccessToBoard,
  updateBoardImage,
} from "../controllers/board.controller";
import { multerUpload } from "../middleware/multer";

const router = express();

router.get("/get/user-boards", getUserBoards);
router.get("/get/:boardId", getBoard);
router.get("/get-board-users-list/:boardId", getBoardUsersList);
router.post("/invite-users", inviteUsers);
router.post("/create", multerUpload.single("image"), createBoard);
router.post("/get-public-status", getPublicStatus);
router.post("/update-color", updateColor);
router.post("/update-public-status", updatePublicStatus);
router.post("/get-share-url", getShareUrl);
router.post("/update-board-image", multerUpload.single("image"), updateBoardImage);
router.post("/delete-user", deleteUserFromBoard);
router.put("/update-user-role", updateUserRole);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/create-portal-session", createPortalSession);
router.post("/update-board-billing-plan", updateBoardBillingPlan);
router.post('/check-user-has-access-to-board', checkUserHasAccessToBoard);

//router.get('/:token', getPublicBoard);

export default router;
