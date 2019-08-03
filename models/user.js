const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'car'
    }]
});

const User = mongoose.model('users', userSchema);
module.exports = User;