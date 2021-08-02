const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { base } = require('../base')

router.get('/', (req, res) => {
    base.find((err, data) => {
        if (!err) { 
            var bForUnity = {
                data
            }
            res.send(bForUnity); 
        }
        else { console.log('Error in Retriving bases :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/post', (req, res) => {
    var b = new base({
        lat: req.body.lat,
        lon: req.body.lon
    });
    b.save((err, doc) => {

        if (!err) { res.send(doc); }
        else { console.log('Error in base Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;