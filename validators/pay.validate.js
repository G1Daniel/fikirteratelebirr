const Joi = require('joi');

exports.payValidate = schemaName => async (req, res, next) => {
    let validationObjects = {

        pay: () =>
            Joi.object({
                subject: Joi.string()
                    .min(5)
                    .max(256)
                    .required(),
                amount: Joi.number()
                    .min(0.01)
                    .max(100000000).required(),
                tradeNo: Joi.string()

                    .required(),
                nonce: Joi.string()

                    .required(),
            })
    }
    try {
        const {
            error
        } = validationObjects[schemaName]().validate(req.body)
        if (!error) {
            return next();
        }
        throw new Error(error)
    } catch (error) {
        res.render('index', {
            title: 'Payment pay',
            error: true,
            msg: error.message
        });
    }

}