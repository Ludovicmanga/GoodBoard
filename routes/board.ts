import express from "express";
import { createBoard, getBoard, getUserBoards, getShareUrl, getPublicBoard, checkIfTokenIsValid } from "../controllers/board.controller";

const router = express();

router.post('/create', createBoard);
router.get('/get/user-boards', getUserBoards);
router.get('/get/:boardId', getBoard);
router.get('/:token', getPublicBoard);
router.post('/get-share-url', getShareUrl);

export default router;