import mongoose from "mongoose";
import { nanoid } from "nanoid";

const userSchema = new mongoose.Schema({

    _id : { type : String, default : ()=>nanoid(12) },
    userName : { type : String, required : true, unique : true },
    email : { type : String, required : true, unique : true},
    profileImage : { type : String },
    password : { type : String, required : true },
    publicKey : { type : String, required : true },
    status : { type : String, default : 'Heyyo wassup !' },
    isOnline : { type : Boolean,  default : false },
    lastSeen : { type : Date },

},{ timestamps : true })

const User = mongoose.model('User',userSchema);

export default User