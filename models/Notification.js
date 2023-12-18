import mongoose from "mongoose";

const Notification = mongoose.model('notifications',{
    notiTitle: String,
    notiContent : String,
    notiDate: {
        type: Date,
        default: Date.now
    }
})


export default Notification;

