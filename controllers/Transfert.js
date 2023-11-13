import CompteUser from '../models/Compte.js';
import Transfert from '../models/Transfert.js';
import apiMTNpay from './api_mtn.js';

const createAndMakeTransfert = (async (req, res) => {
    try {
        const status = await apiMTNpay(req,res,req.body.costArticle,req.params.userNumber)
        if (status == 202) {
            const transfert = await new Transfert({
                expediteurNumber : req.params.userNumber,
                destinateurNumber : req.body.destinateurNumber,
                montant : req.body.montant,
            })
            transfert.save()
            let compteExp;
            let compteDes;
            await CompteUser.findOne({userNumber: req.params.userNumber}).then(item => compteExp = item);
            await CompteUser.findOne({userNumber: req.params.userNumber}).then(item => compteDes = item);
    
            const compteExpUpdate = await CompteUser.findOneAndUpdate({userNumber: req.params.userNumber},{total: (Number(compte.total) - Number(req.body.montant)).toString(), depense : (Number(compte.depense) + Number(transfert.montant)).toString()},{ $currentDate: { lastModified: true } })
            const compteDesUpdate = await CompteUser.findOneAndUpdate({userNumber: req.body.destinateurNumber},{total: (Number(compte.total) + Number(req.body.montant)).toString(), depot : (Number(compte.depot) + Number(transfert.montant)).toString()},{ $currentDate: { lastModified: true } })
            
            await compteExpUpdate.save()
            await compteDesUpdate.save()
            console.log(compteUpdate);
            
            res.send({compteDesUpdate,transfert,compteExpUpdate})
        } else {
            res.send("La connexion avec l'API MTN en local à echouer")
        }
    } catch (error) {
        console.log(error);
    }
})

const getTransferts = ((req, res) => {
    Transfert.find({}).then(item => res.send(item))
})

const getTransfert = (async (req, res) => {
    await Transfert.findOne({ userNumber: req.params.userNumber }).then(item => res.send(item));
})

export { createAndMakeTransfert, getTransfert, getTransferts };


