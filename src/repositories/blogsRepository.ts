import {idGenerator} from "../utils/utils";
import {blogsCollection, mongoClient} from "./mongodb";

export type BlogsType ={
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string
}


export const blogsRepository = {
    async getBlogList():Promise<BlogsType[]>{
        return await blogsCollection.find({}, {projection:{_id: 0}}).toArray()
    },
    async getBlogById(id:string):Promise<BlogsType | null>{
        let blog: BlogsType | null = await blogsCollection.findOne({id: id}, {projection:{_id: 0}})
        if (!blog){
            return null
        }
        return blog
    },
     async addBlog(name: string, youtubeUrl: string):Promise<BlogsType> {
        const newBlog = {
            id: idGenerator(),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        };
        await blogsCollection.insertOne(newBlog)
        return newBlog;
    },
    async deleteBlogById(id:string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
    async updateBlogById(id: string, name: string, youtubeUrl: string): Promise<boolean>{
        const result = await blogsCollection.updateOne({id:id},{$set:{
                name: name,
                youtubeUrl: youtubeUrl
            }})
        return result.matchedCount === 1

    },
    async deleteAllBlogs(): Promise<boolean>{
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount > 0
    }
}