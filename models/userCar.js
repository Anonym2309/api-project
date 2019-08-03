const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carsSchema = new Schema({
    make: String,
    model: String,
    year: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Cars = mongoose.model('cars', carsSchema);

module.exports = Cars;