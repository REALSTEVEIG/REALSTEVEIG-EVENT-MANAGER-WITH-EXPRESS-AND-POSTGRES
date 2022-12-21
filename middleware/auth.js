const jwt = require('jsonwebtoken')

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res
                .status(401)
                .json({error : 'No token present'})
        }

        const token = authHeader.split(' ')[1]

        const payload = jwt.verify(token, 'secret')
        
        next()
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({error : 'Unauthorized'})
    }
}

module.exports = adminAuthMiddleware