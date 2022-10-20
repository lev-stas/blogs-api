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
    const addingResult = await blogsRepository.addBlog(newBlog)
    return addingResult ? newBlog : null

}