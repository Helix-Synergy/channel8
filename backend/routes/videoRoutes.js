const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { storage } = require('../config/cloudinary');

const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), videoController.submitVideo);
router.get('/', videoController.getVideos);

module.exports = router;
