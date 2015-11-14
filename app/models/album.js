var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlbumSchema  = new Schema({
    title: String,
	release_year : Number,
	reciter : mongoose.Schema.ObjectId
});

AlbumSchema.methods.getnaats = function(callback) {
    var naat = require('./naat.js');
    var query = naat.find({
       album: this._id 
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

module.exports = mongoose.model('Album', AlbumSchema);