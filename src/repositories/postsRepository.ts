import {idGenerator} from "../utils/utils";
import {postsCollection} from "./mongodb";
import {blogsRepository} from "./blogsRepository";

export type PostsType={
    id:string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export const postsRepositories = {
    async getAllPosts (): Promise<PostsType[]>{
        return await postsCollection.find({}, {projection:{_id: 0}}).toArray()
    },
    async getPost(id:string):Promise<PostsType | null>{
        const post: PostsType | null = await postsCollection.findOne({id: id}, {projection:{_id: 0}})
        if (!post){
            return null
        }
        return post
    },
    async deletePost(id:string): Promise<boolean>{
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async addPost(
        newPost:PostsType
    ): Promise<boolean>{
        const result = await postsCollection.insertOne(newPost)
        return result.acknowledged
    },
    async changePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string
    ):Promise<boolean>{
        const result = await postsCollection.updateOne({id:id},{
            $set: {
                title:title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId
            }
    })
      return result.matchedCount === 1
    },
    async deleteAllPosts():Promise<boolean>{
        const result = await postsCollection.deleteMany({})
        return result.deletedCount > 0
    }
}