import {Request, Response, Router} from "express";
import {commentsRepository} from "../repositories/commentsRepository";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {commentValidation} from "../middlewares/validation";

export const commentsRouter = Router()

commentsRouter.get('/:id', async (req: Request, res: Response) => {
    const comment = await commentsRepository.getCommentById(req.params.id)
    if (!comment){
        res.send(404)
    }
    res.send(comment)
})

commentsRouter.delete('/:id', authValidatorMiddleware, async (req:Request, res: Response)=>{
    const comment = await commentsRepository.getCommentById(req.params.id)
    if (!comment){
        res.send(404)
        return
    }
    if (comment.userId !== req.headers.userId){
        res.send(403)
        return
    }
    await commentsRepository.deleteCommentById(req.params.id)
    res.send(204)

})

commentsRouter.put(
    '/:id',
    authValidatorMiddleware,
    commentValidation,
    async (req: Request, res: Response) => {
        const comment = await commentsRepository.getCommentById(req.params.id)
        if (!comment){
            res.send(404)
            return
        }
        if(comment?.userId !== req.headers.userId){
            res.send(403)
            return
        }
        const result = await commentsRepository.changeCommnetById(req.params.id, req.body.content)
        if (!result){
            res.send(404)
            return
        }
        res.send(204)
    })

