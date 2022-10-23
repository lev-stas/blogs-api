import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import {createBlog} from "../domain/blogsDomain";
import {blogsChangeValidation, postsInBlogsValidation} from "../middlewares/validation";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {queryProcessing} from "../utils/queryProcessing";
import {blogsQueryRepository} from "../repositories/blogsQueryRepository";
import {BlogsType} from "../types/types";
import {getPostsOfCurrentBlog} from "../repositories/postsQueryRepository";
import {createPost} from "../domain/postsDomain";
export const blogsRouter = Router();



blogsRouter.get ('/', async (req:Request, res:Response) =>{
    const {searchNameTerm, pageNumber, pageSize, sortBy, sortDirection} = queryProcessing(req)
    const blogsList = await blogsQueryRepository.getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
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

blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const {pageNumber, pageSize, sortBy, sortDirection} = queryProcessing(req)
    const posts = await getPostsOfCurrentBlog(pageNumber, pageSize, sortBy, sortDirection, req.params.id)
    posts ? res.send(posts) : res.send(404)
})

blogsRouter.post('/',authValidatorMiddleware, blogsChangeValidation, async (req: Request, res: Response) => {
    const newBlog : BlogsType | null = await createBlog(req.body.name, req.body.youtubeUrl)
    newBlog ? res.status(201).send(newBlog) : res.status(500).send('Failed to add new blog')
})

blogsRouter.post('/:id/posts', authValidatorMiddleware, postsInBlogsValidation, async (req: Request, res: Response) =>{
    const newPost = await createPost(req.params.id, req.body.title, req.body.shortDescription, req.body.content)
    if(!newPost){
        res.send(404)
        return
    }
    res.status(201).send(newPost)
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

