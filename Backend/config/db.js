const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)  // <- no options needed
        console.log("DB connected ✅")
    } catch (error) {
        console.log("DB connection failed ❌")
        console.error(error)   // shows exact reason if something else fails
        process.exit(1)
    }
}

module.exports = connectDb