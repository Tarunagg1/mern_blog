const router = require('express').Router();
const {register,registerValidation,login,loginValidation} = require('../controllers/userController')

router.post('/register',registerValidation,register);

router.post('/login',loginValidation,login);

module.exports = router;
