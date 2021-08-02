const mongoose = require('mongoose')

var base = mongoose.model('base', {
    id: { type: String },
    lat: { type: Number },
    lon: { type: Number }
    // color: { type: String },
    // date: { type: String }
}, 'b')

module.exports = { base }