import {usersCollection} from "./mongodb";
import {ResponseType} from "../types/types";

export async function getUsers(
    searchLoginTerm: string,
    searchEmailTerm: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 1 | -1
):Promise<ResponseType | null>{
    const totalCount = await usersCollection.countDocuments({$or:[
            {login: {$regex: searchLoginTerm, $options: 'i'}},
            {email: {$regex: searchEmailTerm, $options: 'i'}}
        ]})
    const skipNumber = pageNumber < 2 ? 0 : (pageNumber - 1) * pageSize
    const users = await usersCollection.find(
        {$or:[
                {login: {$regex: searchLoginTerm, $options: 'i'}},
                {email: {$regex: searchEmailTerm, $options: 'i'}}
            ]},
        {projection: {_id: 0, passHash:0}}
    )
        .sort({[sortBy]: sortDirection})
        .skip(skipNumber)
        .limit(pageSize)
        .toArray()
    if(!users){
        return null
    }
    return {
        pagesCount: Math.ceil(totalCount / pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: totalCount,
        items: users
    }
}