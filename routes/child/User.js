import express from 'express';
const routerChild = express.Router()

import {
    addParentChildNumber,
    addPasswordChild,
    confirmPasswordChild,
    connexionChild,
    createChild,
    deleteChild,
    getChild,
    getChilds,
    updateChildNumber
} from '../../controllers/child/User.js';

routerChild.get('/', getChilds)

routerChild.get('/:childNumber', getChild)

routerChild.post('/', createChild)
routerChild.get('/connexion/:childNumber',connexionChild)

routerChild.put('/addpassword/:childNumber',addPasswordChild)
routerChild.put('/addparentnumber/:childNumber',addParentChildNumber)
routerChild.post('/confirm/:childNumber',confirmPasswordChild)

routerChild.put('/:_id', updateChildNumber)

routerChild.delete('/:childNumber', deleteChild)

export default routerChild