require("dotenv").config({path:"./.env"})
const express = require("express");
const app = express();
const PORT = process.env.PORT
  
// LOGGER
const logger = require("morgan");
app.use(logger("tiny"))

//routes
app.use("/",require("./routes/indexRoutes"))

//error handling
const ErrorHandler = require("./utils/ErrorHandler");
const {generatederrors} = require("./middlewares/error")

app.all("*",(req,res,next)=>{
    next(new ErrorHandler(`Requested url not found ${req.url}`,404))
})

app.use(generatederrors)

app.listen(PORT,()=>{ console.log(`server running on port ${PORT}`)});