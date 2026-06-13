import { celebrate, Joi, Segments } from "celebrate";

export const idParams = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
});

export const createOrderValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        customer_id: Joi.string().required(),
        products: Joi.required(),
    })
})

