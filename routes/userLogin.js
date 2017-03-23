var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ios', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ios' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.get = function(req, res) {
    db.collection('users', function(err, collection) {
        if(err) {
            console.log(err);
        } else {
            collection.find().toArray(function(err, users) {
                res.send(users);
            });
        }
    });
};

exports.post = function(req, res) {
    console.log(req.body);
    var username = req.body.username,
        password = req.body.password;

    console.log('Retrieving user: ' + username);

    db.collection('users', function(err, collection) {
        if(err) {
            console.log(err);
        } else {
            collection.find({'username': username}).limit(1).next(function(err, user) {
                if(err || !user) {
                    res.send({
                        "error":{
                            "message":"Wrong username or password",
                            "code":404
                        }
                    });
                } else {
                    res.send(user);
                }
            });
        }
    });
};


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var users = [
    {
        "username":"mirko32",
        "password":"slon",
        "profile_image":"5jn36jlhu5kh4tvu853uiorhighvv5",
        "first_name":"Mirko",
        "last_name":"Mirkic",
        "age":21,
        "gender":"M"
    }];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });

};

