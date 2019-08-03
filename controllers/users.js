const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { JWT_SECRET } = require('../configuration/config');

signToken = user => {
    return JWT.sign({
        iss: 'APIProject',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

const User = require('../models/user');
const Car = require('../models/userCar');

module.exports = {

    index: async(req, res) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    // Register user
    signup: async(req, res) => {
        const { firstName, lastName, email, password } = req.value.body;

        //Check if there is same email used
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email Already Used' });
        }

        //Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        //Get Token for new user
        const token = signToken(newUser);

        //Respond with token
        res.status(200).json({ token });
    },

    //Login user
    signIn: async(req, res, next) => {

    },
    secret: async(req, res, next) => {
        console.log('Lagi Ngetes Passport');
        res.json({ secret: "resource" });
    },
    //Get All User
    getUser: async(req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user);
    },

    replaceUser: async(req, res) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    updateUser: async(req, res) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    deleteUser: async(req, res) => {
        const { userId } = req.params;
        const userDelete = await User.deleteOne({ _id: req.params.userId });
        res.status(200).json(userDelete);
    },

    getUserCar: async(req, res) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },

    newUserCar: async(req, res) => {
        const { userId } = req.params;
        //Create a new car
        const newCar = new Car(req.body);
        //Get the user
        const user = await User.findById(userId);
        //Assign user as a car's seller
        newCar.seller = user;
        //save the car
        await newCar.save();
        //Add car to the user selling array 'Cars'
        user.cars.push(newCar);
        //save the user
        await user.save();
        res.status(201).json(newCar);
    }
}