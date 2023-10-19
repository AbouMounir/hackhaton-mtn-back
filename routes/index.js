import axios from "axios";
import express from "express";
import User from "../models/User.js";

const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImRkYjUxMjVmLWI3NmQtNGUxNi1iMTU3LWVjNDljOTRlNjg5YyIsImV4cGlyZXMiOiIyMDIzLTEwLTE2VDE0OjQ4OjA5LjU3MyIsInNlc3Npb25JZCI6ImYxODY3OGMxLTVjODUtNDAwNy1hMjdjLTIzOTgwZDY3MWFhZiJ9.SMEjYsMALa7_Oylso3SGb4nmfYLAdSHNuo7A3D2ozfI2O1ZbAWsWj5WOonZcTefTZ1kIRj4sxLr--nko9x-4WZhnSLhGTZgdQfBjs3ZFR4Y4EsLb1x_6jAJvpm9ChSNlCParKymdTx2B46AnkGbM2hJbnBy99HF--Wfgn9qA1oN-Q64Wfq_Ihz6G8mAg6sOnaqDvRjK9fnyV3OopOyvn0CFd-Q7aY2pRCgueHcDbShJnvnZTEqvxw6rjP6Gx-DvHl8xLZdTAAkIhcAe4a1O5cTEWFL3sNGac6ZVjFNh0MpUSZ3ugr7dKexM37CVSATXH5d61hKd8cHlul7KMPyL6wA";

const router = express.Router();

try {
	const url = 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser';
    const data = {
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

    const data1 = {
        providerCallbackHost: "string"
    }

	// Specifying headers in the config object
	const config = {
        'Ocp-Apim-Subscription-Key': '780bc30e8b1a477f8c73e4a5f084fe18',
        'X-Reference-Id': '235f96bf-cbeb-4b9f-92fb-1bad639b4953',
    }

    router.post('/api_hackathon',async (req, res) => {
        const response = await axios.post(url,data1, config);
    })

	console.log(response.data);
} catch (error) {
	console.error(error);
}

router.get(('/'), (req, res) => {
    User.find({}).then(item => res.send(item))
});


router.post('/users', (req, res) => {
    try {
        const user = new User({
            userName: req.body.userName,
            code: req.body.code,
            numberName: req.body.numberName,
        })
        user.save()
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