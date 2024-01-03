const mongoose = require("mongoose");




const connectDB = async () => {

    const connect = await mongoose.connect(process.env.DB_URL)

    if(connect){
        console.log(`Connected: ${connect.connection.host}`)
    }
    else{
        console.log("Connection Failed.")
    }

}



module.exports = {connectDB};