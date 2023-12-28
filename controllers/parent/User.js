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
                console.log(hash);
                bcrypt.hash(req.body.codeParental, 10)
                .then(async hash2 => {
                    console.log(hash2);
                    const parent = await new Parent({
                        parentFirstName: req.body.parentFirstName,
                        parentLastName: req.body.parentLastName,
                        parentNumber: req.body.parentNumber,
                        codeParental: hash2,
                        codeSecurite: hash,
                    })
                    console.log(parent);
                    await parent.save()
                    .then(() => res.status(201).json({
                        message: 'utilisateur enregistré !',
                        data: parent
                    }))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }))
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


const confirmParentPassword = (async (req,res) => {
    try {
        await Parent.findOne({ childNumber : req.params.childNumber })
            .then(
                async user => {
                    if (!user) {
                        return res.status(500).json({ message: "utilisateur n'existe pas" })
                    }
                    const valid = await bcrypt.compare(req.body.codeSecurite, user.codeSecurite)
                    if (!valid) {
                        return res.status(500).json({ message: 'mot de passe incorrect' })
                    }
                    return res.status(201).json({ message: 'mot de passe correct' })
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const updateParentPassword = (async (req,res) => {
    try {
        await Parent.findOne({ parentNumber : req.params.parentNumber })
            .then(
                async user => {
                    const valid = await bcrypt.compare(req.body.codeSecurite, user.codeSecurite)
                    if (!valid) {
                        return res.status(500).json({ message: 'mot de passe incorrect' })
                    }
                    if (req.body.codeSecurite !== req.body.codeSecuriteC) {
                        return res.status(500).json({ message: 'mot de passe non identique' })
                    }
                    await bcrypt.hash(req.body.codeSecurite, 10)
                        .then(hash_new => {
                            user.codeSecurite = hash_new
                            user.save();
                            res.send(user)
                        })
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const updateCodeParental = (async (req,res) => {
    try {
        await Parent.findOne({ parentNumber : req.params.parentNumber })
            .then(
                async user => {
                    console.log();
                    const valid = await bcrypt.compare(req.body.parentCurrentCodeParental, user.codeParental)
                    if (!valid) {
                        return res.status(500).json({ message: 'mot de passe incorrect' })
                    }
                    if (req.body.parentnewCodeParental !== req.body.parentnewCodeParentalC) {
                        return res.status(500).json({ message: 'mot de passe non identique' })
                    }
                    await bcrypt.hash(req.body.parentnewCodeParental, 10)
                        .then(hash_new => {
                            user.codeParental = hash_new
                            user.save();
                            res.send(user)
                        })
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
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

export { addChildNumber, confirmParentPassword, deleteParent, getCodeParentals, getParent, getParents, signinParent, signupParent, updateCodeParental, updateParentNumber, updateParentPassword };

