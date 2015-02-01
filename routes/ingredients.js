var express = require('express');
var router = express.Router();
var _ = require('lodash');

var db = require('../database');

/* GET home page. */
// /ingredients -> list of all ingredients as an array
// /ingredients?substr=foo -> list of all ingredients matching foo
router.get('/', function(req, res, next) {
  if (req.query.substr === void 0) {
    db.handle.find({}, function(err, doc) {
      res.json(doc.length > 0 
        ? _.chain(doc).pluck('components').flatten().pluck('ingredient').sort().uniq()
        : []);
    });
  } else {
    var re = new RegExp(req.query.substr);
    db.handle.find(
      {"components.ingredient" : re}, 
      function(err, doc) {
        res.json(doc.length > 0 
          ? _.chain(doc).pluck('components').flatten().pluck('ingredient').filter(function(s) { return s.match(re) }).uniq()
          : []);
      });
  }
});

module.exports = router;
