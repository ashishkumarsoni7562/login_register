import mongoose, { Document, Schema } from "mongoose";

import User from "../interfaces/user.interface";
import ShortUniqueId from "short-unique-id";
import CryptoJS  from "crypto-js";
import dotenv from "dotenv";
dotenv.config();
const uid = new ShortUniqueId();

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
    accountBlocked:{
        required:true,
        type:Boolean
    },
    coverImage:{
        required:true,
        type:String
    },
    email: {
        index:true,
        lowercase: true,
        required: [true, "Email is Required"],
        trim: true,
        type: String,
        unique: true,
        validate: {
            message: "Invalid email address",
            validator: (value: string) => {
                // Email validation regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return emailRegex.test(value);
            },
        },
    },
    emailVerified:{
        required:true,
        type:Boolean
    },
    emailVerifiedTime:{
        required:true,
        type:Date
    },
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    loginCount:{
        required:true,
        type:Number
    },
    password:{
        required:[true, "Password is required"],
        type:String
    },
    refreshToken:{
        required:true,
        type:String,
    },
    salt:{
        required:true,
        type:String
    },
    userName:{
        index:true,
        lowercase:true,
        required:[true, "User name is Required"],
        trim:true,
        type:String,
        unique:true,
        validate:{
            message:"User name must be alphanumeric.",
            validator:(value:string)=>{
                const userNameRegex = /^[a-zA-Z0-9]+$/;

                return  userNameRegex.test(value);
            }
        }
    },
    userRole:{
        required:true,
        trim:true,
        type:Number
    }
},
{
    timestamps: true
});

async function passworEncryption(password:string, salt:string):Promise<string>{
    const loginKey = process.env.LOGIN_SECRET_KEY;

    if(!loginKey) return "Login key is missing";
    const passwordHashed = CryptoJS.HmacSHA256(password + salt, loginKey).toString();

    return passwordHashed;
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    const salt = uid.stamp(32);

    this.salt = salt;
    this.password = await passworEncryption(this.password, salt);
    
});

// userSchema.methods.encryptPassword = 

const UserModel =  mongoose.model<User>("user", userSchema);

export default UserModel;