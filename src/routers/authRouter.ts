import e, {Request, Response, Router} from "express";
import {loginValidation, registrationValidation} from "../middlewares/validation";
import {checkCreds} from "../domain/loginDomain";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import {usersRepository} from "../repositories/usersRepository";
import {body} from "express-validator";
import {usersDomain} from "../domain/usersDomain";
import {sendEmail} from "../utils/emailSender";


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
        res.send(404)
        return
    }
    const usersConfirmationInfo = await usersRepository.getUsersEmailConfirmationInfo(user.id)
    if (!usersConfirmationInfo){
        res.send(404)
        return
    }
    const sentMessage = await sendEmail(
        user.email,
        'Registration Confirmation',
        `<h1>To confirm registration, please, press the link below </h1>
               <a href='https://https://incubator-blogs-api.herokuapp.com/auth/registration-confirmation?${usersConfirmationInfo?.emailConfirmation.confirmationCode}'>Confirm registration</a>`
        )
    if (!sentMessage){
        res.status(503).send("Oops, we couldn't sent you email. Please, try to register later" )
    }
    res.send(204)
})