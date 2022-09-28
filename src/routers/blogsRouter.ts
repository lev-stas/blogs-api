import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogsRepository";
import { blogsChangeValidation, blogsPutValidation} from "../middlewares/validation";
import {BlogsType} from "../repositories/blogsRepository";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
export const blogsRouter = Router();



blogsRouter.get ('/', async (req:Request, res:Response) =>{
    const blogsList:BlogsType[] = await blogsRepository.getBlogList()
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
    const newBlog = await blogsRepository.addBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
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

