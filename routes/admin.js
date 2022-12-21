const express = require('express')
const router = express.Router()

const {login, getAllusers, getSingleUser, updateUserStatus} = require('../controllers/admin')

const adminAuthMiddleware = require('../middleware/auth')

router.route('/admin/login').post(login)
router.route('/admin/users').get(adminAuthMiddleware, getAllusers)
router.route('/admin/users/:id').get(adminAuthMiddleware, getSingleUser).patch(adminAuthMiddleware, updateUserStatus)

module.exports = router