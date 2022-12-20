import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";

const jwtSecret = process.env.JWT_SECRET || '123Password'
export const jwtService = {
    generateToken(userId: string | string [] | undefined, expTerm: string){
        const token = jwt.sign({userId: userId}, jwtSecret, {expiresIn: expTerm})
        return token
    },
    verifyToken(token:string){
        // const rawResult = jwt.verify(token, jwtSecret)
        // console.log(rawResult)
        try{
            const result:any = jwt.verify(token, jwtSecret)
            console.log(result)
            return result.userId
        } catch (error){
            return null
        }
    }
}
