import {idGenerator} from "../utils/utils";
import {commentsRepository} from "../repositories/commentsRepository";

export async function createComment(
    postId: string,
    userId:string,
    userLogin:string,
    content:string
){
   const newComment = {
       id: idGenerator(),
       content: content,
       postId: postId,
       userId: userId,
       userLogin: userLogin,
       createdAt: new Date().toISOString()
   }
   const postResult = await commentsRepository.postNewComment(newComment)
    if (!postResult){
        return null
    }
    const comment = await commentsRepository.getCommentById(newComment.id)
    return comment
}