import {body, CustomValidator, header} from "express-validator";
import {validationMiddleware} from "./validationMiddleware";
import {posts} from "../repositories/postsRepository";



function stringValidator(field: string, maxLength: number) {
    return body(field).isString().trim().isLength({min: 1, max: maxLength})
}

const isValidBlogId: CustomValidator = (value) => {
    const currentBlog = posts.find(item => item.blogId === value)
    if (!currentBlog) {
        return false
    }
    return true
}

const urlValidator = body('youtubeUrl').isURL().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$', 'g');
const blogIdValidator = body('blogId').isString().custom(isValidBlogId)
const authValidator = header('Authorization').matches('Basic YWRtaW46cXdlcnR5').withMessage('Unauthorized')


export const blogsChangeValidation = [
    stringValidator('name', 15),
    urlValidator,
    authValidator,
    validationMiddleware
]

export const authValidation = [
    authValidator,
    validationMiddleware
]

export const blogsPutValidation = [
    stringValidator('name', 15),
    urlValidator,
    validationMiddleware
]

export const postsChangeValidation = [
    authValidator,
    stringValidator('title', 30),
    stringValidator('shortDescription', 100),
    stringValidator('content', 1000),
    blogIdValidator,
    validationMiddleware
]

