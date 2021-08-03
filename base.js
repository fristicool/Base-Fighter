const mongoose = require('mongoose')

var base = mongoose.model('base', {
    id: { type: String },
    lat: { type: String },
    lon: { type: String }
    // color: { type: String },
    // date: { type: String }
}, 'b')

module.exports = { base }