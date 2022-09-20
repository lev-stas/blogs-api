"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogsRouter_1 = require("./routers/h02/blogsRouter");
const app = (0, express_1.default)();
const parser = (0, body_parser_1.default)();
const port = process.env.PORT || 3000;
const welcomeMessage = 'It Would Be Great to Get a Welcome Drink Here!';
app.use(parser);
app.get('/', (req, res) => {
    res.send(welcomeMessage);
});
app.use('/blogs', blogsRouter_1.blogsRouter);
app.listen(port, () => {
    console.log(('Blogs App is running on port ${port}'));
});
