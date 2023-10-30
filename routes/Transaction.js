import express from 'express';
const routerTransaction = express.Router()

import {
    createAndMakeTransaction,
    getTransaction,
    getTransactions,
} from '../controllers/Transaction.js';

routerTransaction.get('/', getTransactions)

routerTransaction.get('/:userNumber', getTransaction)

routerTransaction.post('/:userNumber', createAndMakeTransaction)


export default routerTransaction