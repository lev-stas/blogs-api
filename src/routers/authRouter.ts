import e, {Request, Response, Router} from "express";
import {loginValidation} from "../middlewares/validation";
import {checkCreds} from "../domain/loginDomain";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {usersRepository} from "../repositories/usersRepository";

export const authRouter = Router()

authRouter.post('/login', loginValidation, async (req:Request, res:Response)=>{
    const result = await checkCreds(req.body.login, req.body.password)
    if(!result){
        res.send(401)
        return
    }
    res.send(result)
})

authRouter.get('/me', authValidatorMiddleware, async (req:Request, res:Response)=>{
    const user =  await  usersRepository.getUserById(req.headers.userId)
    res.send({
        email: user?.email,
        login: user?.login,
        userId: user?.id
    })
})