import e, {Request, Response, Router} from "express";
import {loginValidation} from "../middlewares/validation";
import {checkCreds} from "../domain/loginDomain";

export const loginRouter = Router()

loginRouter.post('/', loginValidation, async (req:Request, res:Response)=>{
    const result = await checkCreds(req.body.login, req.body.password)
    if(!result){
        res.send(401)
        return
    }
    res.send(204)
})