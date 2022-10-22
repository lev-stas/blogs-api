import {blogsCollection} from "./mongodb";
import {QueryParams} from "../types/types";
import {blogsRepository} from "./blogsRepository";

export const blogsQueryRepository = {
    async getAllBlogs(queryParams:QueryParams){
        const skipNumber = queryParams.pageNumber! < 2 ? 0 : (queryParams.pageNumber! - 1) * queryParams.pageSize!
        const blogs = await blogsCollection
            .find(
                {name: {$regex: queryParams.searchNameTerm, $options: 'i'}},
            {projection:{_id: 0}})
            .sort({[queryParams.sortBy!]: queryParams.sortDirection! })
            //.sort({[queryParams.sortBy!]: queryParams.sortDirection!})
            .skip(skipNumber)
            .limit(queryParams.pageSize!)
            .toArray()
        const totalBlogs = blogs.length
        return {
            pagesCount: Math.ceil(totalBlogs / queryParams.pageSize!),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount: totalBlogs,
            items: blogs
        }
    }
}

