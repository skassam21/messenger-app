const User = require("../models/User")
const express = require("express");
const router = express.Router();

// @desc Auth user & get token
// @route POST /api/users/login
// @acess Public
router.get("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            token: "Bearer " + generateToken(user._id),
            name: user.name,
            username: user.username,
            userId: user._id,
        })
    } else {
        res.status(401).json({error: "Invalid email or password"})
    }
})

// @desc   Register a new user
// @route   POST /api/users/register
// @access   Public
router.get("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const userNameExists = await User.findOne({ username });
    const userEmailExists = await User.findOne({ email });

    if (userNameExists) {
        res.status(400).json({error: "Username already exists"})
    }

    if (userEmailExists) {
        res.status(400).json({error: "Email already exists"})
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            token: "Bearer " + generateToken(user._id),
            name: user.name,
            username: user.username,
            userId: user._id,
        });
    } else {
        res.status(400).json({error: "Invalid user data"})
    }
});

module.exports = router;