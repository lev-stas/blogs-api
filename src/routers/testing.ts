import {Router, Request, Response} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {postsRepositories} from "../repositories/postsRepository";
import {usersRepository} from "../repositories/usersRepository";

export const testingRoute = Router()

testingRoute.delete('/', (req: Request, res:Response) => {
    blogsRepository.deleteAllBlogs()
    postsRepositories.deleteAllPosts()
    usersRepository.deleteAllUsers()
    res.send(204)
})