import {idGenerator} from "../utils/utils";

export let posts:{
    id:string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}[] = [
    {
        id: '4mvkezrb08g',
        title: 'My First Post',
        shortDescription: 'This is my very first post where I want to tell you some',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        blogId: '6u2gxgh3cf',
        blogName: 'Samurai Blog'
    },
    {
        id: 'xbks98uk41',
        title: 'The second of My Posts',
        shortDescription: 'This is the second post where I try to explain something',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        blogId: 'aepyer7njyc',
        blogName: 'Shogun Blog'
    }
]

export const postsRepositories = {
    getAllPosts (){
        return posts
    },
    getPost(id:string){
        const post = posts.find(item => item.id === id)
        if (!post){
            return false
        }
        return post
    },
    deletePost(id:string){
        const post = posts.find(item => item.id === id)
        if (!post){
            return false
        }
        posts = posts.filter(item => item.id !== id)
        return true
    },
    addPost(
        title: string,
        shortDescription: string,
        content: string,
        blogId: string
    ){
        const currentBlog = posts.find(item => item.blogId === blogId)
        const newPost:{
            id: string,
            title: string,
            shortDescription: string,
            content: string,
            blogId: string,
            blogName: string
        } = {
            id: idGenerator(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: currentBlog!.blogName
        }
        posts.push(newPost)
        return newPost
    },
    changePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string
    ){
        const currentPost = posts.find(item => item.id === id)
        if (!currentPost){
            return false
        }
        currentPost.title = title
        currentPost.shortDescription = shortDescription
        currentPost.content = content
        return true
    },
    deleteAllPosts(){
        posts = []
        return posts
    }
}