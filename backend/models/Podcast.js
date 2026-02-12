const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String // e.g., "12:30"
    },
    date: {
        type: String // e.g., "Oct 24"
    },
    audioUrl: {
        type: String // URL to audio/video file if hosted externally or uploaded path
    },
    thumbnailUrl: {
        type: String // Path to uploaded image
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Podcast', PodcastSchema);
