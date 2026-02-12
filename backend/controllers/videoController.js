const Video = require('../models/Video');

exports.submitVideo = async (req, res) => {
    try {
        const { name, email, description } = req.body;
        const videoPath = req.file ? req.file.path : null;

        if (!videoPath) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        const newVideo = new Video({
            name,
            email,
            description,
            videoPath
        });

        await newVideo.save();

        res.status(201).json({ message: 'Video submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
