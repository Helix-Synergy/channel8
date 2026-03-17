const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const multer = require('multer');
const path = require('path');
const { storage } = require('../config/cloudinary');

// Use local disk storage for podcasts if we want to support video uploads easily without Cloudinary size limits, 
// or stick to Cloudinary for thumbnail and disk for video. 
// Given the existing videoRoutes use disk storage, let's use disk storage for podcast videos too.

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

router.get('/', podcastController.getPodcasts);
router.post('/', multer({ storage: storage }).fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), podcastController.createPodcast);
router.delete('/:id', podcastController.deletePodcast);

module.exports = router;
