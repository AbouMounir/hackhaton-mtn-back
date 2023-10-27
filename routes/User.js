import express from 'express';
const routerUser = express.Router()

import {
    addPasswordUser,
    confirmPasswordUser,
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from '../controllers/User.js';

routerUser.get('/', getUsers)

routerUser.get('/:userNumber', getUser)

routerUser.post('/', createUser)

routerUser.post('/add/:userID',addPasswordUser)
routerUser.post('/confirm/:userID',confirmPasswordUser)

routerUser.put('/:userID', updateUser)

routerUser.delete('/:userID', deleteUser)

export default routerUser