import mongoose from "mongoose";
import { nanoid } from "nanoid";

const userSchema = new mongoose.Schema({

    _id : { type : String, default : ()=>nanoid(12) },
    username : { type : String, required : true, unique : true },
    email : { type : String, required : true, unique : true},
    profileImage : { type : String },
    password : { type : String, required : true },
    keyBundle : {
        _id : false,
        registrationId : { type : Number },
        identityKey : { type : String },
        signedPreKey : {
            keyId : { type : Number, required : true},
            key : { type : String, required : true},
            signature : { type : String, required : true}
        },
        preKeys  : [{ 
            _id : false,
            keyId : { type : Number, required : true },
            key : { type : String, required : true }
         }]
    },
    status : { type : String, default : 'Heyyo wassup !' },
    isOnline : { type : Boolean,  default : false },
    lastSeen : { type : Date },
    isActive : { type : Boolean, default : true }

},{ timestamps : true })

const User = mongoose.model('User',userSchema);

export default User