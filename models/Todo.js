const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
    // id: ObjectId,
    title: { type: String, default: 'Todo some thing', index: true },
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);
