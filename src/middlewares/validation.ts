import {body, CustomValidator} from "express-validator";
import {validationMiddleware} from "./validationMiddleware";
import {blogsRepository} from "../repositories/blogsRepository";
import {usersDomain} from "../domain/usersDomain";
import {usersRepository} from "../repositories/usersRepository";


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

const isValidConfirmationCode: CustomValidator = async (value) => {
    const confirmation = await usersDomain.activateUser(value)
    if (!confirmation){
        throw new Error ('Confirmation is failed')
    }
    return true
}

const isConfirmedUser: CustomValidator = async (value) => {
    const confirmation = await usersRepository.checkUsersConfirmationByEmail(value)
    if (!confirmation){
        throw new Error ('Can not resend message')
    }
    return true
}

const isUserExistsWithMail: CustomValidator = async (value) => {
    const user = await usersRepository.checkUsersConfirmationByEmail(value)
    if (user){
        throw new Error ('User with such email exists')
    }
    return true
}

const isUserExistsWithLogin: CustomValidator = async (value) => {
    const user = await usersRepository.checkIfUserExists(value)
    if (user){
        throw new Error ('User with such email exists')
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
    body('loginOrEmail').isString().trim(),
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
    body('email').custom(isUserExistsWithMail),
    body('login').custom(isUserExistsWithLogin),
    validationMiddleware
]

export const confirmationValidation = [
    body('code').custom(isValidConfirmationCode),
    validationMiddleware
]

export const resendingValidation = [
    emailValidator,
    body('email').custom(isConfirmedUser),
    validationMiddleware
]


