import {usersDomain} from "./usersDomain";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import {jwtService} from "../utils/jwtService";

export async function checkCreds(login: string, password:string){
    const user = await usersRepository.checkIfUserExists(login)
    if(!user){
        return null
    }
    const hash = await bcrypt.hash(password, user.salt)
    if (hash !== user.passHash){
        return null
    }
    const token = jwtService.generateToken(user.id)
    return{
        accessToken: token
    }
}