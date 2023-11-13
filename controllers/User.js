import bcrypt from 'bcrypt';
import User from '../models/User.js';

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
                    .then(() => res.status(201).json({ message: 'User enregistré !' }))
                    .catch(error => res.status(400).json({ error }));
                console.log(user);
            })
            .catch(error => res.status(500).json({ error }))
    } catch (error) {
        console.log(error);
    }
})

const confirmPasswordUser = (async (req, res) => {
    console.log('rentré');
    try {
        await User.findOne({ userNumber: req.params.userNumber }).then(
            user => {
                console.log('trouvé')
                if (user == null) {
                    console.log('incorrect 1');
                    res.status(500).json({ message: 'mot de passe et/ou email incorrect' })
                } else {
                    console.log('commence comparaison');
                    bcrypt.compare(req.body.codeSecurite, user.codeSecurite)
                        .then(valid => {
                            console.log('valid');
                            if (valid == false) {
                                console.log('incorrect 2');
                                res.status(400).json({ message: 'mot de passe et/ou email incorrect' })
                            } else {
                                console.log('password confirmed');
                                res.status(201).json({
                                    userNumber: user.userNumber,
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


const updateUser = (async (req, res) => {
    const user = {
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userNumber: req.body.userNumber,
        codeParental: req.body.codeParental
    }
    const updateUser = await User.findOneAndUpdate({ userNumber: req.params.userNumber }, { $set: user })
    await updateUser.save()
    next();
})

const deleteUser = (async (req, res) => {
    const users = await User.findOneAndDelete({ userNumber: req.params.userNumber })
    await users.save();
    next();
})

export { addPasswordUser, confirmPasswordUser, createUser, deleteUser, getUser, getUsers, updateUser };
