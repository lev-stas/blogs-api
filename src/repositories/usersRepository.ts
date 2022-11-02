import {usersCollection} from "./mongodb";
import {UsersType} from "../types/types";

export const usersRepository = {
    async getUserById (id: string | string [] | undefined){
        const user = await usersCollection.findOne({id: id},{projection:{_id:0, salt:0, passHash:0, createdAt: 0}})
        if (!user){
            return null
        }
        return user
    },
    async checkIfUserExists (login: string){
        const user = await usersCollection.findOne({login: login},{projection:{_id:0, id:1, salt:1, passHash:1}})
        if (!user){
            return null
        }
        return user
    },
    async deleteUser(id: string){
      const result = await  usersCollection.deleteOne({id: id})
      return result.deletedCount > 0
    },
    async addNewUser(newUser:UsersType){
        const result = await usersCollection.insertOne(newUser)
        return result.acknowledged
    },
    async deleteAllUsers(){
        const result = await usersCollection.deleteMany({})
        return result.deletedCount > 0
    }
}