const express = require("express");
const { homepage } = require("../controllers/indexController");
const router = express.Router();
const app = express();

router.get("/",homepage);


module.exports= router;