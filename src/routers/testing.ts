import {Router, Request, Response} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {postsRepositories} from "../repositories/postsRepository";

export const testingRoute = Router()

testingRoute.delete('/', (req: Request, res:Response) => {
    blogsRepository.deleteAllBlogs()
    postsRepositories.deleteAllPosts()
    res.send(204)
})