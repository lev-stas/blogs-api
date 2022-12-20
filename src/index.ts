import * as dotenv from 'dotenv';
dotenv.config();
import express, {Response, Request} from "express";
import bodyParser from "body-parser";
import {blogsRouter} from "./routers/blogsRouter";
import {postsRouter} from "./routers/postsRouter";
import {testingRoute} from "./routers/testing";
import {runMongoDB} from "./repositories/mongodb";
import {usersRouter} from "./routers/usersRouter";
import {authRouter} from "./routers/authRouter";
import {commentsRouter} from "./routers/commentsRouter";
import cookieParser from "cookie-parser";


const app = express();
const parser = bodyParser();
const cookiesParser = cookieParser();
const port = process.env.PORT;
const welcomeMessage:string = 'It Would Be Great to Get a Welcome Drink Here!';

app.use(parser)
app.use(cookiesParser)

app.get ('/', (req:Request, res:Response) => {
    res.send(welcomeMessage)
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testingRoute)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)


const startApp = async () => {
    await runMongoDB()
    app.listen(port, () => {
        console.log(('Blogs App is running on port ${port}'))
    })
}
startApp()

