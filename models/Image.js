import mongoose from "mongoose";

const Image = mongoose.model('image',{
    userNumber: String,
    urlImage : String
})


export default Image;

