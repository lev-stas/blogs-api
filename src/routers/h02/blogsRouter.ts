import {Request, Response, Router} from "express";
import {blogsRepository} from "../../repositories/blogsRepository";
import {body} from "express-validator";
import {blogsPostValidation} from "../../middlewares/validation";

export const blogsRouter = Router();


blogsRouter.get('/', (req:Request, res:Response) =>{
    const blogsList:{ id: string, name: string, youtubeUrl: string }[] = blogsRepository.getBlogList()
    res.send(blogsList)
})

blogsRouter.get('/:id', (req:Request, res:Response) => {
    const blog = blogsRepository.getBlogById(req.params.id)
    if (!blog){
        res.send(404)
        return
    }
    res.send(blog)
})

blogsRouter.post('/', blogsPostValidation, (req: Request, res: Response) => {
    const newBlog = blogsRepository.addBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})
blogsRouter.delete('/:id', (req: Request, res:Response) => {
    const deletedBlog = blogsRepository.deleteBlogById(req.params.id)
    if (!deletedBlog){
        res.send(404)
        return
    }
    res.send(204)
})

