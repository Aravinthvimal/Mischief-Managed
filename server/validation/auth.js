import joi, { preferences } from "joi";

export const ValidateSignup = (userData) => {
    
    const Schema = joi.object ({
        fullname : joi.string()
        .required()
        .min(3)
        .max(20),

        email : joi.string()
        .required()
        .email(),

        password : joi.string()
        .required()
        .min(8),
        
        mobile : joi.number()
        .required(),

        preferences : joi.object()
        .required()

    });

    return Schema.validateAsync(userData);

};

export const ValidateSignin = (userData) => {
        
    const Schema = joi.object({
        email: joi.string()
        .required()
        .email(),

        password: joi.string()
        .required()
    });

    return Schema.validateAsync(userData);
};
