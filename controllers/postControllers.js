const http = require('http');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const PostModel = require('../models/post');
const { body, validationResult } = require('express-validator');
const { htmlToText } = require('html-to-text');
const postmodel = require('../models/post');
const commentsModel = require('../models/comments');


module.exports.createPost = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        const { title, body, description, slug, name, id } = fields;
        const errors = [];
        if (title === '') {
            errors.push({ msg: "Title is required" });
        }
        if (body === '') {
            errors.push({ msg: "body is required" });
        }
        if (description === '') {
            errors.push({ msg: "description is required" });
        }
        if (slug === '') {
            errors.push({ msg: "Slug is required" });
        }
        if (Object.keys(files).length === 0) {
            errors.push({ msg: "Image is required" });
        } else {
            const { type } = files.image;
            const splicar = type.split('/');
            const imageext = splicar[1].toLowerCase();
            if (imageext !== 'jpg' && imageext !== 'png' && imageext !== 'img' && imageext !== 'jpeg') {
                errors.push({ msg: `${imageext} is not a valid image format` });
            } else {
                files.image.name = uuidv4() + "." + imageext;
            }
        }

        const CheckSlug = await PostModel.findOne({ slug });
        console.log(CheckSlug);
        if (CheckSlug) {
            errors.push({ msg: "Please choose a unique slug/url" });
        }
        console.log('jbyhb');
        if (errors.length !== 0) {
            return res.status(400).json({ errors, files })
        } else {
            const newPath = __dirname + `/../client/public/postsimg/${files.image.name}`;
            fs.copyFile(files.image.path, newPath, async (error) => {
                if (!error) {
                    try {
                        const newPost = new PostModel({
                            title,
                            body,
                            image: files.image.name,
                            description,
                            slug,
                            username: name,
                            userId: id

                        })
                        const response = await newPost.save();
                        return res.status(200).json({ msg: "Your Post has been Created", response });
                    } catch (error) {
                        return res.status(400).json({ errors: error, msg: error.message });
                    }
                }
                if (error) {
                    errors.push({ msg: "Somthing went Wrong while uploading" });
                }
            });
        }
    });
}

module.exports.fetchPost = async (req, res) => {
    const id = req.params.id;
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
        const count = await PostModel.find({ userId: id }).countDocuments();
        const response = await PostModel.find({ userId: id }).skip(skip).limit(perPage).sort({ updatedAt: -1 });
        return res.status(200).json({ response, perPage, count })
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

module.exports.getpost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findOne({ _id: id });
        return res.status(200).json({ post });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}


module.exports.updateValidation = [
    body('title').notEmpty().trim().withMessage("Title is Required"),
    body('description').notEmpty().trim().withMessage("description is Required"),
    body('body').notEmpty().trim().custom(value => {
        let bodyval = value.replace('/\n/g', '');
        if (htmlToText(bodyval).trim().length === 0)
            return false;
        else
            return true
    }).withMessage("Body is required"),
]

module.exports.updatePost = async (req, res) => {
    const { pid, title, body, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        try {
            const response = await PostModel.findByIdAndUpdate(pid, {
                title,
                body,
                description
            });
            return res.status(200).json({ msg: "Your post has been updated" })
        } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
        }
    }
}

module.exports.updateimage = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (errors, fields, files) => {
        const imgerrs = [];
        if (Object.keys(files).length == 0) {
            imgerrs.push({ msg: "Please Choose Image" });
            return res.status(400).json({ errors: imgerrs });
        } else {
            const { type } = files.image;
            const { id } = fields;
            const arr = type.split('/');
            const imageext = arr[1].toLowerCase();
            if (imageext !== 'jpg' && imageext !== 'png' && imageext !== 'img' && imageext !== 'jpeg') {
                imgerrs.push({ msg: `${imageext} is not a valid image format` });
                return res.status(400).json({ errors: imgerrs });
            } else {
                files.image.name = uuidv4() + "." + imageext;
                const newPath = __dirname + `/../client/public/postsimg/${files.image.name}`;
                fs.copyFile(files.image.path, newPath, async (Err) => {
                    if (Err) {
                        imgerrs.push("Somthing going Wrong while uploading");
                        return res.status(400).json({ errors: imgerrs });
                    } else {
                        try {
                            const response = await PostModel.findByIdAndUpdate(id, {
                                image: files.image.name
                            });
                            return res.status(200).json({ msg: "Your image has been updated" })
                        } catch (error) {
                            return res.status(400).json({ errors: imgerrs, msg: error.message });
                        }
                    }
                })
            }
        }
    })
}

module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        console.log(id);
        const resp = await PostModel.findByIdAndDelete(id);
        console.log(resp);
        return res.status(200).json({ msg: "your post has been deleted" });
    } catch (error) {
        return res.status(400).json({ errors: error, msg: error.message });
    }
}

module.exports.home = async (req, res) => {
    console.log('r5es');
    const page = req.params.page;
    const perPage = 2;
    const skip = (page - 1) * perPage;
    try {
        const count = await PostModel.find({}).countDocuments();
        const posts = await PostModel.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 });
        return res.status(200).json({ response: posts, perPage, count })
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}



module.exports.postdetails = async (req,res)=>{
    const id = req.params.id;
    try {
        const post = await postmodel.findOne({slug:id});
        return res.status(200).json({post});
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }   
}


module.exports.postComment = async (req,res)=>{
    const {id,comment,username} = req.body;
    try {
        const newComment = new commentsModel({
            postId:id,
            comment:comment,
            userName:username
        });
        
        await newComment.save();
        return res.status(200).json({msg:"Your comment is post"})
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}