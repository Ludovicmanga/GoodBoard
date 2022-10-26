var express = require('express');
var router = express.Router();
var featureRequestController = require('../controllers/featureRequest.controller')

router.get('/get/all', featureRequestController.getAllFeatureRequests);
router.get('/get/all-user', featureRequestController.getAllUserFeatureRequests);
router.get('/get/all-company', featureRequestController.getAllCompanyFeatureRequests);
router.post('/create', featureRequestController.createFeatureRequest);
router.patch("/up-vote/:id", featureRequestController.upVote);
router.patch("/down-vote/:id", featureRequestController.downVote);

module.exports = router;