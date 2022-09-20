"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const validationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorMessage = {
            errorMessages: []
        };
        errors.array({ onlyFirstError: true }).forEach(item => {
            let error = {
                message: item.msg,
                field: item.param
            };
            errorMessage.errorMessages.push(error);
        });
        res.status(400).json(errorMessage);
        return;
    }
    next();
};
exports.validationMiddleware = validationMiddleware;
