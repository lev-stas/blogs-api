import {NextFunction, Request, Response} from "express";
import {jwtService} from "../utils/jwtService";
import {usersDomain} from "../domain/usersDomain";
import {usersRepository} from "../repositories/usersRepository";

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

export const refreshTokenValidatorMiddleware = async (req: Request, res:Response, next: NextFunction) => {
    if (!req.cookies.refreshToken){
        res.send(401)
        return
    }
    const token = req.cookies.refreshToken
    const result = jwtService.verifyToken(token)
    if (!result){
        res.send(401)
        return
    }
    const isValidResult = await usersRepository.checkRefreshToken(token)
    if(!isValidResult){
        res.send(401)
        return
    }
    req.headers.userId = result
    next()
}
