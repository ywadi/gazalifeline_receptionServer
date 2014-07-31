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
app.post('/service/sms/sendSmsData',function(req,res){
	//TODO: Send the data to storage module under libs 
	storage.saveData(req.body.userNumber, req.body.Data, req.body.relayPhone,new Date(),function(response){
		res.send(response);
	});
})
//[[[End Send Sms Routes]]]

//[[[Start Get ALl Sms Routes]]]
app.get('/service/sms/getSmsData/:limit/:skip',function(req, res){
    storage.getAllData(parseInt(req.params.limit), parseInt(req.params.skip),function(data){
       res.send(data); 
    });
});
//[[[End Get All Sms Routes]]]

//[[[Start Get Sms By Id Routes]]]
app.get('/service/sms/getSms/:id',function(req, res){
    storage.getSms(req.params.id,function(data){
       res.send(data); 
    });
});
//[[[End Get Sms Routes]]]

//[[[Start Delete Sms By Id Routes]]]
app.delete('/service/sms/deleteSms/:id',function(req, res){
    storage.deleteSms(req.params.id,function(data){
       res.send(data); 
    });
});
//[[[End Delete Sms By Id Routes]]]

//[[[Start Get Sms Count Routes]]]
app.get('/service/sms/countSms',function(req, res){
    storage.countSms(function(data){
       res.send(data); 
    });
});
//[[[End Delete Sms By Id Routes]]]


//Start Server 
app.listen(3000);