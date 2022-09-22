import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let errorMessage : {errorMessages: { message: string, field: string }[]} = {
            errorMessages:[]
        }
        errors.array({onlyFirstError: true}).forEach(item => {
            let error:{message:string, field: string} = {
                message: item.msg,
                field: item.param
            }
            errorMessage.errorMessages.push(error)
        })
        if(errorMessage.errorMessages.find(item => item.message === 'Unauthorized')) {
            res.send(401)
        } else {
            res.status(400).json(errorMessage)
        }
        return;
    }
    next()
}