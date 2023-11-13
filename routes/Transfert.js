import express from 'express';
const routerTransfert = express.Router()

import {
    createAndMakeTransfert,
    getTransfert,
    getTransferts,
} from '../controllers/Transfert.js';

routerTransfert.get('/', getTransferts)

routerTransfert.get('/:userNumber', getTransfert)

routerTransfert.post('/:userNumber', createAndMakeTransfert)


export default routerTransfert