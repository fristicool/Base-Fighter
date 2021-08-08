const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { troop } = require('../troop')

router.get('/get/:lat1/:lat2/:lon1/:lon2/:range', (req, res) => {
    var lat = req.params.lat1 + "." + req.params.lat2
    var lon = req.params.lon1 + "." + req.params.lon2

    lat = parseFloat(req.params.lat)
    lon = parseFloat(req.params.lon)

    var range = parseFloat("0." + req.params.range) / 2;

    var minlat = lat - range;
    var maxlat = lat + range;
    
    var minlon = lon - range;
    var maxlon = lon + range;

    troop.find({latN: { $gte: minlat, $lte: maxlat }, lonN: { $gte: minlon, $lte: maxlon }}, (err, data) => {
        //res.send(data)

        // var tmr = {
        //     lat,
        //     lon,
        //     range,
        //     data
        // }
    
        // res.send(tmr)

        console.log(data)

        if(!Array.isArray(data)) {
            data = [data]
        }
        console.log(data)

        var tilten = 10 - data.length

        for (var i = 0; i < tilten; i++) {
            console.log(i)
            var rangeR = range * Math.random()
            var mop = Math.random()

            if (mop < 0.5) {
                rangeR = rangeR * -1
            }

            var rangeR2 = range* Math.random()
            var mop2 = Math.random()

            if (mop2 < 0.5) {
                rangeR2 = rangeR2 * -1
            }

            var t = new troop({
                lat: new String(lat + rangeR),
                lon: new String(lon + rangeR2),
                latN: lat + rangeR,
                lonN: lon + rangeR2
            });
            t.save((err, doc) => {
        
                if (!err) { console.log("saved new troop")}
                else { console.log('Error in base Save :' + JSON.stringify(err, undefined, 2)); }
            });
        }

        var tForUnity = {
            data
        }
        if (data.length > 0) {
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