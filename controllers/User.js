import bcrypt from 'bcrypt';
import User from '../models/child/User.js';

const createUser = (async (req, res) => {
    try {
        const number = await User.findOne({ userNumber: req.body.userNumber });
        if (number) {
            return res.json({ message: "User already exists" });
        }
        const user = await new User({
            userFirstName: req.body.userFirstName,
            userLastName: req.body.userLastName,
            userNumber: req.body.userNumber,
            codeParental: req.body.codeParental
        })
        await user.save()
        res.send(user)
    } catch (error) {
        console.log(error);
    }
})

const getUsers = ((req, res) => {
    User.find({}).then(item => res.send(item))
})

const getUser = (async (req, res) => {
    await User.findOne({ userNumber: req.params.userNumber }).then(item => res.send(item));
})

const connexionUser = (async (req, res) => {
    await User.findOne({ userNumber: req.params.userNumber }).then(
        user => {
            if (user == null) {
                res.status(500).json({message: 'utilisateur non trouvé'})
            } else {
                res.status(201).json({
                    user
                })
            }
        })
})

const addPasswordUser = (async (req, res) => {
    try {
        bcrypt.hash(req.body.codeSecurite, 10)
            .then(async hash => {
                const user = await User.findOneAndUpdate(
                    { userNumber: req.params.userNumber },
                    { codeSecurite: hash },
                    { $currentDate: { lastModified: true } }
                );
                await user.save()
                    .then(() => res.status(201).json({ message: 'utilisateur enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
                console.log(user);
            })
            .catch(error => res.status(500).json({ error }))
    } catch (error) {
        console.log(error);
    }
})

const addParentNumber = (async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { userNumber: req.params.userNumber },
            { parentNumber: req.body.parentNumber },
            { $currentDate: { lastModified: true } }
        );
        await user.save()
            .then(() => res.status(201).json({ message: 'numéro parent ajouté !' }))
            .catch(error => res.status(400).json({ error }));
        console.log(user);
        }
    catch (error) {
        console.log(error);
    }
})

const confirmPasswordUser = (async (req, res) => {
    try {
        await User.findOne({ userNumber: req.params.userNumber }).then(
            user => {
                console.log(user)
                if (user == null) {
                    res.status(500).json({ message: 'mot de passe incorrect' })
                } else {
                    bcrypt.compare(req.body.codeSecurite, user.codeSecurite)
                        .then(valid => {
                            console.log('valid');
                            if (valid == false) {
                                res.status(400).json({ message: 'mot de passe incorrect' })
                            } else {
                                return res.status(201).json({
                                    userNumber: user.userNumber,
                                    userId : user._id,
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


const updateUserNumber = (async (req, res) => {
    try {
        await User.findOne({ _id : req.params._id })
            .then(
                user => {
                    user.userNumber = req.body.userNumber;
                    user.save();
                    res.send(user)
                }
            )
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
})

const deleteUser = (async (req, res) => {
    const user = await User.findOne({ userNumber: req.params.userNumber })
    await User.deleteOne({_id : user._id.toString()}).then(result => res.send(result))
})

export { addParentNumber, addPasswordUser, confirmPasswordUser, connexionUser, createUser, deleteUser, getUser, getUsers, updateUserNumber };


/* {
"userNumber":"+2250584455851",
"userFirstName":"Fatimah",
"userLastName":"Oum Zeynab",
"codeParental":"596875"
} */