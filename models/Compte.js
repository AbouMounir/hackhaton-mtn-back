import mongoose from "mongoose";

const CompteUser = mongoose.connect('comptes',{
    total : String,
    depot : String,
    depense : String,
})


export default CompteUser;
