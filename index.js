var express = require('express');
var bodyParser = require('body-parser')
var pinger = require("./libs/ping.js");
var storage = require("./libs/storage.js");

//Start Express 
var app = express();

//Body Parser module for express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//[[[Start Ping Routes]]]
//Route for connected mobiles to ping to let server know it is alive 
app.get('/service/liveMobs/ping/:phoneNumber', function(req, res){
	pinger.ping(req.params.phoneNumber, function(pong){
		res.send(pong);
	})
});

app.get('/service/liveMobs/getLive',function(req, res){
	pinger.getLive(function(data){
		res.send(data);
	});
})
//[[[END Ping Routes]]]

//[[[Start Send Sms Routes]]]
app.post('/service/sendSmsData',function(req,res){
	//TODO: Send the data to storage module under libs 
	storage.saveData(req.body.phoneNumber, "Data", "Date",function(data){
		res.send(data);
	});
})
//[[[End Send Sms Routes]]]

//Start Server 
app.listen(3000);