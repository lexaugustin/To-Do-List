var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'The text field cannot be blankl'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;