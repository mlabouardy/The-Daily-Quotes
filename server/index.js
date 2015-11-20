var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var fs=require('fs');

var app=express();


function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/',function(req,res){
	res.send('Hello');
});

app.get('/quotes/:name',function(req,res){
	var name=req.params.name;
	var url='data/'+name+'.json';
	readJSONFile(url, function (err, json) {
	  if(err) {
	  	res.statusCode=404;
	  	res.send('Category not found');
	  }
	  res.send(json);
	});
	
});

app.listen(3000,function(){
  console.log('Yuupi');
});