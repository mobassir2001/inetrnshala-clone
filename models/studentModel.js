const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const studentModel = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:[true,"first name is required"],
            minLength:[4,"first name should be atleast 4 character"]
        },
        lastname:{
            type:String,
            required:[true,"last name is required"],
            minLength:[4,"last name should be atleast 4 character"]
        },

        avatar:{
            type:Object,
            default:{
                fileId:"",
                url:"https://images.pexels.com/photos/159108/light-lamp-electricity-power-159108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }
        },

        contact:{
            type:String,
            required:[true,"contact is required"],
            maxLength:[10,"contact must not exceed 10 character"],
            minLength:[10,"contact must not exceed 10 character long"]
        },

        city:{
            type:String,
            required:[true,"city name is required"],
            minLength:[3,"city shold be atleast 3character long"]
        },

        gender:{type:String,enum:["Male","Female","Others"]},

        email:{
            type:String,
            unique:true,
            required:[true,"Email is required"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password:{
            type:String,
            select:false,
            maxLength:[15,"password should not exceed more then 15char"],
            minLength:[6,"password should have atleast 6charcters"],
            // match:[]
        },
        resetPasswordToken:{
           type:String,
           default:"0" 
        }
    },
    {timestamps:true}
);

studentModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
});

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

const Student = mongoose.model("student",studentModel);

module.exports= Student;