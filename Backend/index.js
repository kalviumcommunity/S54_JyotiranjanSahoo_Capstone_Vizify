const express = require("express")
const cors = require('cors')
require('dotenv').config()
const UserRoutes = require("./Routes/UserRoutes")
const connect = require("./config/connect")
const PresentationRoutes = require("./Routes/PresentationRoutes")
const ImageRoutes = require("./Routes/ImageRoutes")
const port = process.env.PORT || 5001
const app = express()
app.use(express.json())
app.use(cors())

app.route('/').get((req,res)=>{
    res.send("This is Vizify Backend Route")
})

connect().then(response=>{
    console.log(response);
    app.get("/",(req,res)=>{
        res.send(response)
    })
}).catch(response=>{
    console.log(response);
    app.get("/",(req,res)=>{
        res.send(response)
    })
})

app.use("/api/userdatas",UserRoutes)
app.use("/api/presentationdatas",PresentationRoutes)
app.use("/api/imagedatas",ImageRoutes)


app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})