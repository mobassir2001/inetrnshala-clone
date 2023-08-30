const express = require("express");
const { homepage,studentsignup,studentsignin,studentsignout,currentUser,studentsendmail,studentforgetlink,studentresetpassword,studentupdate ,studentavatar} = require("../controllers/indexController");
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

//post /student /send-mail
router.post("/student/send-mail", studentsendmail);

//get /student /forget-link/:studentid
router.get("/student/forget-link/:id",studentforgetlink)

//post /student /reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword)

//post /student /update/:studentid
router.post("/student/update/:id",isAuthenticated,studentupdate)

//post /student /avatar/:studentid
router.post("/student/avatar/:id",isAuthenticated,studentavatar)


module.exports= router;