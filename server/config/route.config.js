import passport from "passport";
import JwtPassport from "passport-jwt";

//Database 
import { UserModel } from "../database/users/index";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "MischiefManaged"
};

export default (passport) => {
    passport.use (
    new JwtStrategy(options, async(jwt__payload, done) => {
        try {
            const doesUserExist = UserModel.findById(jwt__payload.user);
            if(!doesUserExist) return done(null, false);
  
            return done(null, doesUserExist);
        } catch (error) {
        throw new Error(error);
        }
    })
  );
};
