import {BlogsType} from "../types/types";
import {idGenerator} from "../utils/utils";
import {blogsRepository} from "../repositories/blogsRepository";

export async function createBlog (name: string, youtubeUrl:string): Promise<BlogsType | null>{
    const newBlog:BlogsType ={
        id: idGenerator(),
        name: name,
        youtubeUrl: youtubeUrl,
        createdAt: new Date().toISOString()
    }
    const result = await blogsRepository.addBlog(newBlog)
    return result ? await blogsRepository.getBlogById(newBlog.id) : null
}