const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    content: { type: String, required: false, max: 1000},
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);