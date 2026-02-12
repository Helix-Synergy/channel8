const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-thumbnail-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', podcastController.getPodcasts);
router.post('/', upload.single('thumbnail'), podcastController.createPodcast);
router.delete('/:id', podcastController.deletePodcast);

module.exports = router;
