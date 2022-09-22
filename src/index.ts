import express, {Response, Request} from "express";
import bodyParser from "body-parser";
import {blogsRouter} from "./routers/h02/blogsRouter";
import {postsRouter} from "./routers/h02/postsRouter";
import {testingRoute} from "./routers/h02/testing";

const app = express();
const parser = bodyParser();
const port = process.env.PORT || 3000;
const welcomeMessage:string = 'It Would Be Great to Get a Welcome Drink Here!';

app.use(parser)

app.get ('/', (req:Request, res:Response) => {
    res.send(welcomeMessage)
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRoute)

app.listen(port, () => {
    console.log(('Blogs App is running on port ${port}'))
})
