const express = require("express");
const { homepage,studentsignup,studentsignin,studentsignout,currentUser } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const app = express();

//get/
router.get("/", homepage);

//post/student
router.post("/student",isAuthenticated,currentUser);

//post /student /signup
router.post("/student/signup",studentsignup);

//post /student /signin
router.post("/student/signin",studentsignin);

//get /student /signout
router.get("/student/signout",isAuthenticated, studentsignout);



module.exports= router;