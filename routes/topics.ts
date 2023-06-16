import express from "express";
import { getAllTopics } from "../controllers/topics.controller";
const router = express();

router.get('/get-all', getAllTopics);


export default router;