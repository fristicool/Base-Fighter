const mongoose = require('mongoose')

var troop = mongoose.model('troop', {
    id: { type: String },
    lat: { type: String },
    lon: { type: String },
    latN: { type: Number },
    lonN: { type: Number }
    // color: { type: String },
    // date: { type: String }
}, 't')

module.exports = { troop }