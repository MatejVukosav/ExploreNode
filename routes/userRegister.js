var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ios', server);

exports.post = function(req, res) {
    var newUser = req.body;
    console.log('Adding user: ' + JSON.stringify(newUser));
    db.collection('users', function(err, collection) {
        if(err) {
            console.log(err);
        } else {
            collection.find({'username': newUser.username}).limit(1).next(function(err, user) {
                if(err) {
                    console.log(err)
                } else {
                    if(user) {
                        res.send({
                            "error":{
                                "message":"Username already exists",
                                "code":404
                            }
                        });
                    } else {
                        collection.insert(newUser, {safe:true}, function(err, result) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Success: ' + JSON.stringify(result.ops[0]));
                                res.send({
                                    "data": result.ops[0]
                                });
                            }
                        });
                    }
                }
            });
        }
    });
}
