var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NaatSchema  = new Schema({
    title: String,
    naat_url: String,
    playTime: Number,
    album: mongoose.Schema.ObjectId,
    reciter: mongoose.Schema.ObjectId
});



module.exports = mongoose.model('Naat', NaatSchema);