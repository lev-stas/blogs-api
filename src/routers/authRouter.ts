import {Request, Response, Router} from "express";
import {
    confirmationValidation,
    loginValidation,
    registrationValidation,
    resendingValidation
} from "../middlewares/validation";
import {checkCreds, renewRefreshToken} from "../domain/loginDomain";
import {authValidatorMiddleware, refreshTokenValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {usersRepository} from "../repositories/usersRepository";
import {usersDomain} from "../domain/usersDomain";

export const authRouter = Router({strict: true})

authRouter.post('/login', loginValidation, async (req:Request, res:Response)=>{
    const result = await checkCreds(req.body.loginOrEmail, req.body.password)
    if(!result){
        res.send(401)
        return
    }
    const refreshToken = {
        refreshToken: result.refreshToken
    }
    res.cookie('refreshToken', result.refreshToken,{
        httpOnly: true
    })
    res.send({accessToken: result.accessToken})
})

authRouter.get('/me', authValidatorMiddleware, async (req:Request, res:Response)=>{
    const user =  await  usersRepository.getUserById(req.headers.userId)
    res.send({
        email: user!.email,
        login: user!.login,
        userId: user!.id
    })
})

authRouter.post('/registration', registrationValidation, async (req: Request, res: Response) => {
    const user = await usersDomain.createUser(req.body.login, req.body.password, req.body.email)
    if (!user){
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})

authRouter.post ('/registration-confirmation', confirmationValidation, async (req: Request, res: Response) => {
    res.sendStatus(204)
})

authRouter.post ('/registration-email-resending', resendingValidation, async (req: Request, res: Response) => {
    const resentMessage = usersDomain.resendUserConfirmationCode(req.body.email)
    if (!resentMessage){
        res.sendStatus(503)
    }
    res.sendStatus(204)
})

authRouter.post ('/refresh-token',refreshTokenValidatorMiddleware, async (req: Request, res: Response) => {
    const tokens =  await  renewRefreshToken (req.headers.userId)
    if (!tokens){
        res.sendStatus(503)
    }
    res.cookie('refreshToken', tokens?.refreshToken, {
        httpOnly: true
    })
    res.send({accessToken: tokens?.accessToken})
})

authRouter.post ('/logout', refreshTokenValidatorMiddleware, async (req: Request, res: Response) => {
    const result = await usersRepository.disableRefreshToken(req.cookies.refreshToken)
    if (!result){
        res.sendStatus(503)
    }
    res.sendStatus(204)
})