const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./db/connect')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

//SECURITY
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const expressRateLimmitter = require('express-rate-limit')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(expressRateLimmitter({windowMs : 60 * 1000, max : 60}))

connectDB.sync({force : false}).then(() => {
    console.log("Drop and re-sync db.");
  });

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/', adminRouter)
app.use('/', userRouter)

const start = async () => {
    try {
        await connectDB.authenticate()
        console.log('Connection established successfully!')
        app.listen(port, () => {console.log(`Server is listening on port ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start()