const User = require('../model/usermodel')
const Forgetpwd = require('../model/forgetpassword')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomize = require('randomatic')

exports.signup = async ( req, res, next ) => {
    try{
        const existingemail = await User.findOne({email : req.body.email})
        if(existingemail){
            const error = new Error('Email address already exist')
            error.status = 500
            throw error
        }
        const existinguser = await User.findOne({username: req.body.username})
        if(existinguser){
            const error = new Error('Username already use by another user, choose a another username')
            error.status = 500
            throw error
        }
    
        const hashpwd = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username : req.body.username,
            institution: req.body.institution,
            department : req.body.department,
            email : req.body.email,
            password : hashpwd,
            category : req.body.category
        })
        const createduser = await user.save()
        res.status(201).json({
            message : 'New user successfully created',
            createdUser : createduser
        });
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.get_user = async ( req, res, next) => {
    const token = req.body.token
    try{
        const getuser = await jwt.verify(token, process.env['JWT_SECRETKEY'])
        const extracteduser = await User.findOne({email : getuser.email})
        res.status(200).json({
            message : 'User fetched',
            user : extracteduser
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.login = async ( req, res, next) => {
    try{
        const existinguser = await User.findOne({email : req.body.email})
        if(!existinguser){
            const error = new Error('Incorrect username or password')
            error.status = 500
            throw error
        }
        const isequal = await bcrypt.compare(req.body.password, existinguser.password)
        if(!isequal){
            const error = new Error('Incorrect username or password')
            error.status = 422
            throw error
        }
        const token = await jwt.sign({email : existinguser.email, id: existinguser._id},process.env['JWT_SECRETKEY'],{expiresIn : '1h'})
        res.status(200).json({
            message : "You are successfully logged in",
            tokenData : {
                token : token,
                expiresIn : new Date().getTime() + (60*60*1000)
            },
            user : existinguser,
        })

    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.forget_password = async ( req, res, next ) => {
    const email = req.body.email;
    try{
        const exisitinguser = await User.findOne({ email : email})
        if(!exisitinguser){
            const err = new Error('User does not exist')
            err.status = 500;
            throw err;
        }
        const existingemail = await Forgetpwd.findOne({email: email})
        const randomnumber = randomize('Aa0', 6)
        if(!existingemail){
            const forgetpwd = new Forgetpwd({
                email : email,
                token : randomnumber,
                expiresIn : new Date(new Date().getTime() + 2 * 60000).toISOString()
            })
            const forgetpwddetails =  await forgetpwd.save()
            res.status(200).json({
                message : 'Reset your password with the token provided below',
                userData : forgetpwddetails
            })
        }
        else{
            await Forgetpwd.updateOne({email : email}, {$set : {
                _id : existingemail._id,
                email : existingemail.email,
                token : randomnumber,
                expiresIn : new Date(new Date().getTime() + 2 * 60000).toISOString()
            }})
            res.status(200).json({
                message : 'Reset your password with the token provided below',
                userData : {
                    _id : existingemail._id,
                    email : existingemail.email,
                    token : randomnumber,
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}

exports.reset_password = async ( req, res, next) => {
    const password = req.body.password
    const token = req.body.token
    try{
        const getpwduser = await Forgetpwd.findOne({token : token})
        if(!getpwduser){
            const error = new Error('Incorrect token')
            error.status = 500
            throw error
        }
        const existinguser = await User.findOne({email : getpwduser.email})
        const hashpwd = await bcrypt.hash(password, 10)
        await User.update({_id:existinguser._id}, {$set:{
            username : existinguser.username,
            institution: existinguser.institution,
            department : existinguser.department,
            email : existinguser.email,
            password : hashpwd,
            category : existinguser.category
        }})
        res.status(200).json({
            message : "password changed succesfully"
        })
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
}


exports.updateuser = async (req, res, next) => {
    try {
            await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username : req.body.username,
                institution: req.body.institution,
                department : req.body.department,
                email : req.body.email,
                password : req.body.password,
                category : req.body.category
            }
        })
        const user = await User.findById(req.params.id)
        res.status(200).json({
            message: 'User successfully updated',
            updatedUser : user
        })
    }
    catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

exports.changepassword = async (req, res, next) => {
    try {
            const existinguser = await User.findById(req.params.id)
            if (!existinguser) {
                const error = new Error('user does not exist')
                error.status = 500
                throw error
            }
            const hashpwd = await bcrypt.hash(req.body.newpassword, 10)
            await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username : existinguser.username,
                institution: existinguser.institution,
                department : existinguser.department,
                email : existinguser.email,
                password : hashpwd,
                category : existinguser.category
            }
        })
        res.status(200).json({
            message: 'password successfully updated',
        })
    }
    catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}