import mongoose from "mongoose";

const CompteUser = mongoose.model('comptes',{
    userString : String,
    total : String,
    depot : String,
    depense : String                                                                                                                                        ,
})


export default CompteUser;
