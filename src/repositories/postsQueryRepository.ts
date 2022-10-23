import {postsCollection} from "./mongodb";

export async function getAllPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: -1 | 1){
    const totalPosts = await postsCollection.countDocuments()
    const skipNumber = pageNumber < 2 ? 0 : (pageNumber - 1) * pageSize
    const posts = await postsCollection.find({}, {projection:{_id: 0}})
        .sort({[sortBy]: sortDirection})
        .skip(skipNumber)
        .limit(pageSize)
        .toArray()
    if (!posts){
        return null
    }
    return{
        pagesCount: Math.ceil(totalPosts / pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: totalPosts,
        items: posts
    }
}

export async function getPostsOfCurrentBlog (pageNumber:number, pageSize:number, sortBy:string, sortDirection: 1 | -1, blogId:string){
    const totalPosts = await postsCollection.countDocuments({blogId: blogId})
    const skipNumber = pageNumber < 2 ? 0 : (pageNumber - 1) * pageSize
    const posts = await postsCollection.find({blogId: blogId}, {projection:{_id: 0}})
        .sort({[sortBy]: sortDirection})
        .skip(skipNumber)
        .limit(pageSize)
        .toArray()
    return posts.length ? {
        pagesCount: Math.ceil(totalPosts / pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: totalPosts,
        items: posts
    }
    : null
}