const mongoose = require("mongoose");
// mongodb+srv://fristicool:Donkey@wiki.2um1y.mongodb.net/wiki
// mongodb://localhost:27017/wiki
mongoose.connect('mongodb+srv://fristicool:Donkey@wiki.2um1y.mongodb.net/wiki', (err) => {
    if (!err)
        console.log('Connection succeeded.')
    else
        console.log('err in connection: ' + JSON.stringify(err, undefined, 2));
});

mongoose.exports = mongoose; 