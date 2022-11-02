import {Router, Request, Response} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {postsRepositories} from "../repositories/postsRepository";
import {usersRepository} from "../repositories/usersRepository";
import {commentsRepository} from "../repositories/commentsRepository";

export const testingRoute = Router()

testingRoute.delete('/', (req: Request, res:Response) => {
    blogsRepository.deleteAllBlogs()
    postsRepositories.deleteAllPosts()
    usersRepository.deleteAllUsers()
    commentsRepository.deleteAllComments()
    res.send(204)
})