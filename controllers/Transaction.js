import CompteUser from '../models/Compte.js';
import Transaction from '../models/Transaction.js';
import apiMTNpay from './api_mtn.js';

const createAndMakeTransaction = (async (req, res) => {
    try {
        const transaction = await new Transaction({
            storeName : req.body.storeName,
            costArticle : req.body.costArticle,
        })
        transaction.save()
        console.log(transaction);
        let compte;
        await CompteUser.findOne({userNumber: req.params.userNumber}).then(item => compte = item);
        console.log(compte);
        const compteUpdate = await CompteUser.findOneAndUpdate({userNumber: req.params.userNumber},{total: (parseInt(compte.total) - parseInt(req.body.costArticle)).toString(), depense : (parseInt(compte.depense) + parseInt(req.body.costArticle)).toString()})
        
        await compteUpdate.save()
        console.log(compteUpdate);
        apiMTNpay(req,res,req.body.costArticle,req.params.userNumber)
    } catch (error) {
        console.log(error);
    }
})

const getTransactions = ((req, res) => {
    Transaction.find({}).then(item => res.send(item))
})

const getTransaction = (async (req, res) => {
    await Transaction.findOne({ _id: req.params.id }).then(item => res.send(item));
})

export { createAndMakeTransaction, getTransaction, getTransactions };


