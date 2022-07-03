
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const User = require('../models/user')
const signupController = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        if (!name || !password || !role) {
            return res.status(400).json({
                status: 400,
                message: `Invalid Parameters`
            })
        }
        const isUserAlreadyExist = await User.findOne({ name });
        if (isUserAlreadyExist) {
            return res.status(409).json({
                status: 409,
                message: `User with given name already exist`
            })
        }
        const hashedPassword = bcryptjs.hashSync(password, 13);
        const newUser = new User({ name, password: hashedPassword, role })
        await newUser.save()
        res.status(201).json({
            status: 201,
            message: `New user created successfully`
        })
    } catch (err) {
        console.log(err)
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        return res.status(err.status).json({
            status: err.status,
            err: err.message
        })
    }
}

const siginController = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({
                status: 400,
                message: `Invalid Parameters`
            })
        }
        const existUser = await User.findOne({ name });
        if (!existUser) {
            return res.status(404).json({
                status: 404,
                message: `User not found`
            })
        }
        const isValidPassword = bcryptjs.compareSync(password, existUser.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 401,
                message: `Invalid Credentials`
            })
        }
        const user = {
            name: existUser.name,
            role: existUser.role,
            id: existUser._id
        }
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: "12h" })
        res.status(200).json({
            status: 200,
            message: `Successfully logined`,
            result: { token, ...user }
        })

    } catch (err) {
        console.log(err)
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        return res.status(err.status).json({
            status: err.status,
            err: err.message
        })
    }
}

const getUserWithToken = async (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            user: { ...req.user }
        })

    } catch (err) {
        console.log(err)
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        return res.status(err.status).json({
            status: err.status,
            err: err.message
        })
    }
}

module.exports = {
    signupController,
    siginController,
    getUserWithToken
}