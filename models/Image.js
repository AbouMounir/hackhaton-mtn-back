import mongoose from "mongoose";

const Image = mongoose.model('image',{
    userNumber: String,
    urlImage : {
        data: Buffer,
        contentType: String
    }
})


export default Image;

