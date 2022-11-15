import {idGenerator} from "../utils/utils"
import  bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/usersRepository";
import { v4 as uuidv4 } from 'uuid';
import add from 'date-fns/add'
import {sendEmail} from "../utils/emailSender";


export const usersDomain = {
    async createUser (login:string, password:string, email:string){
        const salt = await bcrypt.genSalt(10)
        const hash = await this._generateHash(password, salt)
        const newUser = {
            id: idGenerator(),
            login: login,
            email: email,
            salt: salt,
            passHash: hash,
            createdAt: new Date().toISOString(),
            isConfirmed: false,
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    minutes:5
                })
            }
        }
        const result = await usersRepository.addNewUser(newUser)
        if (!result){
            return null
        }
        const usersConfirmationInfo = await usersRepository.getUsersEmailConfirmationInfo(newUser.id)
        if (!usersConfirmationInfo){
            return null
        }
        const sentMessage = await sendEmail(
            newUser.email,
            ' Repeat Registration Confirmation',
            `<h1>To confirm registration, please, press the link below </h1>
               <a href='https://https://incubator-blogs-api.herokuapp.com/auth/registration-confirmation?code=${usersConfirmationInfo?.emailConfirmation.confirmationCode}'>Confirm registration</a>`
        )
        if (!sentMessage){
            return null
        }
        const user = await usersRepository.getUserById(newUser.id)
        return user
    },
    async _generateHash (password: string, salt: any) {
        const hash = await bcrypt.hash(password, salt)
        console.log("hash is "+hash)
        console.log('Type of hash is ' + typeof(hash))
        return hash
    },

    async activateUser (confirmationCode: string){
        const user = await usersRepository.getUserByConfirmationCode(confirmationCode)
        if (!user){
            return null
        }
        if (user.isConfirmed || new Date() > user.emailConfirmation.expirationDate){
            return null
        }
        const activation = await usersRepository.activateUser(user.id)
        if(!activation){
            return null
        }
        return true
    },
    async resendUserConfirmationCode (email: string){
        const newCode = uuidv4()
        const newExpirationDate = add(new Date(),{minutes: 5})
        const updateResult = await usersRepository.updateExpCode(email, newCode, newExpirationDate)
        if (!updateResult){
            return null
        }
        const sentMessage = await sendEmail(
            email,
            'Registration Confirmation',
            `<a href='https://https://incubator-blogs-api.herokuapp.com/auth/registration-confirmation?code=${newCode}'>Confirm registration</a>`
        )
        if (!sentMessage){
            return null
        }
        return sentMessage
    },

}