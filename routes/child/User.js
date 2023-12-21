import express from 'express';
const routerChild = express.Router()

import {
    addParentChildNumber,
    deleteChild,
    getChild,
    getChilds,
    signinChild,
    signupChild,
    updateChildNumber
} from '../../controllers/child/User.js';

routerChild.get('/', getChilds)
routerChild.get('/:childNumber', getChild)
routerChild.post('/signup', signupChild)
routerChild.post('/signin', signinChild)
routerChild.put('/addparentnumber/:childNumber',addParentChildNumber)
routerChild.put('/:_id', updateChildNumber)
routerChild.delete('/:childNumber', deleteChild)

export default routerChild