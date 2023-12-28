import bcrypt from 'bcrypt';
import Child from '../../models/child/User.js';

const signupChild = (async (req, res) => {
    try {
        const number = await Child.findOne({ childNumber: req.body.childNumber });
        if (number) {
            return res.json({ message: "Child already exists" });
        }
        if (req.body.codeSecurite === req.body.codeSecuriteC) {
            bcrypt.hash(req.body.codeSecurite, 10)
            .then(async hash => {
                const child = await new Child({
                    childFirstName: req.body.childFirstName,
                    childLastName: req.body.childLastName,
                    childNumber: req.body.childNumber,
                    codeParental: req.body.codeParental,
                    codeSecurite: hash,
                })
                await child.save()
                    .then(() => res.status(201).json({
                        message: 'utilisateur enregistré !',
                        data: child
                    }))
                    .catch(error => res.status(400).json({ error }));
                console.log(child);
            })
            .catch(error => res.status(500).json({ error }))
        }
    } catch (error) {
        console.log(error);
    }
})

const signinChild = (async (req, res) => {
    await Child.findOne({ childNumber: req.body.childNumber }).then(
        child => {
            if (child == null) {
                res.status(500).json({
                    status: "500",
                    message: 'utilisateur et / ou mot de passe incorrect'
                })
            } else {
                bcrypt.compare(req.body.codeSecurite, child.codeSecurite)
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
                                data: child,
                                message: 'connected'
                            })
                        }
                    })
                    .catch(error => res.json({ error }))
            }
        })
})

const confirmChildPassword = (async (req,res) => {
    try {
        await Child.findOne({ childNumber : req.params.childNumber })
            .then(
                async user => {
                    if (!user) {
                        return res.status(500).json({ message: "utilisateur n'existe pas" })
                    }
                    const valid = await bcrypt.compare(req.body.childCurrentPassword, user.childPassword)
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


const updateChildPassword = (async (req,res) => {
    try {
        await Child.findOne({ childNumber : req.params.childNumber })
            .then(
                async user => {
                    if (!user) {
                        return res.status(500).json({ message: "utilisateur n'existe pas" })
                    }
                    const valid = await bcrypt.compare(req.body.childCurrentPassword, user.childPassword)
                    if (!valid) {
                        return res.status(500).json({ message: 'mot de passe incorrect' })
                    }
                    if (req.body.childnewPassword !== req.body.childnewPasswordC) {
                        return res.status(500).json({ message: 'entrez le même mot de passe' })
                    }
                    await bcrypt.hash(req.body.childnewPassword, 10)
                        .then(hash_new => {
                            user.childPassword = hash_new
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

const getChilds = ((req, res) => {
    Child.find({}).then(item => res.send(item))
})

const getCodeParentals = (async (req,res) => {
    Child.find({ codeParental: req.body.codeParental}).then(item => res.send(item))
})

const getChild = (async (req, res) => {
    await Child.findOne({ childNumber: req.params.childNumber }).then(
        item => {
            if (!item) {
                res.send("user doesn't exit")
            }
            res.send(item);
        })
})

const addParentChildNumber = (async (req, res) => {
    try {
        const child = await Child.findOneAndUpdate(
            { childNumber: req.params.childNumber },
            { parentNumber: req.body.parentNumber },
            { $currentDate: { lastModified: true } }
        );
        await child.save()
            .then(() => res.status(201).json({ message: 'numéro parent ajouté !' }))
            .catch(error => res.status(400).json({ error }));
        console.log(child);
    }
    catch (error) {
        console.log(error);
    }
})

const updateChildNumber = (async (req, res) => {
    try {
        await Child.findOne({ _id: req.params._id })
            .then(
                child => {
                    child.childNumber = req.body.childNumber;
                    child.save();
                    res.send(child)
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const deleteChild = (async (req, res) => {
    const child = await Child.findOne({ childNumber: req.params.childNumber })
    await Child.deleteOne({ _id: child._id.toString() }).then(result => res.send(result))
})

export { addParentChildNumber, confirmChildPassword, deleteChild, getChild, getChilds, getCodeParentals, signinChild, signupChild, updateChildNumber, updateChildPassword };

