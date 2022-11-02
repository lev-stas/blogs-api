import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";

const jwtSecret = process.env.JWT_SECRET || '123Password'
export const jwtService = {
    generateToken(userId: string){
        const token = jwt.sign({userId: userId}, jwtSecret, {expiresIn: '1y'})
        return token
    },
    verifyToken(token:string){
        try{
            const result:any = jwt.verify(token, jwtSecret)
            return result.userId
        } catch (error){
            return null
        }
    }
}
