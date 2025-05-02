import mongoose from "mongoose";
import { nanoid } from "nanoid";

const chatRoomSchema = new mongoose.Schema({

    _id : { type : String, default : ()=> nanoid(12) },
    name : { type : String, default : null }, // Only relevant for group chats
    members : [{type : String, ref : 'User'}],
    isGroup : { type : String, default : false },
    lastMessage : { type : String, ref : 'Message', default : null },

},{ timestamps : true })

const ChatRoom = mongoose.model('chatRoom',chatRoomSchema);

export default ChatRoom