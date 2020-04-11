// Dependencies
const fs = require('fs');
const http = require('http');
const express = require('express');

const app = express();
//const { Pool, Client } = require('pg')
const pg = require('pg');

require('dotenv').config();
const mongoose = require('mongoose');

request = require('request');
const bodyParser = require('body-parser');
var wget = require('node-wget');
var url = require('url');
var path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');


var groupSchema = new mongoose.Schema({
  AdminName : { type: String, default: null },
  GroupName : { type: String, default: null},
  Longitude : {type: Number, default: null},
  Latitude : {type: Number, default: null},
  GroupChannel : {type: String, default: null},
  GroupDesc : {type: String, default: null},
});

var groupDB = mongoose.model("peergroup", groupSchema);

app.get("/api/ping", function(req, res) {
    res.json({ message: "pong" });
});

app.use('/', express.static(path.join(__dirname, '/html')));

//app.use((req, res) => {
//	res.send('Hello there !');
//});
/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
    next();
});*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// add token acceptance here.
// get token from blockchain and check against sending token from rest api call
//
//
//
app.post("/api/getgroup", function(req, res) {
    var minlongitude = req.body.minlongitude;
    var maxlongitude = req.body.maxlongitude;
    var minlatitude = req.body.minlatitude;
    var maxlatitude = req.body.maxlatitude;
console.log(minlongitude);
console.log(maxlongitude);
console.log(minlatitude);
console.log(maxlatitude);
groupDB.
  find({
    Longitude: { $gt: minlongitude, $lt: maxlongitude },
    Latitude: { $gt: minlatitude, $lt: maxlatitude }
  }, function (err, doc) {
	  if (err) {
		  res.json({"message": "error", "doc": null}) 
	  } else {
		  res.json({ "message": "Correct", "doc": doc})
	  }
  });


});

app.post("/api/addgroup", function(req, res) {
    var adminname = req.body.adminname;
    var groupname = req.body.groupname;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var groupchannel = req.body.groupchannel;
    var groupdesc = req.body.groupdesc;
    // var testBuffer = req.body.image;
    var groupCreate = new groupDB({
    AdminName : adminname,
    GroupName : groupname,
    Longitude : longitude,
    Latitude : latitude,
    GroupChannel : groupchannel,
    GroupDesc : groupdesc
    });

  groupDB.findOne({ GroupName : groupname}, function(err, doc){
    if(doc == null){
      groupCreate.save(function(err, doc){
        if(err) throw err;

         res.json({ message: "Correct" });
      });
    }else{
         res.json({ message: "group exists"});
    }
  });


});


// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log('HTTP Server running on port 3000');
});
