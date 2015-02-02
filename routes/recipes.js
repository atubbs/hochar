var express = require('express');
var router = express.Router();
var _ = require('lodash');

var db = require('../database');

/* GET home page. */
// /ingredients -> list of all ingredients as an array
// /ingredients?contains=foo -> list of all ingredients matching foo

// /recipes -> all recipes, all data
// /recipes?format=short -> all recipe titles
// /recipes?includes=ingredient1,ingredient2,...,ingredientn -> recipes matching ingredient list (full string match)
router.get('/', function(req, res, next) {
  var filter = req.query.format !== void 0 && req.query.format === 'short' ? {name : 1, _id : 1} : {};
  if (void 0 !== req.query.includes) {
    console.log("ONEONE");
    var ingredients = req.query.includes.split(',');
    // TODO: support multiple ingredients
    db.handle.find({"components.ingredient" : ingredients[0]}, filter, function(err, doc) {
      res.json(_.sortBy(doc, 'name'));
    });
  } else {
    console.log("TWOTWO");
    db.handle.find({}, filter, function(err, doc) {
      res.json(_.sortBy(doc, 'name'));
    });
  }
});

// TODO: should id/name be separate endpoints?

/*router.get('/byname/:name', function(req, res, next) {
  db.handle.findOne({'name' : req.params.name}, function(err, doc) {
    if (doc) {
      res.json(doc);
    } else {
      res.status(404).json({error: "Recipe not found."});
    }
  });
});
*/

// update a post
// TODO: should accept PUT for this instead ... but need to figure out how to get angular's ngRoute to PUT
router.post('/:id', function(req, res) {
  console.log('req.params.id -> ' + req.params.id);
  console.log(req.body);
  db.handle.update({'_id' : req.params.id}, req.body, {}, function(err, numReplaced) {
    console.log(err);
    console.log(numReplaced);
  });
  res.send('Updated a recipe, thanks');
});

router.put('/:id', function(req, res) {
  console.log(req.body);
  res.send('Hey buddy, thanks!');
});

router.get('/:id', function(req, res, next) {
   db.handle.findOne({'_id' : req.params.id}, function(err, doc) {
    if (doc) {
      res.json(doc);
    } else {
      res.status(404).json({error: "Recipe not found."});
    }
  });
});                    
  
  /*if (req.query.contains === void 0) {
    db.handle.find({}, function(err, doc) {
      res.json(doc.length > 0 
        ? _.chain(doc).pluck('components').flatten().pluck('ingredient').uniq()
        : []);
    });
  } else {
    var re = new RegExp(req.query.ingredients);
    */
/*
    db.handle.find(
      {"components.ingredient" : re}, 
      function(err, doc) {
        res.json(doc.length > 0 
          ? _.chain(doc).pluck('components').flatten().pluck('ingredient').filter(function(s) { return s.match(re) }).uniq()
          : []);
      });
      */

module.exports = router;
