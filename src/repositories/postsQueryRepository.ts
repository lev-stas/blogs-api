import { QueryParams } from "../types/types";
import {postsCollection} from "./mongodb";

export async function getAllPosts (queryParams:QueryParams){
    const totalPosts = await postsCollection.countDocuments()
    const skipNumber = queryParams.pageNumber! < 2 ? 0 : (queryParams.pageNumber! - 1) * queryParams.pageSize!
    const posts = await postsCollection.find({}, {projection:{_id: 0}})
        .sort({[queryParams.sortBy!]: queryParams.sortDirection!})
        .skip(skipNumber)
        .limit(queryParams.pageSize!)
        .toArray()
    return{
        pagesCount: Math.ceil(totalPosts / queryParams.pageSize!),
        page: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        totalCount: totalPosts,
        items: posts
    }
}

export async function getPostsOfCurrentBlog (queryParams: QueryParams, blogId:string){
    const totalPosts = await postsCollection.countDocuments()
    const skipNumber = queryParams.pageNumber! < 2 ? 0 : (queryParams.pageNumber! - 1) * queryParams.pageSize!
    const posts = await postsCollection.find({blogId: blogId}, {projection:{_id: 0}})
        .sort({[queryParams.sortBy!]: queryParams.sortDirection!})
        .skip(skipNumber)
        .limit(queryParams.pageSize!)
        .toArray()
    return posts.length ? {
        pagesCount: Math.ceil(totalPosts / queryParams.pageSize!),
        page: queryParams.pageNumber,
        pageSize: queryParams.pageSize,
        totalCount: totalPosts,
        items: posts
    }
    : null
}