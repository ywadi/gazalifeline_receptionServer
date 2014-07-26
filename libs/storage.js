function saveData(phoneNumber, Data, Date, callback)
{
	//TODO: Save the data on Mongo, once completed return true
	callback(phoneNumber +" - "+Data+" - "+Date);
}

exports.saveData = saveData;