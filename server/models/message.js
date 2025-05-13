import mongoose from "mongoose";
import { nanoid } from "nanoid";

const messageSchema = new mongoose.Schema({

    _id : { type : String, default : ()=>nanoid(12) },
    chatRoom : { type : String, ref : 'ChatRoom', required : true }, // Links message to its chat room
    senderId : { type : String, ref : 'User', required : true }, // User who sent the message
    recipientId : { type : String, ref : 'User', required : true},
    deviceId : { type : Number, required : true },
    encryptedMessage : { 
        type : { type : Number, required : true },
        body : { type : String, required : true },
        registrationId : { type : Number, required : true }
     },
    type: { type: String, enum: ["text", "image", "video", "file"], default: "text" }, // Type of message
    isDeleted : { type : Boolean, default : false }, // soft delete
    readBy : [{ type : String, ref : 'User' }],
    reactions : { type : Map, of : [String] , default : {} }

},{ timestamps : true })

const Message = mongoose.model('Message',messageSchema);

export default Message