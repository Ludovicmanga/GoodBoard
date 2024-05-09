import express from 'express'
import { create, getAllFromBoard } from '../controllers/topic.controller';

const router = express();

router.post("/create", create);
router.post("/get-all", getAllFromBoard);

export default router;
