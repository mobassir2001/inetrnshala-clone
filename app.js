require("dotenv").config({path:"./.env"})
const express = require("express");
const app = express();
const PORT = process.env.PORT
  
// LOGGER
const logger = require("morgan");
app.use(logger("shallow"))

app.use("/",require("./routes/indexRoutes"))

app.listen(PORT,()=>{ console.log(`server running on port ${PORT}`)});