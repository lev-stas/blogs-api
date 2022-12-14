import {MongoClient} from 'mongodb'
import {BlogsType, CommentsType, UsersType} from "../types/types";
import {PostsType} from "./postsRepository";

const mongoUrl: string | undefined = process.env.mongoURI;
export const mongoClient = new MongoClient(mongoUrl!);
const db = mongoClient.db('BlogsAPI');
export const blogsCollection = db.collection<BlogsType>('blogscollection');
export const postsCollection = db.collection<PostsType>('postscollection');
export const usersCollection = db.collection<UsersType>('userscollection');
export const commentsCollection = db.collection<CommentsType>('commentscollection')


export async function runMongoDB () {
    try {
        await mongoClient.connect();
        await mongoClient.db("blogsapi").command({ping: 1});
        console.log("Connection to mongo server is successful")
    } catch {
        await mongoClient.close()
    }
}