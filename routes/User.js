import express from 'express';
const routerUser = express.Router()

import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    verificationCode
} from '../controllers/User.js';

routerUser.get('/', getUsers)

routerUser.get('/:userID', getUser)

routerUser.post('/', createUser)

routerUser.post('/:userID',verificationCode)

routerUser.put('/:userID', updateUser)

routerUser.delete('/:userID', deleteUser)

export default routerUser