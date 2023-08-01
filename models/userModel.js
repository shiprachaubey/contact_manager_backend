const  mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: [true, "Please add the user name"],
    },
    email:{
        type: String,
        required: [true, "Please add the user email address"],
        unique: [ true, "email addres already exist"]
    },
    password:{
        type: String,
        required: [true, "Please add the user password"],
    },
},{
    timestamps:true,
}
);

module.exports = mongoose.model("User", userSchema);