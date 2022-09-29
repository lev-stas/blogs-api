import {Router, Request, Response} from "express";
import {postsRepositories} from "../repositories/postsRepository";
import {postsChangeValidation} from "../middlewares/validation";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";

export const postsRouter = Router()

postsRouter.get('/', async (req: Request, res:Response)=>{
    const posts = await postsRepositories.getAllPosts()
    res.send(posts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const currentPost = await postsRepositories.getPost(req.params.id)
    if (!currentPost){
        res.send(404)
        return
    }
    res.send(currentPost)
})

postsRouter.delete('/:id', authValidatorMiddleware, async (req: Request, res: Response) => {
    const deletedPost = await postsRepositories.deletePost(req.params.id)
    if (!deletedPost){
        res.send(404)
        return
    }
    res.send(204)
})

postsRouter.post('/', authValidatorMiddleware, postsChangeValidation, async (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const newPost = await postsRepositories.addPost(title, shortDescription, content, blogId)
    res.status(201).send(newPost)
})

postsRouter.put('/:id', authValidatorMiddleware, postsChangeValidation, async (req: Request, res:Response) => {
    const targetPost = await postsRepositories.changePost(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
    )
    if (!targetPost){
        res.send(404)
        return
    }
    res.send(204)
})
