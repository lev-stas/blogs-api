import {Request, Response, Router} from "express";
import {usersDomain} from "../domain/usersDomain";
import {authValidatorMiddleware} from "../middlewares/authValidationMiddleware";
import { postUserValidation} from "../middlewares/validation";
import {getUsers} from "../repositories/usersQueryRepository";
import {queryProcessing} from "../utils/queryProcessing";
import {usersRepository} from "../repositories/usersRepository";

export const usersRouter = Router()

usersRouter.get('/', async (req:Request, res:Response) =>{
    const {
        searchLoginTerm,
        searchEmailTerm,
        pageNumber,
        pageSize,
        sortBy,
        sortDirection
    } = queryProcessing(req)
    const users = await getUsers(
        searchLoginTerm,
        searchEmailTerm,
        pageNumber,
        pageSize,
        sortBy,
        sortDirection
    )
    if(!users){
        res.send(404)
        return
    }
    res.send(users)
})

usersRouter.post('/', authValidatorMiddleware, postUserValidation, async (req:Request, res: Response) => {
    const user = await usersDomain.createUser(req.body.login, req.body.password, req.body.email)
    if(!user){
        res.send(404)
    }
    res.status(201).send(user)
})

usersRouter.delete('/:id', authValidatorMiddleware, async (req: Request, res: Response)=>{
    const result = await usersRepository.deleteUser(req.params.id)
    if(!result){
        res.send(404)
        return
    }
    res.send(204)
})