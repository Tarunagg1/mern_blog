const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.updateProfile = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    if (name === "") {
        return res.status(400).json({ errors: [{ msg: "Enter The name", status: false }] });
    } else {
        try {
            const resp = await User.findByIdAndUpdate(id, { name: name });
            return res.status(200).json({ userdata: resp, msg: "Profile updated" });
        } catch (error) {
            return res.status(400).json({ errors: error, msg: error.message });
        }
    }
}

module.exports.changePassword = async (req, res) => {
    const { oldpass, newpass, cnewpass, id } = req.body;
    if (oldpass == "" || newpass == "" || cnewpass == "") {
        return res.status(400).json({ errors: [{ msg: "all Fields required required", status: false }] });
    } else if (newpass != cnewpass) {
        return res.status(400).json({ errors: [{ msg: "New Password not match confirm password", status: false }] });
    } else {
        let olduser = await User.findById(id);
        const ispassvalid = await bcrypt.compare(oldpass, olduser.password);
        console.log(ispassvalid);
        if (ispassvalid) {
            const salt = await bcrypt.genSalt(10);
            const nawhashPass = await bcrypt.hash(newpass, salt);
            const resp = await User.findByIdAndUpdate(id, { password: nawhashPass });
            if (resp) {
                res.status(200).json({ msg: "password updated Successfully" });
            } else {
                return res.status(400).json({ errors: [{ msg: "Something went wrong", status: false }] });
            }
        } else {
            return res.status(400).json({ errors: [{ msg: "Invalid old password", status: false }] });
        }
        // User
    }
}