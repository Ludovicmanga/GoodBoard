import express from "express";
import {
  createBoard,
  getBoard,
  getUserBoards,
  getShareUrl,
  getPublicBoard,
  updateColor,
  uploadImage,
  updatePublicStatus,
  getPublicStatus,
} from "../controllers/board.controller";

const router = express();

router.get("/get/user-boards", getUserBoards);
router.get("/get/:boardId", getBoard);
router.post("/create", createBoard);
router.post("/get-public-status", getPublicStatus);
router.post("/update-color", updateColor);
router.post("/update-public-status", updatePublicStatus);
//router.get('/:token', getPublicBoard);
router.post("/get-share-url", getShareUrl);
router.post("/upload-image", uploadImage);

export default router;
