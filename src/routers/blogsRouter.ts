import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {createBlog} from "../domain/blogsDomain";
import { blogsChangeValidation, blogsPutValidation} from "../middlewares/validation";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {queryProcessing} from "../utils/queryProcessing";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {BlogsType} from "../types/types";
export const blogsRouter = Router();



blogsRouter.get ('/', async (req:Request, res:Response) =>{
    const queryParams = queryProcessing(req)
    const blogsList = await blogsQueryRepository.getAllBlogs(queryParams)
    res.send(blogsList)
})

blogsRouter.get('/:id', async (req:Request, res:Response) => {
    const blog = await blogsRepository.getBlogById(req.params.id)
    if (!blog){
        res.send(404)
        return
    }
    res.send(blog)
})

blogsRouter.post('/',authValidatorMiddleware, blogsChangeValidation, async (req: Request, res: Response) => {
    const newBlog : BlogsType | null = await createBlog(req.body.name, req.body.youtubeUrl)
    newBlog ? res.status(201).send(newBlog) : res.status(500).send('Failed to add new blog')
})
blogsRouter.delete('/:id',authValidatorMiddleware, async (req: Request, res:Response) => {
    const deletedBlog = await blogsRepository.deleteBlogById(req.params.id)
    if (!deletedBlog){
        res.send(404)
        return
    }
    res.send(204)
})

blogsRouter.put('/:id',authValidatorMiddleware, blogsChangeValidation, async (req: Request, res: Response) =>{
    const updatedBlog = await blogsRepository.updateBlogById(req.params.id, req.body.name, req.body.youtubeUrl)
    if (!updatedBlog){
        res.send(404)
        return
    }
    res.send(204)
})

