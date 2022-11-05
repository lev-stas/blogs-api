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

export const onUncaughtException = (f?: (s: string) => void) => {
    process.on('uncaughtException', (e) => {
        console.log(`!!! Uncaught Exception${f ? ' with log in db' : ''}: `, (e))
        f?.('uncaughtException: ' + JSON.stringify(e)) // log in db
    })
}

export const onUnhandledRejection = (f?: (s: string) => void) => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(`!!! Unhandled Rejection${f ? ' with log in db' : ''}: `, (reason))
        f?.('unhandledRejection: ' + JSON.stringify((reason))) // log in db

        p
            .then(x => {
                console.log('unhandledRejection - then: ', (x))
                f?.('unhandledRejection - then: ' + JSON.stringify((reason))) // log in db
            })
            .catch(e => {
                console.log('unhandledRejection - catch: ', (e))
                f?.('unhandledRejection - catch: ' + JSON.stringify((reason))) // log in db
            })
    })
}

// отлов ошибок чтоб сервер не падал
export const globalCatch = (uncaughtF?: (s: string) => void, unhandledF?: (s: string) => void) => {
    onUncaughtException(uncaughtF)
    onUnhandledRejection(unhandledF)
}

globalCatch()

const app = express();
const parser = bodyParser();
const port = process.env.PORT;
const welcomeMessage:string = 'It Would Be Great to Get a Welcome Drink Here!';

app.use(parser)

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

