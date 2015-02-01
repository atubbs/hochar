var Datastore = require('nedb'), fs = require('fs');
// TODO: this is hardcoded; may want it either some generic or something configurable
//var db = new Datastore({ filename: __dirname + 'data/tried_and_true.json', autoload: true });
var db = new Datastore({ filename: '/home/atubbs/code/CocktailEngine/data/tried_and_true.json', autoload: true });
module.exports = {
  handle : db
};

