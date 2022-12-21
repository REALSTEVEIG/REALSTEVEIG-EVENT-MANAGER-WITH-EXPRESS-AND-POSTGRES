const Admin = require('../models/admin')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res
                .status(400)
                .json({msg : `Please provide all the required parameters!`})
        }

        const admin = await Admin.findOne({where : {email}})

        if (!admin) {
            return res
                .status(400)
                .json({msg : `Email does not exist!`})   
        }

        const comparePassword = await bcrypt.compare(password, admin.password)
        admin.password = undefined

        if (!comparePassword) {
            return res
                .status(400)
                .json({msg : `Password Mismatch!`})
        }

        const token = jwt.sign({email}, 'secret', {expiresIn : '1d'})
        
        return res
            .status(200)
            .json({
                Admin : 'You are welcome to the admin portal', 
                AdminInfo : admin, 
                token : token
            })

    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({error : error.message})
    }
}


exports.getAllusers = async (req, res) => {
    try {
        const allUsers = await User.findAll({})

        if (!allUsers) {
            return res
            .status(404)
            .json({msg : 'No users have signed up for our event yet!'})    
        }

        return res
        .status(200)
        .json({Total_users : allUsers.length, Users : allUsers})
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({error : error.message})
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const {id : userId} = req.params

        const user = await User.findOne({where : {id : userId}})

        if (!user) {
            return res
                .status(404)
                .json({msg : `User with id ${userId} not found`})
        }

        return res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({error : error.message})
    }
}

exports.updateUserStatus = async (req, res) => {
    try {
        const {params : {id : userId}, body : {status}} = req
        const user = await User.update(
            {status}, 
            {where : {id : userId}, 
            returning : true})

        res
            .status(200)
            .json({user})
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({error : error.message})
    }
}