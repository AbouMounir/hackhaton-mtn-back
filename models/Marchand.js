import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// Generate a random UUID
const random_uuid = uuidv4();

const Marchand = mongoose.model('marchands', {
    storeId : {
        type: 'UUID',
        default: random_uuid
    },
    marchandFirstName : String,
    marchandLastName : String,
    storeName: String,
    marchandContact: String,
    codeQrMarchand: String
});

export default Marchand ;