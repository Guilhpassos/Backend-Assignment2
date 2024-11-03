const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: String,
    email: String,
    password: String,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('user', UserSchema);