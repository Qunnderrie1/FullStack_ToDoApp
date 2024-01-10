const express = require("express");
const {connectDB} = require("./Backend/DB/index")
const taskRoute = require("./Backend/Routes/TaskRoutes")
const userRoute = require("./Backend/Routes/UserRoutes")
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();
const path = require("path");



const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())


app.use(express.static('Client/build'))

connectDB();

app.use("/api/task" , taskRoute)
app.use("/api/user" , userRoute)





app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })


})

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname + 'Client/build')));

    app.get("*" , (req, res) => res.sendFile(path.resolve(__dirname + '/Client'+ '/build'+ '/index.html')))
    console.log('Server is ready production!')

}else{

    app.get('/' , (req, res) => res.send('Server is running!'))
    console.log('Server is ready development!')
}


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

