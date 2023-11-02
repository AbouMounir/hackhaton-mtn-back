import { signInWithPhoneNumber } from 'firebase/auth';
import auth from '../firebase.config.js';
import User from '../models/User.js';

const createUser = (async (req, res) => {
    try {
        const user = await new User({
            userFirstName: req.body.FirstName,
            userLastName: req.body.LastName,
            userNumber: req.body.number,
            codeParental: req.body.code
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
    await User.findOne({ userNumber: req.params.userNumber}).then(item => res.send(item));
})

const addPasswordUser = (async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userID }, { codeSecurite: req.body.codeSecurite }, { $currentDate: { lastModified: true } });
        await user.save()
        console.log(req.body.codeSecurite);
    } catch (error) {
        console.log(error);
    }
})

const confirmPasswordUser = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userID });
        if (user.codeSecurite !== req.body.codeSecurite) {
            console.log('mot de passe non identique');
        }
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, user.userNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                console.log(error);
            });
        console.log('identique');
    } catch (error) {
        console.log(error);
    }
})

const updateUser = (async (req, res) => {
    const user = {
        userFirstName: req.body.FirstName,
        userLastName: req.body.LastName,
        userNumber: req.body.number,
        codeSecurite: req.body.code
    }
    const updateUser = await User.findOneAndUpdate({ _id: req.params.id }, { $set: user })
    await updateUser.save()
    next();
})

const deleteUser = (async (req, res) => {
    const users = await User.findOneAndDelete({ _id: req.params.id })
    await users.save();
    next();
})

export { addPasswordUser, confirmPasswordUser, createUser, deleteUser, getUser, getUsers, updateUser };

