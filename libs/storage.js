var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var ObjectID = require('mongodb').ObjectID;

function saveData(userNumber, Data, relayPhone,Date, callback)
{
    MongoClient.connect('mongodb://127.0.0.1:27017/gllSms', function(err, db) {
        if(err) throw err;
        var collection = db.collection('smsInbox');
        collection.insert({senderNumber: userNumber, smsText: Data, relay: relayPhone, smsDate: Date}, function(err, docs) {
            callback(docs);
            db.close();
        });
    })
}

function getAllData(limit, skip, callback)
{

       MongoClient.connect('mongodb://127.0.0.1:27017/gllSms', function(err, db) {
        if(err) throw err;
        var collection = db.collection('smsInbox');
        collection.find().limit(limit).skip(skip).toArray(function(err, results) {
            callback(results);
            db.close();
        });
    })
      
}

function getSms(id, callback)
{

       MongoClient.connect('mongodb://127.0.0.1:27017/gllSms', function(err, db) {
        if(err) throw err;
        var collection = db.collection('smsInbox');
        collection.findOne({_id: new ObjectID(id)}, function(err, results) {
            callback(results);
            db.close();
        });
    })
      
}

function deleteSms(id, callback)
{
    MongoClient.connect('mongodb://127.0.0.1:27017/gllSms', function(err, db) {
        if(err) throw err;
        var collection = db.collection('smsInbox');
        collection.remove({_id: new ObjectID(id)}, function(err, results) {
            callback(results+"");
            db.close();
        });
    })
}

function countSms(callback)
{
       MongoClient.connect('mongodb://127.0.0.1:27017/gllSms', function(err, db) {
        if(err) throw err;
        var collection = db.collection('smsInbox');
        collection.count(function(err, results) {
            callback(results+"");
            db.close();
        });
    }) 
}

exports.countSms = countSms;
exports.saveData = saveData;
exports.getAllData = getAllData;
exports.getSms = getSms;
exports.deleteSms= deleteSms;
