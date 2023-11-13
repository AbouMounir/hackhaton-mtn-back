import mongoose from "mongoose";

const Transaction = mongoose.model('transactions',{
    storeName : String,
    costArticle : String,
    date :  {
        type : Date,
        default: Date.now,
    },
})


export default Transaction;

/*
    à qui
    de qui
    montant
    date
*/