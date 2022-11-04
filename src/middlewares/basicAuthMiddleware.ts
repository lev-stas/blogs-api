import {NextFunction, Request, Response} from "express";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const creds:string | undefined = req.header('Authorization')
    if (creds !== 'Basic YWRtaW46cXdlcnR5'){
        res.send(401)
        return
    }
    next()
}