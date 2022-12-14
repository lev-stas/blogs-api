import {blogsCollection, mongoClient} from "./mongodb";
import {BlogsType} from "../types/types";


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
     async addBlog(newBlog: BlogsType):Promise<boolean> {
        const result = await blogsCollection.insertOne(newBlog)
        return result.acknowledged
    },
    async deleteBlogById(id:string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    },
    async updateBlogById(id: string, name: string, websiteUrl: string): Promise<boolean>{
        const result = await blogsCollection.updateOne({id:id},{$set:{
                name: name,
                websiteUrl: websiteUrl
            }})
        return result.matchedCount === 1

    },
    async deleteAllBlogs(): Promise<boolean>{
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount > 0
    },

    async getBlogName(blogId:string): Promise<string | null>{
        const blogName = await blogsCollection.findOne({id: blogId}, {projection:{name: 1, _id: 0}})
        return blogName ? blogName.name : null
    }
}