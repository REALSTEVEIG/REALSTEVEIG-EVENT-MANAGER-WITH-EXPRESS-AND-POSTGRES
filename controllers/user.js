const User = require('../models/user')

exports.registerUser = async (req, res) => {
    try {
        const newUser = await User.create({...req.body})

        return res
            .status(201)
            .json({
                Greetings : 'Thank you for signing up for our event.', 
                newUser
            })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({error : error.message})
    }
}
