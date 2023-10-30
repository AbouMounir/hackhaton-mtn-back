import mongoose from "mongoose";

const Transaction = mongoose.connect('transactions',{
    storeName : String,
    cost : String,
    date :  {
        type : Date,
        default: Date.now,
    },
})


export default Transaction;
