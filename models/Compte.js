import mongoose from "mongoose";

const CompteUser = mongoose.connect('comptes',{
    userNumber : String,
    total : {
        type : Number,
        default : 5000
    },
    depot : {
        type : Number,
        default : 0
    },
    depense : {
        type : Number,
        default : 0
    },
})


export default CompteUser;
