const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors')

const { PORT, MONGO_CONNECTION } = process.env
const port = PORT;
const app = express()

// middlewares
app.use(bodyParser.json());
app.use(cors())
app.use('/images', express.static('assets/images'))

// import routes
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const uploadRoutes = require('./routes/upload-image')
const userRoutes = require('./routes/users')

// DB connection
mongoose.connect(`${MONGO_CONNECTION}e-commerce`)

// routes
app.use('/api', authRoutes)
app.use('/api', productRoutes)
app.use('/api', uploadRoutes)
app.use('/api', userRoutes)

app.get('/', (req, res) => {
  res.send('Express in running on server')
})

app.listen(port, () => console.log(`server is running on port ${port}`))