import axios from "axios";
import express from "express";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/User.js";

// Generate a random UUID
const random_uuid = uuidv4();


const X_Reference_Id = random_uuid;
const primaryKey = '780bc30e8b1a477f8c73e4a5f084fe18';
let access_token = '';
let apikey = '';
var encodedToken = '';

// pour les differents routes
const router = express.Router();


// les url pour l api de mtn
const url = 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser';
const url_api = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${X_Reference_Id}/apikey`
const url_token = 'https://sandbox.momodeveloper.mtn.com/collection/token/';
const url_pay = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay'

const data_pay = {
    "amount": "1000",
    "currency": "EUR",
    "externalId": "1234",
    "payer": {
        "partyIdType": "MSISDN",
        "partyId": "22584455859"
    },
    "payerMessage": "Loyer octobre",
    "payeeNote": "Bien reçu"
}

const data = {
    providerCallbackHost: "string"
};

const config = {
    headers: {
        'Ocp-Apim-Subscription-Key': primaryKey,
    },
    params: {
        'X-Reference-Id': random_uuid
    }
};

router.get(('/'), (req, res) => {
    User.find({}).then(item => res.send(item))
});

// Communiquer avec l api mtn en sandbox
router.post('/users', async (req, res) => {
    try {
        await axios.post(url,data, {
            headers: {
            'Ocp-Apim-Subscription-Key': primaryKey,
            'X-Reference-Id': random_uuid
        }},)
            .then(res => console.log(res.status));

        await axios.post(url_api, {}, config)
            .then(res => apikey = res.data);

        const token = `${X_Reference_Id}:${apikey['apiKey']}`;
        encodedToken = Buffer.from(token).toString('base64');

        await axios.post(url_token, {}, {
            headers: {
                'Ocp-Apim-Subscription-Key': primaryKey,
                'Authorization': `Basic ${encodedToken}`
            }
        })
            .then(res => access_token = res.data['access_token']);

        await axios.post(url_pay, data_pay, {
            headers: {
                'X-Reference-Id': random_uuid,
                'X-Target-Environment': 'sandbox',
                'Ocp-Apim-Subscription-Key': primaryKey,
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(res => console.log(res.status));

        /* const user = new User({
            userName: req.body.userName,
            code: req.body.code,
            numberName: req.body.numberName,
        })
        user.save() */
    } catch (error) {
        console.log(error);
    }
})

export default router;


/*

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