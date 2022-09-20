import express, {Response, Request} from "express";
import bodyParser from "body-parser";
import {blogsRouter} from "./routers/h02/blogsRouter";

const app = express();
const parser = bodyParser();
const port = process.env.PORT || 3000;
const welcomeMessage:string = 'It Would Be Great to Get a Welcome Drink Here!';

app.use(parser)

app.get ('/', (req:Request, res:Response) => {
    res.send(welcomeMessage)
})

app.use('/blogs', blogsRouter)


app.listen(port, () => {
    console.log(('Blogs App is running on port ${port}'))
})
