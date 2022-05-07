"use strict";
var express = require('express');
var router = express.Router();
var featureRequestController = require('../controllers/featureRequest.controller');
router.get('/get/all', featureRequestController.getAllFeatureRequests);
router.post('/create', featureRequestController.createFeatureRequest);
module.exports = router;
