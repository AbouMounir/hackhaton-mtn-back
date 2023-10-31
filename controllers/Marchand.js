import Marchand from '../models/Marchand.js';

const createMarchand = (async (req,res) => {
    const marchand = await new Marchand({
        marchandFirstName : req.body.marchandFirstName,
        marchandLastName : req.body.marchandLastName,
        storeName: req.body.storeName,
        marchandContact: req.body.marchandContact
    })
    await marchand.save()
    res.send(marchand);
})

const getMarchands = ((req, res) => {
    Marchand.find({}).then(item => res.send(item))
})

const getMarchand = (async (req, res) => {
    await Marchand.findOne({ marchandContact: req.params.marchandContact}).then(item => res.send(item));
})

const deleteMarchand = (async (req, res) => {
    const marchands = await Marchand.findOneAndDelete({ marchandContact: req.params.marchandContact })
    await marchands.save();
    next();
})

const updateMarchand = (async (req, res) => {
    try {
        const marchand_update = {
            marchandFirstName : req.body.marchandFirstName,
            marchandLastName : req.body.marchandLastName,
            storeName: req.body.storeName,
            marchandContact: req.body.marchandContact,
        }
        const marchands = await Marchand.findOneAndUpdate({ marchandContact: req.params.marchandContact },{marchand_update},{ $currentDate: { lastModified: true } })
        await marchands.save();
        res.send(marchands)
    } catch (error) {
        console.log(error);
    }
    

})

export { createMarchand, deleteMarchand, getMarchand, getMarchands, updateMarchand };

