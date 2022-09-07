import joi from "joi";

export const ValidateUserId = (UserId) => {
    
    const Schema = joi.object({

        _id: joi.string()
        .required()
    });

    return Schema.validateAsync(UserId);
};

export const ValidateSearchString = (searchString) => {

    const Schema = joi.object({

        searchString : joi.string()
        .required()

    });

    return Schema.validateAsync(searchString);

};

