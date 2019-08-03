const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration/config');

const User = require('./models/user');

//Json web token Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try {
        //Find user specified in token
        const user = await User.findById(payload.sub);
        //If user doesn't exist, handle it
        if (!user) {
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//Local Strategy
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async(email, password, done) => {
        //Find user given email
        const user = await User.findOne({ email });
        //If not, handle it
        if (!user) {
            return done(null, false);
        }
        //Check Password
        const userPassword = await User.password({ password });
        if (!password) {
            return done(null, false);
        }
    }));