const joi = require('joi');

module.exports = joi.object({
    nameTask: joi.string().required().max(50),
    description: joi.string().required().max(300),
    deadline: joi.date().required().greater('now'),
    priority: joi.number().required(),
    solved: joi.boolean().default(false),
    responsible: joi.string().required().max(100),
})
