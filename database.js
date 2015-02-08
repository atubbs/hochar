var path = require('path');
var nconf = require('nconf');
var fs = require('fs');

var fullpath = path.join(__dirname, 'data/' + nconf.get('dbfile'));
var Datastore = require('nedb'), fs = require('fs');

// NB: new db is created if it doesn't exist, no warning will be generated
var db = new Datastore({ filename: fullpath, autoload: true });
module.exports = {
  handle : db
};

