import {Request, Response, Router} from "express";
import {
    confirmationValidation,
    loginValidation,
    registrationValidation,
    resendingValidation
} from "../middlewares/validation";
import {checkCreds} from "../domain/loginDomain";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {usersRepository} from "../repositories/usersRepository";
import {usersDomain} from "../domain/usersDomain";

export const authRouter = Router({strict: true})

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
    console.log(user!.email)
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
    res.status(204).send('Confirmation code is resent. Please, check you email')
})

authRouter.post ('/registration-confirmation', confirmationValidation, async (req: Request, res: Response) => {
    res.status(204).send('Your account has been confirmed')
})

authRouter.post ('/registration-email-resending', resendingValidation, async (req: Request, res: Response) => {
    const resentMessage = usersDomain.resendUserConfirmationCode(req.body.email)
    if (!resentMessage){
        res.sendStatus(503)
    }
    res.status(204).send('Confirmation code is resent. Please, check you email')
})