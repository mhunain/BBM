var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReciterSchema  = new Schema({
    name: String,
    picture_url: String,
    language: Number,
    /*
    1. Urdu
    2. English
    3. Arabic
     */
    
});

ReciterSchema.methods.getAlbums = function(callback) {
    var Album = require('./album.js');
    var query = Album.find({
       reciter: this._id 
    });
    query.exec(
        function(error, albums) {
            if (error) {
                
                callback(error, null)
            } else {
                
                callback(null, albums)
            }
        }
    )
}

ReciterSchema.methods.getnaats = function(callback) {
    var naat = require('./naat.js');
    var query = naat.find({
       reciter: this._id 
    });
    query.exec(
        function(error, naats) {
            if (error) {
                
                callback(error, null)
            } else {
                
                callback(null, naats)
            }
        }
    )
}

module.exports = mongoose.model('Reciter', ReciterSchema);