import bcrypt from 'bcrypt';
import Child from '../../models/child/User.js';

const createChild = (async (req, res) => {
    try {
        const number = await Child.findOne({ childNumber: req.body.childNumber });
        if (number) {
            return res.json({ message: "Child already exists" });
        }
        const child = await new Child({
            childFirstName: req.body.childFirstName,
            childLastName: req.body.childLastName,
            childNumber: req.body.childNumber,
            codeParental: req.body.codeParental
        })
        await child.save()
        res.send(child)
    } catch (error) {
        console.log(error);
    }
})

const getChilds = ((req, res) => {
    Child.find({}).then(item => res.send(item))
})

const getChild = (async (req, res) => {
    await Child.findOne({ childNumber: req.params.childNumber }).then(
        item => {
            if (!item) {
                res.send("user doesn't exit")
            }
            res.send(item);
        })})

const connexionChild = (async (req, res) => {
    await Child.findOne({ childNumber: req.params.childNumber }).then(
        child => {
            if (child == null) {
                res.status(500).json({
                    status: "500",
                    message: 'utilisateur non trouvé'})
            } else {
                res.status(201).json({
                    status: "201",
                    child
                })
            }
        })
})

const addPasswordChild = (async (req, res) => {
    try {
        bcrypt.hash(req.body.codeSecurite, 10)
            .then(async hash => {
                const child = await Child.findOneAndUpdate(
                    { childNumber: req.params.childNumber },
                    { codeSecurite: hash },
                    { $currentDate: { lastModified: true } }
                );
                await child.save()
                    .then(() => res.status(201).json({ message: 'utilisateur enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
                console.log(child);
            })
            .catch(error => res.status(500).json({ error }))
    } catch (error) {
        console.log(error);
    }
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

const confirmPasswordChild = (async (req, res) => {
    try {
        await Child.findOne({  childNumber: req.params.childNumber }).then(
            child => {
                console.log(child)
                if (child == null) {
                    res.status(500).json({ message: 'mot de passe incorrect' })
                } else {
                    bcrypt.compare(req.body.codeSecurite, child.codeSecurite)
                        .then(valid => {
                            console.log('valid');
                            if (valid == false) {
                                res.status(400).json({
                                    status: "400",
                                    message: 'mot de passe incorrect' })
                            } else {
                                return res.status(201).json({
                                    status: "201",
                                    childNumber: req.params.childNumber,
                                    childId : child._id,
                                    message: 'password confirmed'
                                })
                            }
                        })
                        .catch(error => res.json({ error }))
                }
            })
    } catch (error) {
        console.log(error);
    }
})

const updateChildNumber = (async (req, res) => {
    try {
        await Child.findOne({ _id : req.params._id })
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
    await Child.deleteOne({_id : child._id.toString()}).then(result => res.send(result))
})

export { addParentChildNumber, addPasswordChild, confirmPasswordChild, connexionChild, createChild, deleteChild, getChild, getChilds, updateChildNumber };


/* {
"ChildNumber":"+2250584455851",
"ChildFirstName":"Fatimah",
"ChildLastName":"Oum Zeynab",
"codeParental":"596875"
} */