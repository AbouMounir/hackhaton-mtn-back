import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// Generate a random UUID
const random_uuid = uuidv4();


const X_Reference_Id = random_uuid;
const primaryKey = '780bc30e8b1a477f8c73e4a5f084fe18';
let access_token = '';
let apikey = '';
var encodedToken = '';

// les url pour l api de mtn
const url = 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser';
const url_api = `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${X_Reference_Id}/apikey`
const url_token = 'https://sandbox.momodeveloper.mtn.com/collection/token/';
const url_pay = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay'


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

// Communiquer avec l api mtn en sandbox
const apiMTNpay = ( async (req, res,montant,number) => {

    const data_pay = {
        "amount": montant,
        "currency": "EUR",
        "externalId": "1234",
        "payer": {
            "partyIdType": "MSISDN",
            "partyId": number
        },
        "payerMessage": "Loyer octobre",
        "payeeNote": "Bien reçu"
    }
    try {
        let status_requesttopay;
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
            .then(res => status_requesttopay = res.status);
        return status_requesttopay;
    } catch (error) {
        console.log(error);
    }
})

export default apiMTNpay;


