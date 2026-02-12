const Podcast = require('../models/Podcast');

// Get all podcasts
exports.getPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.find().sort({ createdAt: -1 });
        res.status(200).json(podcasts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new podcast
exports.createPodcast = async (req, res) => {
    try {
        const { title, description, duration, date, audioUrl } = req.body;
        const thumbnailPath = req.file ? req.file.path : null;

        const newPodcast = new Podcast({
            title,
            description,
            duration,
            date,
            audioUrl,
            thumbnailUrl: thumbnailPath
        });

        await newPodcast.save();
        res.status(201).json({ message: 'Podcast created successfully', podcast: newPodcast });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a podcast
exports.deletePodcast = async (req, res) => {
    try {
        await Podcast.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Podcast deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
