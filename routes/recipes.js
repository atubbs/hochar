var express = require('express');
var router = express.Router();
var _ = require('lodash');
var db = require('../database');

// /recipes -> all recipes, all data
// /recipes?format=short -> all recipe titles
// /recipes?includes=ingredient1,ingredient2,...,ingredientn -> recipes matching ingredient list (full string match)
// /recipes?substr=foo
// list/search recipes by ingredient
// TODO: search by name
router.get('/', function(req, res, next) {
  var filter = req.query.format !== void 0 && req.query.format === 'short' ? {name : 1, _id : 1} : {};
  if (void 0 !== req.query.includes) {
    var ingredients = req.query.includes.split(',');
    // TODO: support multiple ingredients
    db.handle.find({"components.ingredient" : ingredients[0]}, filter, function(err, doc) {
      res.json(_.sortBy(doc, 'name'));
    });
  } else if (void 0 !== req.query.substr) {
    db.handle.find({"name" : new RegExp(req.query.substr, 'i')}, filter, function(err, doc) {
      res.json(_.sortBy(doc, 'name'));
    });
  } else {
    db.handle.find({}, filter, function(err, doc) {
      res.json(_.sortBy(doc, 'name'));
    });
  }
});

// delete a recipe, given an ID
router.delete('/:id', function(req, res, next) {
  db.handle.remove({ '_id' : req.params.id}, function(err, numRemoved) {
    if (numRemoved) res.send("ID " + req.params.id + " successfully removed.");
    else res.status(404).json({error: "Recipe not found. Error: " + err});
  });
});

// create a new recipe, generate ID
router.post('/', function(req, res) {
  db.handle.insert(req.body, function(err, newDoc) {
    res.json({ 'id' : newDoc._id });
  });
});

// update a recipe, given an ID
// TODO: if ID doesn't exist
router.put('/:id', function(req, res) {
  db.handle.update({'_id' : req.params.id}, req.body, {}, function(err, numReplaced) {
  });
  res.json({ 'id' : req.params.id });
});

// get a recipe by ID
router.get('/:id', function(req, res, next) {
   db.handle.findOne({'_id' : req.params.id}, function(err, doc) {
    if (doc) {
      res.json(doc);
    } else {
      res.status(404).json({error: "Recipe not found."});
    }
  });
});                    

module.exports = router;
