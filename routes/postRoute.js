const router = require('express').Router();
const ValidateToken = require('../middlewares/Auth');
const { createPost, fetchPost, getpost, updatePost, updateValidation, updateimage, deletePost, home, postdetails, postComment } = require('../controllers/postControllers');

router.post('/create_post', ValidateToken, createPost);
router.get('/posts/:id/:page', ValidateToken, fetchPost);
router.get('/post/:id', ValidateToken, getpost);
router.post('/updatepost', [ValidateToken, updateValidation], updatePost);
router.post('/updateimage', ValidateToken, updateimage);
router.get('/deletepost/:id', ValidateToken, deletePost);
router.get('/homepost/:page', home)
router.get('/details/:id',postdetails)
router.post('/comment',ValidateToken,postComment)

module.exports = router;



