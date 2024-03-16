const express = require("express")
const cors = require('cors')
require('dotenv').config()


const port = process.env.PORT || 5001
const app = express()
app.use(express.json())
app.use(cors())


app.route('/').get((req,res)=>{
    res.send("This is Main Backend Route")
})


app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})