import {usersDomain} from "./usersDomain";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import {jwtService} from "../utils/jwtService";
import {usersCollection} from "../repositories/mongodb";

export async function checkCreds(login: string, password:string){
    const user = await usersRepository.checkIfUserExists(login)
    if(!user){
        return null
    }
    const hash = await bcrypt.hash(password, user.salt)
    if (hash !== user.passHash){
        return null
    }
    const accessToken = jwtService.generateToken(user.id, '10s')
    const refreshToken = jwtService.generateToken(user.id, '20s')
    const settingTokenResult = await usersRepository.setRefreshToken(user.id, refreshToken)
    if (!settingTokenResult){
        return null
    }
    return{
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export async function renewRefreshToken (userId:string | string[] | undefined) {
    const accessToken = jwtService.generateToken(userId, '10s')
    const refreshToken = jwtService.generateToken(userId, '20s')
    const settingTokenResult = await usersRepository.setRefreshToken(userId, refreshToken)
    if (!settingTokenResult){
        return null
    }
    return{
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}


