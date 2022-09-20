"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const utils_1 = require("../utils/utils");
let blogs = [
    {
        id: "vhr8teo7krl",
        name: "it-kamasutra",
        youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
    },
    {
        id: "avwdee4j65w",
        name: "digitalize",
        youtubeUrl: "https://www.youtube.com/c/Диджитализируй"
    }
];
exports.blogsRepository = {
    getBlogList() {
        return blogs;
    },
    getBlogById(id) {
        const blog = blogs.find(item => item.id === id);
        if (blog) {
            return blog;
        }
        return false;
    },
    addBlog(name, youtubeUrl) {
        const newBlog = {
            id: (0, utils_1.idGenerator)(),
            name: name,
            youtubeUrl: youtubeUrl
        };
        blogs.push(newBlog);
        return newBlog;
    },
    deleteBlogById(id) {
        const blogForDelete = blogs.find(item => item.id === id);
        if (!blogForDelete) {
            return false;
        }
        blogs = blogs.filter(item => item.id !== id);
        return true;
    }
};
