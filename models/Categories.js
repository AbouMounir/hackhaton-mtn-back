import mongoose from "mongoose";

const Categorie = mongoose.model('categories',{
    notiTitle: String,
    notiContent : String,
    notiDate: {
        type: Date,
        default: Date.now
    }
})


export default Categorie;

