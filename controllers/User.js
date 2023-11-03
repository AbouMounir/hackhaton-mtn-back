import User from '../models/User.js';

const createUser = (async (req, res) => {
    try {
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
        const user = await User.findOneAndUpdate({ userNumber: req.params.userNumber }, { codeSecurite: req.body.codeSecurite }, { $currentDate: { lastModified: true } });
        await user.save()
        res.send(user)
    } catch (error) {
        console.log(error);
    }
})

const confirmPasswordUser = (async (req, res) => {
    try {
        await User.findOne({ userNumber: req.params.userNumber }).then(
            item => {
                if (item == null) {
                    res.status(500).json({ message: 'mot de passe et/ou email incorrect' })

                } else {
                    if (item.codeSecurite !== req.body.codeSecurite) {
                        res.status(400).json({ message: 'mot de passe et/ou email incorrect' })
                        res.send(true);
                    } else {
                        res.status(201).json({
                            userNumber: item.userNumber,
                            })
                        }
                    }
                })
        /* const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, user.userNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                console.log(error);
            });
        console.log('identique'); */
    } catch (error) {
    console.log(error);
}})


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

