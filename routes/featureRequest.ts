import express from 'express';
import { createFeatureRequest, deleteFeatureRequest, downVote, getAllCompanyFeatureRequests, getAllFeatureRequests, getAllUserFeatureRequests, updateFeatureRequest, upVote } from '../controllers/featureRequest.controller';
const router = express.Router();

router.get('/get/all', getAllFeatureRequests);
router.get('/get/all-user', getAllUserFeatureRequests);
router.get('/get/all-company', getAllCompanyFeatureRequests);
router.post('/create', createFeatureRequest);
router.post('/update', updateFeatureRequest);
router.post('/up-vote/:id', upVote);
router.post('/down-vote/:id', downVote);
router.post('/delete', deleteFeatureRequest);

export default router;