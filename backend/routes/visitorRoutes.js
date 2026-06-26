const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// @route   GET /api/visitors
// @desc    Increment and get total visitors
router.get('/', async (req, res) => {
    try {
        let visitor = await Visitor.findOne({ identifier: 'main' });
        if (!visitor) {
            visitor = new Visitor({ identifier: 'main', count: 1001 });
        } else {
            visitor.count += 1;
        }
        await visitor.save();
        res.json({ totalVisitors: visitor.count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/visitors/count
// @desc    Just get total visitors without incrementing (optional utility)
router.get('/count', async (req, res) => {
    try {
        let visitor = await Visitor.findOne({ identifier: 'main' });
        res.json({ totalVisitors: visitor ? visitor.count : 1000 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
