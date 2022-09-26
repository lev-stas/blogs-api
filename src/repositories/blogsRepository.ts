import {idGenerator} from "../utils/utils";
import {posts} from "./postsRepository";

export let blogs: { id: string, name: string, youtubeUrl: string }[] = [
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

    },
    updateBlogById(id: string, name: string, youtubeUrl: string){
        const currentBlog = blogs.find(item => item.id === id)
        if (!currentBlog){
            return false
        }
        currentBlog.name = name
        currentBlog.youtubeUrl = youtubeUrl
        posts.filter(item => item.blogId === id).map(item => item.blogName = name)
        return true
    },
    deleteAllBlogs(){
        blogs = []
        return blogs
    }
}