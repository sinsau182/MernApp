const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");    //not required
app.use(cors());                 //not required

const path = require('path');
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// An api endpoint that returns a short list of items
const userRoute = require("./routes/userRoute")
app.use('/api/v4', userRoute);
// Frontend fallback for React or similar frameworks
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const dotenv = require("dotenv")
dotenv.config();


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

