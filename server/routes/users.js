const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", async(req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        return res.status(200).json({
        success: true
        });
    }catch(err){
        return res.json({ success: false, err });
    }
});

router.post("/login", async(req, res) => {        

    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){

            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

            

        }else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "Wrong password" });
    
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", user.tokenExp);
                    res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true, userId: user._id
                        });
                });
            });
        }
    }catch(err){
       
        return res.json(err);
    }
    
});

router.get("/logout", auth, async (req, res) => {
  

    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" });
        return res.status(200).send({
            success: true
        });
     }catch(err){
        return res.json({ success: false, err });
    }

});

module.exports = router;