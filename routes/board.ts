import express from "express";
import { createBoard } from "../controllers/board.controller";

const router = express();

router.post('/create', createBoard);

export default router;