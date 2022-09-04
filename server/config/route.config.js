import passport from "passport";
import JwtPassport from "passport-jwt";

//Database 
import {UserModel} from "../database/users";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "MischiefManagedSecret"
};

export default (passport) => {
    passport.use (
    new JwtStrategy(options, async(jwt__payload, done) => {
        try {
            console.log(jwt__payload.user);
            const doesUserExist = UserModel.findById(jwt__payload.user);
            console.log(doesUserExist);
            if(!doesUserExist) return done(null, false);
  
            return done(null, doesUserExist);
        } catch (error) {
        throw new Error(error);
        }
    })
  );
};
