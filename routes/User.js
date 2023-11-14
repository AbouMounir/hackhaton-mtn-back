import express from 'express';
const routerUser = express.Router()

import {
    addPasswordUser,
    confirmPasswordUser,
    connexionUser,
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUserNumber
} from '../controllers/User.js';

routerUser.get('/', getUsers)

routerUser.get('/:userNumber', getUser)

routerUser.post('/', createUser)
routerUser.get('/connexion/:userNumber',connexionUser)

routerUser.put('/addpassword/:userNumber',addPasswordUser)
routerUser.post('/confirm/:userNumber',confirmPasswordUser)

routerUser.put('/:_id', updateUserNumber)

routerUser.delete('/:userNumber', deleteUser)

export default routerUser