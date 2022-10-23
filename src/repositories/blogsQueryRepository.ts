import {blogsCollection} from "./mongodb";

export const blogsQueryRepository = {
    async getAllBlogs(searchNameTerm:string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:-1|1){
        const totalBlogs = await blogsCollection.countDocuments({name: {$regex: searchNameTerm, $options: 'i'}})
        const skipNumber = pageNumber! < 2 ? 0 : (pageNumber! - 1) * pageSize!
        const blogs = await blogsCollection
            .find(
                {name: {$regex: searchNameTerm, $options: 'i'}},
            {projection:{_id: 0}})
            .sort({[sortBy]: sortDirection })
            .skip(skipNumber)
            .limit(pageSize)
            .toArray()
        return {
            pagesCount: Math.ceil(totalBlogs / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalBlogs,
            items: blogs
        }
    }
}

