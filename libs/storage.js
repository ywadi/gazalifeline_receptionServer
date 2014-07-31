var MongoClient = require('mongodb').MongoClient, format = require('util').format;

function saveData(phoneNumber, Data, Date, callback)
{
    MongoClient.connect('mongodb://127.0.0.1:27017/gllSms', function(err, db) {
        if(err) throw err;
        var collection = db.collection('smsInbox');
        collection.insert({senderNumber: phoneNumber, smsText: Data, smsDate: Date}, function(err, docs) {
            callback(docs);    
        });
    })
}
exports.saveData = saveData;