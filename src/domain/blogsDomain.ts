import {BlogsType} from "../types/types";
import {idGenerator} from "../utils/utils";
import {blogsRepository} from "../repositories/blogsRepository";

export async function createBlog (name: string, websiteUrl:string): Promise<BlogsType | null>{
    const newBlog:BlogsType ={
        id: idGenerator(),
        name: name,
        websiteUrl: websiteUrl,
        createdAt: new Date().toISOString()
    }
    const result = await blogsRepository.addBlog(newBlog)
    return result ? await blogsRepository.getBlogById(newBlog.id) : null
}