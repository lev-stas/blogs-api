import {idGenerator} from "../utils/utils"
import  bcrypt from 'bcrypt'
import {usersRepository} from "../repositories/usersRepository";

export const usersDomain = {
    async createUser (login:string, password:string, email:string){
        const salt = await bcrypt.genSalt(10)
        const hash = await this._generateHash(password, salt)
        console.log("Salt is "+ salt)
        console.log ('Satl type is '+ typeof(salt))
        const newUser = {
            id: idGenerator(),
            login: login,
            email: email,
            salt: salt,
            passHash: hash,
            createdAt: new Date().toISOString()
        }
        const result = await usersRepository.addNewUser(newUser)
        if (!result){
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
    }
}