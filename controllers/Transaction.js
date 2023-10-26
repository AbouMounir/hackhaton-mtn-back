import TextFlow from 'textflow.js';
import Transaction from '../models/Transaction.js';

TextFlow.useKey("Tm6sFLbORJ6yOuVgA7NkwS9ErSmBeAmDjR476hML9Q49vxB9k938Yyei7J9zdkc9");

const getTransactions = ((req, res) => {
    Transaction.find({}).then(item => res.send(item))
})

const getTransaction = (async (req, res) => {
    await Transaction.findOne({ _id: req.params.id }).then(item => res.send(item));
})

const createTransaction = (async (req, res) => {
    const Transaction = await new Transaction({
        TransactionFirstName: req.body.FirstName,
        TransactionLastName: req.body.LastName,
        TransactionNumber: req.body.number,
        codeSecurite: req.body.code
    })
    Transaction.save()
    
    const verificationOptions ={
        service_name: 'MTN hackathon app',
        seconds: 600,
    }
    const result = await TextFlow.sendVerificationSMS(req.body.number, verificationOptions);
    return res.status(result.status).json(result.message)
})

const updateTransaction = (async (req, res) => {
    const Transaction = {
        storeName : String,
        articleName : String,
        cost : String,
        codeSecurite: req.body.code
    }
    const updateTransaction = await Transaction.findOneAndUpdate({ _id: req.params.id }, { $set: Transaction })
    await updateTransaction.save()
    next();
})

const deleteTransaction = (async (req, res) => {
    const Transactions = await Transaction.findOneAndDelete({ _id: req.params.id })
    await Transactions.save();
    next();
})

const verificationCode = ( async (req,res) => {

    const phone_number = await Transaction.findOne({_id: req.params.id})
    const {code} = req.body;
    let result = await TextFlow.verifyCode(phone_number, code);
    if(result.valid)
    {
        // your server logic
        return res.status(200).json(result.message)
    }
    return res.status(result.status).json(result.message)
        
})

export { createTransaction, deleteTransaction, getTransaction, getTransactions, updateTransaction, verificationCode };


