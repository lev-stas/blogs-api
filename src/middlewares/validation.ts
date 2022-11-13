import {body, CustomValidator, param} from "express-validator";
import {validationMiddleware} from "./validationMiddleware";
import {blogsRepository, BlogsType} from "../repositories/blogsRepository";


function stringValidator(field: string,minLength:number, maxLength: number) {
    return body(field).isString().trim().isLength({min: minLength, max: maxLength})
}

const isValidBlogId: CustomValidator = async (value) => {
    const currentBlog = await blogsRepository.getBlogById(value)
    if (!currentBlog) {
        throw new Error ('blog is not found')
    }
    return true
}

const urlValidator = body('youtubeUrl').isURL().matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$', 'g');
const blogIdValidator = body('blogId').isString().custom(isValidBlogId)
const emailValidator = body('email').isEmail().trim()


export const blogsChangeValidation = [
    stringValidator('name',  1,15),
    urlValidator,
    validationMiddleware
]

export const blogsPutValidation = [
    stringValidator('name', 1,15),
    urlValidator,
    validationMiddleware
]

export const postsChangeValidation = [
    stringValidator('title', 1,30),
    stringValidator('shortDescription', 1,100),
    stringValidator('content', 1,1000),
    blogIdValidator,
    validationMiddleware
]

export const postsInBlogsValidation = [
    stringValidator('title', 1,30),
    stringValidator('shortDescription', 1,100),
    stringValidator('content', 1,1000),
    validationMiddleware
]

export const postUserValidation = [
    stringValidator('login', 3,10),
    stringValidator('password', 6,20),
    emailValidator,
    validationMiddleware
]

export const loginValidation = [
    body('login').isString().trim(),
    body('password').isString().trim(),
    validationMiddleware
]

export const commentValidation = [
    stringValidator('content', 20, 300),
    validationMiddleware
]

export const registrationValidation = [
    stringValidator('login', 3, 10),
    stringValidator('password', 6, 20),
    emailValidator,
    validationMiddleware
]


