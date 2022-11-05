import {Router, Request, Response} from "express";
import {postsRepositories} from "../repositories/postsRepository";
import {getAllPosts} from "../repositories/postsQueryRepository";
import {commentValidation, postsChangeValidation} from "../middlewares/validation";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {queryProcessing} from "../utils/queryProcessing";
import {createPost} from "../domain/postsDomain";
import {createComment} from "../domain/commentsDomain";
import {usersRepository} from "../repositories/usersRepository";
import {getAllCommentsOfPost} from "../repositories/commentsQueryRepository";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";


export const postsRouter = Router()

postsRouter.get('/', async (req: Request, res:Response)=>{
    const {pageNumber, pageSize, sortBy, sortDirection} = queryProcessing(req)
    const posts = await getAllPosts(pageNumber, pageSize, sortBy, sortDirection)
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

postsRouter.get ('/:id/comments', async (req: Request, res: Response) => {
    const {pageNumber, pageSize, sortBy, sortDirection} = queryProcessing(req)
    const currentPost = await postsRepositories.getPost(req.params.id)
    if (!currentPost){
        res.send(404)
        return
    }
    const comments = await getAllCommentsOfPost(currentPost.id,pageNumber, pageSize, sortBy, sortDirection)
    if(!comments){
        res.send(404)
        return
    }
    res.send(comments)
})

postsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
    const deletedPost = await postsRepositories.deletePost(req.params.id)
    if (!deletedPost){
        res.send(404)
        return
    }
    res.send(204)
})

postsRouter.post('/', basicAuthMiddleware, postsChangeValidation, async (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const newPost = await createPost(blogId, title, shortDescription, content)
    res.status(201).send(newPost)
})

postsRouter.post ('/:id/comments', authValidatorMiddleware, commentValidation, async (req: Request, res: Response) => {
    const currentPost = await postsRepositories.getPost(req.params.id)
    if (!currentPost){
        res.send(404)
        return
    }
    const user = await usersRepository.getUserById(req.headers.userId)
    if (!user) {
        res.send(404)
        console.log(user)
        return
    }
    const newComment = await createComment(
        currentPost.id,
        user.id,
        user.login,
        req.body.content
    )
    res.status(201).send(newComment)


})


postsRouter.put('/:id', basicAuthMiddleware, postsChangeValidation, async (req: Request, res:Response) => {
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
