function ping(phoneNumber, callback)
{
	//TODO: Write to Redis, HSET with a key life of 5 minutes, key contains last timestamp. On Success return true
	callback("Done On -> "+phoneNumber);
}

function getLive(callback)
{
	//TODO: Read all live keys here on Redis and send back through callback
	callback("DATA HERE");
}

exports.ping = ping;
exports.getLive = getLive;