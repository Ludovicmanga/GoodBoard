import express from 'express';
import { createFeatureRequest, deleteFeatureRequest, downVote, getAllBoardFeatureRequests, getAllCompanyFeatureRequests, getAllFeatureRequests, getAllUserFeatureRequests, getChangeLogList, updateFeatureRequest, upVote } from '../controllers/featureRequest.controller';
import { checkAuthenticated } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/get/all', checkAuthenticated, getAllFeatureRequests);
router.get('/get/all-user', getAllUserFeatureRequests);
router.post('/get/all-from-board', getAllBoardFeatureRequests);
router.get('/get/all-company', getAllCompanyFeatureRequests);
router.post('/create', createFeatureRequest);
router.post('/update', updateFeatureRequest);
router.post('/up-vote', upVote);
router.post('/down-vote', downVote);
router.post('/delete', deleteFeatureRequest);
router.post('/get-changelog-list', getChangeLogList);

export default router;