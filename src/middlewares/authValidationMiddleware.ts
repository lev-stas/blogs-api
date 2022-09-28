import {header, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const authValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const creds:string | undefined = req.header('Authorization')
    if (creds !== 'Basic YWRtaW46cXdlcnR5'){
        res.send(403)
        return
    }
    next()
}
