const express = require("express");
const {connectDB} = require("./Backend/DB/index")
const taskRoute = require("./Backend/Routes/TaskRoutes")
const userRoute = require("./Backend/Routes/UserRoutes")
const cookieParser = require('cookie-parser');
const { protect} = require("./Backend/MiddleWare/protectRoute")
const cors = require('cors');
require("dotenv").config();
const path = require("path");



const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'app/dist')))

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


app.get("*" , (req, res) => {
    res.sendFile(path.join(__dirname , 'app', 'dist' , 'index.html'))


})



app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})