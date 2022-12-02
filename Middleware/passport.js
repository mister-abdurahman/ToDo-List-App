// This code is to authenticate certain routes like the delete route

const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config()

// Creating the Strategy which this authentication is built on
passport.use("jwt",
    new JWTstrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async (payload, done) => {
            try {
                return done(null, payload.user);//passort sets the user property on the req.|| req.user = payload.user
            } catch (error) {
                done(error);
            }
        }
    )
);

