import {commentsCollection} from "./mongodb";

export async function getAllCommentsOfPost (
    postId: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: 1 | -1
){
    const totalCount = await commentsCollection.countDocuments({postId: postId})
    const skipNumber = pageNumber < 2 ? 0 : (pageNumber - 1) * pageSize
    const comments = await commentsCollection.find(
        {postId: postId}, {projection: {_id: 0, postId: 0}}
    )
        .sort({[sortBy]: sortDirection})
        .skip(skipNumber)
        .limit(pageSize)
        .toArray()
    if(!comments){
        return null
    }
    return {
        pagesCount: Math.ceil(totalCount/pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: totalCount,
        items: comments
    }
}