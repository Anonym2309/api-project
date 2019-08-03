const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routesHelpers');
const UserController = require('../controllers/users');

router.route('/')
    .get(UserController.index);

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signup);

router.route('/signin')
    .post(UserController.signIn);

router.route('/:userId')
    .get(UserController.getUser)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser);

router.route('/:userId/cars')
    .get(UserController.getUserCar)
    .post(UserController.newUserCar);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UserController.secret);

module.exports = router;