import express from 'express';
const routerParent = express.Router()

import {
    addChildNumber,
    confirmParentPassword,
    deleteParent,
    getCodeParentals,
    getParent,
    getParents,
    signinParent,
    signupParent,
    updateCodeParental,
    updateParentNumber,
    updateParentPassword
} from '../../controllers/parent/User.js';

routerParent.get('/', getParents)
routerParent.get('/:parentNumber', getParent)
routerParent.get('/codeparental', getCodeParentals)

routerParent.post('/signup', signupParent)
routerParent.post('/signin', signinParent)
routerParent.post('/confirm/password', confirmParentPassword)

routerParent.put('/addchildnumber/:parentNumber',addChildNumber)
routerParent.put(('/update-password/:parentNumber'), updateParentPassword)
routerParent.put(('/update-codeparental/:parentNumber'), updateCodeParental)
routerParent.put('/:_id', updateParentNumber)

routerParent.delete('/:parentNumber', deleteParent)

export default routerParent