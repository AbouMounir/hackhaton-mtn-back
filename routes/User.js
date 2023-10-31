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

routerUser.post('/add/:userNumber',addPasswordUser)
routerUser.post('/confirm/:userNumber',confirmPasswordUser)

routerUser.put('/:userNumber', updateUser)

routerUser.delete('/:userNumber', deleteUser)

export default routerUser