import {idGenerator} from "../utils/utils";
import it from "node:test";
let blogs: { id: string, name: string, youtubeUrl: string }[] = [
    {
    id: "vhr8teo7krl",
    name: "it-kamasutra",
    youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
    },
    {
      id: "avwdee4j65w",
        name: "digitalize",
        youtubeUrl:"https://www.youtube.com/c/Диджитализируй"
    }
]

export const blogsRepository = {
    getBlogList(){
        return blogs
    },
    getBlogById(id:string){
        const blog = blogs.find(item => item.id === id)
        if (blog){
            return blog
        }
        return false
    },
    addBlog(name: string, youtubeUrl: string) {
        const newBlog = {
            id: idGenerator(),
            name: name,
            youtubeUrl: youtubeUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    deleteBlogById(id:string){
        const blogForDelete = blogs.find(item => item.id === id)
        if (!blogForDelete){
            return false
        }
        blogs = blogs.filter(item => item.id !== id)
        return true

    }
}