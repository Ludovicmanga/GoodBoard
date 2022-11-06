import express from 'express';
import { createFeatureRequest, downVote, getAllCompanyFeatureRequests, getAllFeatureRequests, getAllUserFeatureRequests, upVote } from '../controllers/featureRequest.controller';
const router = express.Router();

router.get('/get/all', getAllFeatureRequests);
router.get('/get/all-user', getAllUserFeatureRequests);
router.get('/get/all-company', getAllCompanyFeatureRequests);
router.post('/create', createFeatureRequest);
router.post('/up-vote/:id', upVote);
router.post('/down-vote/:id', downVote);

export default router;