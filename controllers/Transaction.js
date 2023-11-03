import CompteUser from '../models/Compte.js';
import Transaction from '../models/Transaction.js';
import apiMTNpay from './api_mtn.js';

const createAndMakeTransaction = (async (req, res) => {
    try {
        const status = await apiMTNpay(req,res,req.body.costArticle,req.params.userNumber)
        if (status == 202) {
            const transaction = await new Transaction({
                storeName : req.body.storeName,
                costArticle : req.body.costArticle,
            })
            transaction.save()
            let compte;
            await CompteUser.findOne({userNumber: req.params.userNumber}).then(item => compte = item);
            console.log(compte);
    
            const compteUpdate = await CompteUser.findOneAndUpdate({userNumber: req.params.userNumber},{total: compte.total - req.body.costArticle, depense : (Number(compte.depense) + Number(transaction.costArticle)).toString()},{ $currentDate: { lastModified: true } })
            
            await compteUpdate.save()
            console.log(compteUpdate);
            
            res.send({compteUpdate,transaction})
        } else {
            res.send("La connexion avec l'API MTN en local à echouer")
        }
    } catch (error) {
        console.log(error);
    }
})

const getTransactions = ((req, res) => {
    Transaction.find({}).then(item => res.send(item))
})

const getTransaction = (async (req, res) => {
    await Transaction.findOne({ userNumber: req.params.userNumber }).then(item => res.send(item));
})

export { createAndMakeTransaction, getTransaction, getTransactions };


