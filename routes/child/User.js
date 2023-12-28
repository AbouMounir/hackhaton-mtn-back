import express from 'express';
const routerChild = express.Router()

import {
    addParentChildNumber,
    confirmChildPassword,
    deleteChild,
    getChild,
    getChilds,
    getCodeParentals,
    signinChild,
    signupChild,
    updateChildNumber,
    updateChildPassword
} from '../../controllers/child/User.js';

routerChild.get('/', getChilds)
routerChild.get('/:childNumber', getChild)
routerChild.get('/codeparental', getCodeParentals)
routerChild.post('/signup', signupChild)
routerChild.post('/signin', signinChild)
routerChild.post('/confirm/password/:childNumber', confirmChildPassword)
routerChild.post('/get-codeparental', getCodeParentals)
routerChild.put('/addparentnumber/:childNumber',addParentChildNumber)
routerChild.put('/:_id', updateChildNumber)
routerChild.put(('/update-password/:childNumber'), updateChildPassword)
routerChild.delete('/:childNumber', deleteChild)

export default routerChild