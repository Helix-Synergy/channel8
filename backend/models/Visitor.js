const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    identifier: { type: String, default: 'main' },
    count: { type: Number, default: 1000 }
});

module.exports = mongoose.model('Visitor', visitorSchema);
