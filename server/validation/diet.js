import joi from "joi";

export const ValidateDietPlanId = (dietPlanId) => {

    const Schema = joi.object({
        _id: joi.string()
        .required()
    });

    return Schema.ValidateDietPlanId(dietPlanId);
};

export const ValidateDietPlanFoods = (dietPlanFoods) => {

    const Schema = joi.object({
        foods : joi.array().items(joi.string())
        .required()
    }); 

    return Schema.ValidateDietPlanFoods(dietPlanFoods);
};