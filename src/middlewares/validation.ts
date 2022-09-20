import {body} from "express-validator";
import {validationMiddleware} from "./validationMiddleware";

const nameValidator = body('name').trim().isString().isLength({min: 1, max: 15})
const urlValidator = body('youtubeUrl').isURL().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$', 'g')


export const blogsPostValidation = [
    nameValidator,
    urlValidator,
    validationMiddleware
]