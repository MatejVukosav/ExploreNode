var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ios', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ios' database");
        db.collection('schedules', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'schedules' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.get = function(req, res) {
    db.collection('schedules', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send({
                "data": items[0]
            });
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var schedules = [
    {
        "days":3,
        "schedule":[
                    {
                        "day":"23.03.2017",
                        "lectures":[
                            {
                                "time":"09:00-12:00",
                                "title":"Uvod u Swift",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Pero Peric",
                                    "biography":"Pero je vrsni swiftas"
                                },
                                "short_descripton":"Kratak uvod u swift na kojem ce se nauciti najosnovnije stvari"
                            },
                            {
                                "time":"12:00-14:00",
                                "title":"Swift za napredne",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Jovana Lovric",
                                    "biography":"Jovana je rodena u japanu"
                                },
                                "short_descripton":"Jovana ce nam pokazati naprednije stvari o swiftu"
                            },
                            {
                                "time":"14:00-16:00",
                                "title":"Alamofire",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Marjan Mikic",
                                    "biography":"Marjan zivi u Zadru"
                                },
                                "short_descripton":"Alamofire da ili name"
                            }
                        ]

                    },
                    {
                        "day":"24.03.2017",
                        "lectures":[
                            {
                                "time":"08:00-12:00",
                                "title":"Uvod u Postgres",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Bruce Peric",
                                    "biography":"Bruce je vrsni bazas"
                                },
                                "short_descripton":"Baze su krasne"
                            },
                            {
                                "time":"12:00-14:00",
                                "title":"Postgres za napredne",
                                "location":"A101",
                                "lecturer":{
                                    "name":"John Lovric",
                                    "biography":"John je roden u japanu"
                                },
                                "short_descripton":"Kako raditi tablice kao veliki"
                            },
                            {
                                "time":"14:00-16:00",
                                "title":"Nerelacijske baze",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Ivan Ivic",
                                    "biography":"Ivan zivi u Zadru"
                                },
                                "short_descripton":"Prednosti i mane nerelacijskih baza"
                            }
                        ]
                    },
                    {
                        "day":"25.03.2017",
                        "lectures":[
                            {
                                "time":"09:00-11:00",
                                "title":"Uvod u Android",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Andro Peric",
                                    "biography":"Pero je vrsni swiftas"
                                },
                                "short_descripton":"Kratak uvod u swift na kojem ce se nauciti najosnovnije stvari"
                            },
                            {
                                "time":"12:00-14:00",
                                "title":"Android za napredne",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Mirjana Lovric",
                                    "biography":"Mirjana je rodena u japanu"
                                },
                                "short_descripton":"Mirjana ce nam pokazati naprednije stvari o Androidu"
                            },
                            {
                                "time":"14:00-16:00",
                                "title":"Retrofit 2",
                                "location":"A101",
                                "lecturer":{
                                    "name":"Lucija Mikic",
                                    "biography":"Lucija zivi u Zadru"
                                },
                                "short_descripton":"HTTP client koji obecava"
                            }
                        ]
                    }
            ]
    }];

    db.collection('schedules', function(err, collection) {
        collection.insert(schedules, {safe:true}, function(err, result) {});
    });

};

