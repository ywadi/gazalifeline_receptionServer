var redis = require("redis"), client = redis.createClient();

client.on("error", function (err) {
        //Track errors on Console.log -> Forever logs 
        console.log("Error: " + err);
    });

function ping(phoneNumber, callback)
{
	//Write to Redis, HSET with a key life of 5 minutes, key contains last timestamp. On Success return true
	var pingDate = new Date(); //Server Date and time are UTC 
	client.hset(phoneNumber, "lastDate", pingDate, function(err,reply){
	    client.expire(phoneNumber,5*60);
	    callback("Pong: "+phoneNumber);    
	});
	
}

function getLive(callback)
{
	//Read all live keys here on Redis and send back through callback
	client.keys("*", function (err, replies) {
        callback(replies);
    }); 
	
}

exports.ping = ping;
exports.getLive = getLive;