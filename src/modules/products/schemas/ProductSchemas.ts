import { celebrate, Joi, Segments } from "celebrate";

// valida os dados do produto para ser criado com os tipos de dados corretos
export const createProductSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().positive().precision(2).required(),
        quantity: Joi.number().integer().positive().required(),
    }),
});

// valida os dados do produto para ser atualizado com os tipos de dados corretos
// E valida se o id do produto digitado em valido
export const UpdateProductSchema = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().positive().precision(2).required(),
        quantity: Joi.number().integer().positive().required(),
    }),
});


export const idParamsValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
});
