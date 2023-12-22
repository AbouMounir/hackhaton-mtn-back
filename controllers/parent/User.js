import bcrypt from 'bcrypt';
import Parent from '../../models/parent/User.js';


const signupParent = (async (req, res) => {
    try {
        const number = await Parent.findOne({ parentNumber: req.body.parentNumber });
        if (number) {
            return res.json({ message: "parent already exists" });
        }
        if (req.body.codeSecurite === req.body.codeSecuriteC) {
            bcrypt.hash(req.body.codeSecurite, 10)
            .then(async hash => {
                const parent = await new Parent({
                    parentFirstName: req.body.parentFirstName,
                    parentLastName: req.body.parentLastName,
                    parentNumber: req.body.parentNumber,
                    codeParental: req.body.codeParental,
                    codeSecurite: hash,
                })
                await parent.save()
                    .then(() => res.status(201).json({
                        message: 'utilisateur enregistré !',
                        data: parent
                    }))
                    .catch(error => res.status(400).json({ error }));
                console.log(parent);
            })
            .catch(error => res.status(500).json({ error }))
        }
    } catch (error) {
        console.log(error);
    }
})

const signinParent = (async (req, res) => {
    await Parent.findOne({ parentNumber: req.body.parentNumber }).then(
        parent => {
            if (parent == null) {
                res.status(500).json({
                    status: "500",
                    message: 'utilisateur et / ou mot de passe incorrect'
                })
            } else {
                bcrypt.compare(req.body.codeSecurite, parent.codeSecurite)
                    .then(valid => {
                        console.log('valid');
                        if (valid == false) {
                            res.status(400).json({
                                status: "400",
                                message: 'utilisateur et / ou mot de passe incorrect'
                            })
                        } else {
                            return res.status(201).json({
                                status: "201",
                                data: parent,
                                message: 'connected'
                            })
                        }
                    })
                    .catch(error => res.json({ error }))
            }
        })
})

const getParents = ((req, res) => {
    Parent.find({}).then(item => res.send(item))
})

const getCodeParentals = (async (req,res) => {
    Child.find({ codeParental: req.body.codeParental}).then(item => res.send(item))
})

const getParent = (async (req, res) => {
    await Parent.findOne({ parentNumber: req.params.parentNumber }).then(
        item => {
            if (!item) {
                res.send("user doesn't exit")
            }
            res.send(item);
        });
})

const addChildNumber = (async (req, res) => {
    try {
        await Parent.findOne({ parentNumber: req.params.parentNumber })
            .then(
                parent => {
                    parent.childNumber.push(req.body.childNumber);
                    parent.save()
                        .then(() => res.status(201).json({ message: 'numéro parent ajouté !' }))
                        .catch(error => res.status(400).json({ error }));
                    res.send(parent)
                }
            )
            .catch(error => console.log(error))
        }
    catch (error) {
        console.log(error);
    }
})

const updateParentNumber = (async (req, res) => {
    try {
        await Parent.findOne({ _id : req.params._id })
            .then(
                parent => {
                    parent.parentNumber = req.body.parentNumber;
                    parent.save();
                    res.send(parent)
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const deleteParent = (async (req, res) => {
    const parent = await Parent.findOne({ parentNumber: req.params.parentNumber })
    await Parent.deleteOne({_id : parent._id.toString()}).then(result => res.send(result))
})

export { addChildNumber, deleteParent, getCodeParentals, getParent, getParents, signinParent, signupParent, updateParentNumber };

