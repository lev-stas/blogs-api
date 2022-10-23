import {usersDomain} from "./usersDomain";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";

export async function checkCreds(login: string, password:string){
    const user = await usersRepository.checkIfUserExists(login)
    if(!user){
        return null
    }
    const hash = await bcrypt.hash(password, user.salt)
    return hash === user.passHash
}