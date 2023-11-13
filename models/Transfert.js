import mongoose from "mongoose";

const Transfert = mongoose.model('transferts',{
    expediteurNumber : String,
    destinateurNumber : String,
    montant : String,
    date :  {
        type : Date,
        default: Date.now,
    },
})


export default Transfert;

/*
    à qui
    de qui
    montant
    date
*/