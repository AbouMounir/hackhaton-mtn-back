import express from 'express';
const routerTransaction = express.Router()

import {
    createTransaction,
    deleteTransaction,
    getTransaction,
    getTransactions,
    updateTransaction,
    verificationCode
} from '../controllers/Transaction.js';

routerTransaction.get('/', getTransactions)

routerTransaction.get('/:TransactionID', getTransaction)

routerTransaction.post('/', createTransaction)

routerTransaction.post('/:TransactionID',verificationCode)

routerTransaction.put('/:TransactionID', updateTransaction)

routerTransaction.delete('/:TransactionID', deleteTransaction)

export default routerTransaction