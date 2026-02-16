const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const multer = require('multer');
const path = require('path');
const { storage } = require('../config/cloudinary');

router.get('/', podcastController.getPodcasts);
router.post('/', multer({ storage: storage }).single('thumbnail'), podcastController.createPodcast);
router.delete('/:id', podcastController.deletePodcast);

module.exports = router;
