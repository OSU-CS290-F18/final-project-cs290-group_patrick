/*
 * Name: Patrick J. Wurth
 * Email: wurthp@oregonstate.edu
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var MongoClient = require('mongodb').MongoClient;
var mongoHost='classmongo.engr.oregonstate.edu';
var mongoPort='27017';
var mongoUsername='cs290_wurthp';
var mongoPassword='cs290_wurthp';
var mongoDBName='cs290_wurthp';


var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB = null;

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  var topicCollection = mongoDB.collection('blog');
  topicCollection.find().toArray(function (err, topicDocs) {    
    res.status(200);
    res.render('home', topicDocs);
  });
});

app.get('/blog/:postid', function(req,res){
  var postid = req.params.postid;
  var postCollection = mongoDB.collection('blog');
  postCollection.find({ id: postid }).toArray(function (err, postDocs) { 
  res.status(200);
  res.render('topic', postDocs);
  });
});

app.get('/about', function(req,res){
  res.status(200);
  res.render('about');
});

app.post('/newTopic', function (req, res, next) {
  if (req.body && req.body.titel && req.body.author && req.body.date && req.body.text) {
    
    var blogs = mongoDB.collection('blog');
    var random = "" + Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000 + "";

    blogs.insertOne({ 
      "id": random,
      "titel": req.body.titel,
      "author": req.body.author,
      "date": req.body.date,
      "text": req.body.text,
      "posts": []
    });
  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});

app.post('/newPost', function (req, res, next) {
  if (req.body && req.body.urlid && req.body.author && req.body.date && req.body.text) {
    
    var blogs = mongoDB.collection('blog');

    blogs.updateOne(
      { "id": req.body.urlid },
      { $push: { posts: { "pauthor": req.body.author, "creator": req.body.creator, "date": req.body.date, "text": req.body.text}}});

  } else {
    res.status(400).send("Request needs a body with a URL and caption");
  }
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.get('*', function (req, res, next) {
  res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});