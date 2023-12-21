import express from 'express';
const routerParent = express.Router()

import {
    addChildNumber,
    deleteParent,
    getParent,
    getParents,
    signinParent,
    signupParent,
    updateParentNumber
} from '../../controllers/parent/User.js';

routerParent.get('/', getParents)

routerParent.get('/:parentNumber', getParent)

routerParent.post('/signup', signupParent)
routerParent.post('/signin', signinParent)

routerParent.put('/addchildnumber/:parentNumber',addChildNumber)

routerParent.put('/:_id', updateParentNumber)

routerParent.delete('/:parentNumber', deleteParent)

export default routerParent