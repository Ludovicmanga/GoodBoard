import express from "express";
import { updateVoteChangelog } from "../controllers/changelog.controller";
const router = express();

router.post('/update-vote', updateVoteChangelog);

export default router;