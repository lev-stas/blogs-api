import {commentsCollection} from "./mongodb";
import {CommentsType} from "../types/types";

export const commentsRepository = {
    async postNewComment(newComment:CommentsType){
        const result = await commentsCollection.insertOne(newComment)
        return result.acknowledged
    },
    async getCommentById (commentId: string){
        const comment = await commentsCollection.findOne({id: commentId}, {projection:{_id: 0, postId: 0}})
        if (!comment){
            return null
        }
        return comment
    },
    async changeCommnetById(commentId: string, content: string){
        const result = await commentsCollection.updateOne({id: commentId},{
            $set:{
                content: content
            }
        })
      return result.matchedCount === 1
    },

    async deleteCommentById (commentId: string){
        const result = await commentsCollection.deleteOne({id: commentId})
        return result.deletedCount === 1
    },
    async deleteAllComments(){
        const result = await commentsCollection.deleteMany({})
        return result.deletedCount > 0
    }
}

