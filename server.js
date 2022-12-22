const express = require('express');
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app = express();
app.use(express.json());

app.use('/', adminRouter)
app.use('/', userRouter)

module.exports = app;