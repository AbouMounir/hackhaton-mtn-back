import TextFlow from 'textflow.js';
import User from '../models/User.js';

TextFlow.useKey("Tm6sFLbORJ6yOuVgA7NkwS9ErSmBeAmDjR476hML9Q49vxB9k938Yyei7J9zdkc9");

const getUsers = ((req, res) => {
    User.find({}).then(item => res.send(item))
})

const getUser = (async (req, res) => {
    await User.findOne({ _id: req.params.id }).then(item => res.send(item));
})

const createUser = (async (req, res) => {
    const user = await new User({
        userFirstName: req.body.FirstName,
        userLastName: req.body.LastName,
        userNumber: req.body.number,
        codeSecurite: req.body.code
    })
    user.save()
    
    const verificationOptions ={
        service_name: 'MTN hackathon app',
        seconds: 600,
    }
    const result = await TextFlow.sendVerificationSMS(req.body.number, verificationOptions);
    return res.status(result.status).json(result.message)
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

const verificationCode = ( async (req,res) => {

    const phone_number = await User.findOne({_id: req.params.id})
    const {code} = req.body;
    let result = await TextFlow.verifyCode(phone_number, code);
    if(result.valid)
    {
        // your server logic
        return res.status(200).json(result.message)
    }
    return res.status(result.status).json(result.message)
        
})

export { createUser, deleteUser, getUser, getUsers, updateUser, verificationCode };


/*
router.get(('/'), (req, res) => {
    User.find({}).then(item => res.send(item))
});

router.get(('/users'), (req, res) => {
    User.find({}).then(item => res.send(item))
});
router.post(('/api_hackathon/users/add'), (req, res) => {
    const user = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        age: req.body.age
    })
    user.save()
});


router.put(('/api_hackathon/users/edit/:id'), async (req, res, next) => {
    const user = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        age: req.body.age
    }
    const nn = await User.findOneAndUpdate({ _id: req.params.id }, { $set: user })
    await nn.save();
    next();
});
router.delete(('/api_hackathon/users/delete/:id'), async (req, res, next) => {
    const nnn = await User.findOneAndDelete({ _id: req.params.id })
    await nnn.save();
    next();
}) */