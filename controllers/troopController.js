const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { troop } = require('../troop')

router.get('/:lat/:lon/:range', (req, res) => {
    var lat = parseFloat(req.params.lat)
    var lon = parseFloat(req.params.lon)

    var range = parseFloat(req.params.range) / 2;
    var mop = Math.random()

    if (mop < 0.5) {
        range = range * -1
    }

    troop.find({latN: { $gte: lat - range}}, (err, data) => {
        //res.send(data)

        var found = data.filter(x => x.latN <= lat + range)
        found = found.filter(x => x.lonN >= lon - range)
        found = found.filter(x => x.lonN <= lon + range)

        for (var i = 0; i < 10 - found.length; i + 1) {
            var range = parseFloat(req.params.range) / 2 * Math.random()
            var mop = Math.random()

            if (mop < 0.5) {
                range = range * -1
            }

            var range2 = parseFloat(req.params.range) / 2 * Math.random()
            var mop2 = Math.random()

            if (mop2 < 0.5) {
                range2 = range2 * -1
            }

            var t = new troop({
                lat: new String(lat + range),
                lon: new String(lon + range2),
                latN: lat + range,
                lonN: lon + range2
            });
            t.save((err, doc) => {
        
                if (!err) { res.send(doc); }
                else { console.log('Error in base Save :' + JSON.stringify(err, undefined, 2)); }
            });
        }

        var tForUnity = {
            data: found
        }
        if (found.length > 0) {
            res.send(tForUnity);
        }
        else {
            var error = {
                data: "error"
            }
            res.send(error)
        }
    });

    // var show = req.params.nm - req.params.nl

    // res.send("hi " + show)
});

router.post('/post', (req, res) => {
    var t = new troop({
        lat: req.body.lat,
        lon: req.body.lon,
        latN: req.body.latN,
        lonN: req.body.lonN
    });
    t.save((err, doc) => {

        if (!err) { res.send(doc); }
        else { console.log('Error in base Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;