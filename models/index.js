var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/to-do-list');


mongoose.Promise = Promise;
module.exports.Todo = require("./todo");