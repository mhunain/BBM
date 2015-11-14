// <reference path = "./typings/tsd.d.ts"/>

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://naatdb:naatdb@ds049754.mongolab.com:49754/naatdb'); // connect to our database

var Reciter   = require('./app/models/Reciter');
var Album   = require('./app/models/album');
var Naat   = require('./app/models/naat');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;        // set our port

    
    app.post('/addreciter', function(request, response) {
        var name = request.body.name;
        var picture_url = request.body.picture_url;
        var language = request.body.language;
        
        
        var reciter = new Reciter();
        reciter.name = name;
        reciter.picture_url = picture_url;
        reciter.language = language;
        
        reciter.save(function(error) {
            if (error) {
                response.send({
                    sucess: false
                })
            } else {
                response.send({
                    sucess: true,
                    id: reciter._id
                })
            }
        })
        
    });
    
    app.get('/reciters/:reciter_id', function(request, response) {
        var id = request.params.reciter_id
        
        var query = Reciter.find({
       _id: id 
    });
    query.exec(
        function(error, reciter) {
            if (error) {
                response.send({
                    error: true,
                    error_content: error
                });
            } else {
                response.send({
                    error: false,
                    reciter: reciter
                });
            }
        }
    );
    });
    
    
    
    
    
    app.get('/:reciter_id/allalbums', function(request, response) {
        var id = request.params.reciter_id
        
        var query = Album.find({
        reciter: id 
    });
    query.exec(
        function(error, albums) {
            if (error) {
                response.send({
                    error: true,
                    error_content: error
                });
            } else {
                response.send({
                    error: false,
                    albums: albums
                });
            }
        }
    );
    });
    
    app.get('/allreciters', function(request, response) {
        var id = request.params.reciter_id
        
        var query = Reciter.find({
    });
    query.exec(
        function(error, reciter) {
            if (error) {
                response.send({
                    error: true,
                    error_content: error
                });
            } else {
                response.send({
                    error: false,
                    reciters: reciter
                });
            }
        }
    );
    });
    
    
    
    
    app.post('/addalbum/:reciterId', function(request, response) {
        var title = request.body.title;
        var release_year = request.body.release_year;
        var reciterId = request.params.reciterId;
        
        var album = new Album();
        album.title = title;
        album.release_year = release_year;
        album.reciter = reciterId;
        album.save(function(error) {
            if (error) {
                response.send({
                    sucess: false
                })
            } else {
                response.send({
                    sucess: true,
                    id: album._id
                })
            }
        })
        
    });
    
    app.get('/album/:album_id', function(request, response) {
        var id = request.params.album_id
        
        var query = Album.find({
       _id: id 
    });
    query.exec(
        function(error, albums) {
            if (error) {
                response.send({
                    error: true,
                    error_content: error
                });
            } else {
                response.send({
                    error: false,
                    album: albums
                });
            }
        }
    );
    });
    
    app.get('/allnaat/:reciter_id/:album_id', function(request, response) {
        var albumid = request.params.album_id
        var reciterid = request.params.reciter_id
        
        
        if albumid == -1 {
            var query = Album.find({
               reciter: reciterid
           });
        }
        else {
            var query = Album.find({
               reciter: reciterid
               album: albumid
           });
        }
  
    query.exec(
        function(error, naats) {
            if (error) {
                response.send({
                    error: true,
                    error_content: error
                });
            } else {
                response.send({
                    error: false,
                    naats: naats
                });
            }
        }
    );
    });
    
    
    app.post('/addnaat/:reciterId/:albumId', function(request, response) {
        var title = request.body.title;
        var naat_url = request.body.naat_url;
        var playTime = request.body.playTime;
        var albumId = request.params.albumId;
        var preciterId = request.params.reciterId;
        
        var naat = new Naat();
        naat.title = title;
        naat.naat_url = naat_url;
        naat.playTime = playTime;
        naat.albumId = album;
        naat.reciterId = reciter;
        
        naat.save(function(error) {
            if (error) {
                response.send({
                    sucess: false
                })
            } else {
                response.send({
                    sucess: true,
                    id: naat._id
                })
            }
        })
        
    });
    
    // app.get('/naat/:naat_id', function(request, response) {
    //     var id = request.params.naat_id
        
    //     var query = Naat.find({
    //    _id: id 
    // });
    // query.exec(
    //     function(error, naats) {
    //         if (error) {
    //             response.send({
    //                 error: true,
    //                 error_content: error
    //             });
    //         } else {
    //             response.send({
    //                 error: false,
    //                 naat: naats
    //             });
    //         }
    //     }
    // );
    // });
    
    
    
app.listen(port);
console.log('Magic happens on port ' + port);
