const express = require('express');

const router = require('express-promise-router')();

const CarController = require('../controllers/cars');

router.route('/')
    .get(CarController.indexCar)
    .post(CarController.newCars);

router.route('/:carId/userCar')
    .get(CarController.userCar);


module.exports = router;