const Car = require('../models/car');
const UserCar = require('../models/userCar');

module.exports = {

    indexCar: async(req, res) => {
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCars: async(req, res) => {
        const newCars = new Car(req.body);
        const car = await newCars.save();
        res.status(200).json(car);
    },
    userCarById: async(req, res) => {
        const userCars = User.Car.find({});
        res.status(200).json(userCars);
    },

    userCar: async(req, res, next) => {
        const { carId } = req.params;
        const car = await Car.findById(carId).populate('users');
        res.status(200).json(car.users);
    }
};