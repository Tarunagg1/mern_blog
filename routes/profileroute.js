const express = require('express');
const router = express.Router();
const { updateProfile, changePassword } = require('../controllers/profileUpdateController')
const ValidateToken = require('../middlewares/Auth');

router.post('/updateprofile', ValidateToken, updateProfile);
router.post('/changepassword', ValidateToken, changePassword)

module.exports = router;