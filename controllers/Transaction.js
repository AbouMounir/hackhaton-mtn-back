import Transaction from '../models/Transaction.js';

const createAndMakeTransaction = (async (req, res) => {
    const Transaction = await new Transaction({
        TransactionFirstName: req.body.FirstName,
        TransactionLastName: req.body.LastName,
        TransactionNumber: req.body.number,
        codeSecurite: req.body.code
    })
    Transaction.save()

    const compte = await Compte.findOne({userNumber: req.params.userNumber}).then(item => res.send(item));
    const compteUpdate = await Compte.findOneAndUpdate({userNumber: req.params.userNumber},{total:compte.total - costArticle,depense : compte.depense + costArticle })
    
    await compteUpdate.save()
    apiMTNpay(req,res,req.body.costArticle,req.params.userNumber)
})

const getTransactions = ((req, res) => {
    Transaction.find({}).then(item => res.send(item))
})

const getTransaction = (async (req, res) => {
    await Transaction.findOne({ _id: req.params.id }).then(item => res.send(item));
})

export { createAndMakeTransaction, getTransaction, getTransactions };


