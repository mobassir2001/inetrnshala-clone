require("dotenv").config({path:"./.env"})
const express = require("express");
const app = express();
const PORT = process.env.PORT

//database connection
require("./models/database").connectDatabase();
  
// LOGGER
const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}));

app.use(cookieparser());

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