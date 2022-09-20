"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsRepository_1 = require("../../repositories/blogsRepository");
const validation_1 = require("../../middlewares/validation");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => {
    const blogsList = blogsRepository_1.blogsRepository.getBlogList();
    res.send(blogsList);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const blog = blogsRepository_1.blogsRepository.getBlogById(req.params.id);
    if (!blog) {
        res.send(404);
        return;
    }
    res.send(blog);
});
exports.blogsRouter.post('/', validation_1.blogsPostValidation, (req, res) => {
    const newBlog = blogsRepository_1.blogsRepository.addBlog(req.body.name, req.body.youtubeUrl);
    res.status(201).send(newBlog);
});
exports.blogsRouter.delete('/:id', (req, res) => {
    const deletedBlog = blogsRepository_1.blogsRepository.deleteBlogById(req.params.id);
    if (!deletedBlog) {
        res.send(404);
        return;
    }
    res.send(204);
});
