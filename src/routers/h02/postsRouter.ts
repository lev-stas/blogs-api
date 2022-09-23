import {Router, Request, Response} from "express";
import {postsRepositories} from "../../repositories/postsRepository";
import {postsChangeValidation} from "../../middlewares/validation";

export const postsRouter = Router()

postsRouter.get('/', (req: Request, res:Response)=>{
    const posts =postsRepositories.getAllPosts()
    res.send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    const currentPost = postsRepositories.getPost(req.params.id)
    if (!currentPost){
        res.send(404)
        return
    }
    res.send(currentPost)
})

postsRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedPost = postsRepositories.deletePost(req.params.id)
    if (!deletedPost){
        res.send(404)
    }
    res.send(204)
})

postsRouter.post('/', postsChangeValidation, (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const newPost = postsRepositories.addPost(title, shortDescription, content, blogId)
    res.status(201).send(newPost)
})

postsRouter.put('/:id', postsChangeValidation, (req: Request, res:Response) => {
    const targetPost = postsRepositories.changePost(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content
    )
    if (!targetPost){
        res.send(404)
        return
    }
    res.send(204)
})
