const express = require("express");
const app = express();

const dotenv = require("dotenv")
dotenv.config();

const userRoute = require("./routes/userRoute")

app.use(express.json());

const cors = require("cors");
app.use(cors());


const mongoose = require("mongoose")
mongoose.connect(process.env.URI)
.then(() => {
    console.log("connected successfully !")
    app.listen(process.env.PORT || 8000, (err) => {
        if(err) console.log(err)
        console.log(`server is running on PORT ${process.env.PORT}`)
        //  console.log("server is running on PORT", process.env.PORT)
    })
}).catch((err) => {
    console.log("error",  err)
})

app.use(userRoute);