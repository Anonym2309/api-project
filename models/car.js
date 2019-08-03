const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    date: { type: Date, default: Date.now },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});


const Car = mongoose.model('car', carSchema);
module.exports = Car;