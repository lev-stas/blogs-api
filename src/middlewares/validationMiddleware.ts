import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let errorMessage : {errorsMessages: { message: string, field: string }[]} = {
            errorsMessages:[]
        }
        errors.array({onlyFirstError: true}).forEach(item => {
            let error:{message:string, field: string} = {
                message: item.msg,
                field: item.param
            }
            errorMessage.errorsMessages.push(error)
        })
        if(errorMessage.errorsMessages.find(item => item.message === 'Unauthorized')) {
            res.send(401)
        } else {
            res.status(400).json(errorMessage)
        }
        return;
    }
    next()
}