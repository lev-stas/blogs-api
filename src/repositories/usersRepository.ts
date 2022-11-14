import {usersCollection} from "./mongodb";
import {UsersType} from "../types/types";

export const usersRepository = {
    async getUserById (id: string | string [] | undefined){
        const user = await usersCollection.findOne({id: id},{projection:{
                _id:0,
                id:1,
                login: 1,
                email: 1,
                createdAt: 1
                // salt:0,
                // passHash:0,
                // isConfirmed: 0,
                // emailConfirmation:0
            }})
        if (!user){
            return null
        }
        return user
    },
    async getUsersEmailConfirmationInfo (id: string){
        const confirmationInfo = await usersCollection.findOne({id: id}, {
            projection:{
                _id:0,
                email: 1,
                emailConfirmation:1
            }
        })
        return confirmationInfo
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
    },

    async getUserByConfirmationCode (confirmationCode: string){
        const user = await usersCollection.findOne({"emailConfirmation.confirmationCode": confirmationCode},{
                projection: {
                    _id: 0,
                    id: 1,
                    isConfirmed: 1,
                    emailConfirmation: 1
                }
            })
        if (!user){
            return null
        }
        return user
    },

    async checkUsersConfirmationByEmail(email: string){
        const user  = await usersCollection.findOne(
            {email: email},
            {projection:{
                _id: 0,
                    id: 1,
                    isConfirmed: 1,
                }}
            )
        if (!user || user.isConfirmed){
            return null
        }
        return true
    },

    async activateUser (id: string){
        const result = await usersCollection.updateOne({id: id}, {$set:{isConfirmed: true}})
        return result.matchedCount === 1
    },

    async updateExpCode (email: string, code: string, date: Date){
        const result = await usersCollection.updateOne({email: email}, {
            $set: {
                'emailConfirmation.confirmationCode': code,
                'emailConfirmation.expirationDate': date
            }
        })
        if (!result){
            return null
        }
        return result.matchedCount === 1
    }
}