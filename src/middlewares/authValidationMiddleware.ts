import {NextFunction, Request, Response} from "express";
import {jwtService} from "../utils/jwtService";

export const authValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        res.send(401)
        return;
    }
    const token: string = req.headers.authorization?.split(' ')[1]
    const result = jwtService.verifyToken(token!)
    if (!result){
        res.send(401)
        return
    }
    req.headers.userId = result
    next()
}
