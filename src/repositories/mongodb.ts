import {MongoClient} from 'mongodb'
import {BlogsType} from "./blogsRepository";
import {PostsType} from "./postsRepository";

const mongoUrl = process.env.mongoURI || 'mongodb+srv://mongoadmin:a7E$pZk8jMeDo!@cluster0.nzqnnli.mongodb.net/?retryWrites=true&w=majority'

export const mongoClient = new MongoClient(mongoUrl);
const db = mongoClient.db('BlogsAPI');
export const blogsCollection = db.collection<BlogsType>('blogscollection');
export const postsCollection = db.collection<PostsType>('postscollection')


export async function runMongoDB () {
    try {
        await mongoClient.connect();
        await mongoClient.db("blogsapi").command({ping: 1});
        console.log("Connection to mongo server is successful")
    } catch {
        await mongoClient.close()
    }
}