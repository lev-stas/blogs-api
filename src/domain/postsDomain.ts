import {idGenerator} from "../utils/utils";
import {blogsRepository} from "../repositories/blogsRepository";
import {postsRepositories} from "../repositories/postsRepository";

export async function createPost (blogId: string, title:string, shortDescription:string, content:string){
    const blogName = await blogsRepository.getBlogName(blogId)
    if(!blogName){
        return null
    }
    const newPost = {
        id: idGenerator(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
        blogName: blogName,
        createdAt: new Date().toISOString()
    }
    const addingResult =  await postsRepositories.addPost(newPost)
    return addingResult ? await postsRepositories.getPost(newPost.id): null
}