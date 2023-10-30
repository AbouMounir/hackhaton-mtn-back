import Marchand from '../models/Marchand.js';

const createMarchand = (async (req,res) => {
    const marchand = new Marchand({
        marchandFirstName : String,
        marchandLastName : String,
        storeName: String,
        marchandContact: String,
        codeQrMarchand: String
    })
})

const getMarchands = ((req, res) => {
    Marchand.find({}).then(item => res.send(item))
})

const getMarchand = (async (req, res) => {
    await Marchand.findOne({ storeId: req.params.storeId}).then(item => res.send(item));
})

const deleteMarchand = (async (req, res) => {
    await Marchand.findOneAndDelete({ _id: req.params.id })
    await Marchand.save();
    next();
})

export { createMarchand, deleteMarchand, getMarchand, getMarchands };

