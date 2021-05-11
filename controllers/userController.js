const { body, validationResult } = require('express-validator');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/userRoute');
const { create } = require('../models/user');

const createToken = async (resp) => {
    const token = await jwt.sign({ user: resp }, process.env.SECRET_KEY, {
        expiresIn: '7d'
    });
    return await token;
}

module.exports.registerValidation = [
    body("name").not().isEmpty().trim().withMessage("name is empty"),
    body("email").not().isEmpty().trim().withMessage("email is require"),
    body("password").isLength({ min: 5 }).withMessage("password must be 5 charecter")
];

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), status: false });
    }
    try {
        const checkuser = await User.findOne({ email })
        if (checkuser) {
            return res.status(400).json({ errors: [{ msg: "email is allready exists", status: false }] });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPass
        });

        const resp = await newUser.save();

        const token = await createToken(resp);
        return res.status(200).json({ msg: 'your account is creatd successfully!!', token, status: true });

    } catch (error) {
        return res.status(500).json({ errors: error, status: false });
    }
    // res.send(req.body);
}

module.exports.loginValidation = [
    body("email").not().isEmpty().trim().withMessage("email is require"),
    body("password").isLength({ min: 5 }).withMessage("password must be 5 charecter")
];


module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), status: false });
    }
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email });
        if (userData) {
            const isPassValid = await bcrypt.compare(password, userData.password);
            // console.log(isPassValid);
            if (isPassValid) {
                const token = await createToken(userData);
                return res.status(200).json({ msg: 'your login done!!', token, status: true });
            } else {
                return res.status(400).json({ errors: [{ msg: "your password is wrong", status: false }] });
            }
        } else {
            return res.status(400).json({ errors: [{ msg: "email is not exists", status: false }] });
        }
    } catch (error) {
        return res.status(500).json({ errors: error, status: false });
    }

}

module.exports.getuserbyid = async (req, res) => {
    const id = req.body.id;
    try {
        const resp = await User.findById(id);
        console.log(resp);
        return res.status(200).json(resp);
    } catch (error) {
        return res.status(500).json({ errors: error, status: false });
    }
}