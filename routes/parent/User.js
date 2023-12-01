import express from 'express';
const routerParent = express.Router()

import {
    addChildNumber,
    addPasswordParent,
    confirmPasswordParent,
    connexionParent,
    createParent,
    deleteParent,
    getParent,
    getParents,
    updateParentNumber
} from '../../controllers/parent/User.js';

routerParent.get('/', getParents)

routerParent.get('/:parentNumber', getParent)

routerParent.post('/', createParent)
routerParent.get('/connexion/:parentNumber',connexionParent)

routerParent.put('/addpassword/:parentNumber',addPasswordParent)
routerParent.put('/addchildnumber/:parentNumber',addChildNumber)
routerParent.post('/confirm/:parentNumber',confirmPasswordParent)

routerParent.put('/:_id', updateParentNumber)

routerParent.delete('/:parentNumber', deleteParent)

export default routerParent