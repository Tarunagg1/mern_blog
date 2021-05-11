const router = require('express').Router();
const {register,registerValidation,login,loginValidation,getuserbyid} = require('../controllers/userController')

router.post('/register',registerValidation,register);

router.post('/login',loginValidation,login);

router.post('/getuserbyid',getuserbyid);

module.exports = router;
