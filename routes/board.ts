import express from "express";
import { createBoard, getBoard, getUserBoards } from "../controllers/board.controller";

const router = express();

router.post('/create', createBoard);
router.get('/get/user-boards', getUserBoards);
router.post('/get', getBoard);

export default router;