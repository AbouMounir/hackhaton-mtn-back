import bcrypt from 'bcrypt';
import Parent from '../../models/parent/User.js';

const createParent = (async (req, res) => {
    try {
        const number = await Parent.findOne({ parentNumber: req.body.parentNumber });
        if (number) {
            return res.json({ message: "Parent already exists" });
        }
        const parent = await new Parent({
            parentFirstName: req.body.parentFirstName,
            parentLastName: req.body.parentLastName,
            parentNumber: req.body.parentNumber,
            codeParental: req.body.codeParental
        })
        await parent.save()
        res.send(parent)
    } catch (error) {
        console.log(error);
    }
})

const getParents = ((req, res) => {
    Parent.find({}).then(item => res.send(item))
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

const connexionParent = (async (req, res) => {
    await Parent.findOne({ parentNumber: req.params.parentNumber }).then(
        parent => {
            if (parent == null) {
                res.status(500).json({message: 'utilisateur non trouvé'})
            } else {
                res.status(201).json({
                    parent
                })
            }
        })
})

const addPasswordParent = (async (req, res) => {
    try {
        bcrypt.hash(req.body.codeSecurite, 10)
            .then(async hash => {
                const parent = await Parent.findOneAndUpdate(
                    { parentNumber: req.params.parentNumber },
                    { codeSecurite: hash },
                    { $currentDate: { lastModified: true } }
                );
                await parent.save()
                    .then(() => res.status(201).json({ message: 'utilisateur enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
                console.log(parent);
            })
            .catch(error => res.status(500).json({ error }))
    } catch (error) {
        console.log(error);
    }
})

const addChildNumber = (async (req, res) => {
    try {
        await Parent.findOne({ parentNumber: req.params.parentNumber })
            .then(
                parent => {
                    console.log(parent.childNumber);
                    console.log(req.body.childNumber);
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

/* const deleteChildNumber = (async (req, res) => {
    try {
        await Parent.findOne({ parentNumber: req.params.parentNumber })
            .then(
                parent => {
                    console.log(parent.childNumber);
                    console.log(req.body.childNumber);
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
}) */

const confirmPasswordParent = (async (req, res) => {
    try {
        await Parent.findOne({  parentNumber: req.params.parentNumber }).then(
            parent => {
                console.log(parent)
                if (parent == null) {
                    res.status(500).json({
                        message: 'mot de passe incorrect' })
                } else {
                    bcrypt.compare(req.body.codeSecurite, parent.codeSecurite)
                        .then(valid => {
                            console.log('valid');
                            if (valid == false) {
                                res.status(400).json({
                                    status: "400",
                                    message: 'mot de passe incorrect' })
                            } else {
                                return res.status(201).json({
                                    status: "201",
                                    data: parent,
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

export { addChildNumber, addPasswordParent, confirmPasswordParent, connexionParent, createParent, deleteParent, getParent, getParents, updateParentNumber };


/* {
"ParentNumber":"+2250584455851",
"ParentFirstName":"Fatimah",
"ParentLastName":"Oum Zeynab",
"codeParental":"596875"
} */

/* const parent = await Parent.findOneAndUpdate(
        { parentNumber: req.params.parentNumber },
        { childNumber: req.body.childNumber },
        { $currentDate: { lastModified: true } }
    );
    await parent.save()
        .then(() => res.status(201).json({ message: 'numéro parent ajouté !' }))
        .catch(error => res.status(400).json({ error }));
    console.log(parent);
 */