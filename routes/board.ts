import express from "express";
import { createBoard, getBoard, getUserBoards, getShareUrl, getPublicBoard, updateColor, uploadImage } from "../controllers/board.controller";

const router = express();

router.post('/create', createBoard);
router.get('/get/user-boards', getUserBoards);
router.get('/get/:boardId', getBoard);
router.post('/update-color', updateColor);
router.get('/:token', getPublicBoard);
router.post('/get-share-url', getShareUrl);
router.post('/upload-image', uploadImage);

export default router;