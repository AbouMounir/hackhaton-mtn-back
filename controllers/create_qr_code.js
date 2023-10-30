import qr from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

// Generate a random UUID
const random_uuid = uuidv4();
let qr_code;
let data = {
    "storeId" : random_uuid,
    "marchandFirstName" : "KROUMA",
    "marchandLastName": "MAMADOU",
    "storeName": "PROPAY",
    "marchandContact": "225458589658",
}

let stJson = JSON.stringify(data)

qr.toDataURL(stJson,(err,code) => {
    if (err) {
        console.log(err);
    }
    console.log(code);
    data['codeQrMarchandURL'] = code
})

export default qr_code;