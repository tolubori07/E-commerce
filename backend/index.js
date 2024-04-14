const path = require('path');
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT||8000

connectDB()

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false,limit: '50mb'}));
app.use('/api/items', require('./routes/itemRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/bag',require('./routes/bagRoutes'))
// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  //   app.get('*', (req, res) =>
  //     res.sendFile(
  //       path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
  //     )
  //   );
  // } else {
  //   app.get('/', (req, res) => res.send('Please set to production'));
  // }
  
app.use(errorHandler)

app.listen(port, ()=>console.log(`server started on port ${port}`))
