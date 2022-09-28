import {body, CustomValidator, header} from "express-validator";
import {validationMiddleware} from "./validationMiddleware";
import {blogsRepository} from "../repositories/blogsRepository";


function stringValidator(field: string, maxLength: number) {
    return body(field).isString().trim().isLength({min: 1, max: maxLength})
}

const isValidBlogId: CustomValidator = async (value) => {
    const currentBlog = blogsRepository.getBlogById(value)
    if (!currentBlog) {
        return false
    }
    return true
}

const urlValidator = body('youtubeUrl').isURL().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$', 'g');
const blogIdValidator = body('blogId').isString().custom(isValidBlogId)


export const blogsChangeValidation = [
    stringValidator('name', 15),
    urlValidator,
    validationMiddleware
]

export const blogsPutValidation = [
    stringValidator('name', 15),
    urlValidator,
    validationMiddleware
]

export const postsChangeValidation = [
    stringValidator('title', 30),
    stringValidator('shortDescription', 100),
    stringValidator('content', 1000),
    blogIdValidator,
    validationMiddleware
]

