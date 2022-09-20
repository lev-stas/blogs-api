"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsPostValidation = void 0;
const express_validator_1 = require("express-validator");
const validationMiddleware_1 = require("./validationMiddleware");
const nameValidator = (0, express_validator_1.body)('name').trim().isString().isLength({ min: 1, max: 15 });
const urlValidator = (0, express_validator_1.body)('youtubeUrl').isURL().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$', 'g');
exports.blogsPostValidation = [
    nameValidator,
    urlValidator,
    validationMiddleware_1.validationMiddleware
];
