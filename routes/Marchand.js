import express from 'express';
const routerMarchand = express.Router()

import {
    createMarchand,
    deleteMarchand,
    getMarchand,
    getMarchands,
    updateMarchand,
} from '../controllers/Marchand.js';

routerMarchand.get('/', getMarchands)

routerMarchand.get('/:marchandContact', getMarchand)

routerMarchand.put('/:marchandContact', updateMarchand)

routerMarchand.post('/', createMarchand)

routerMarchand.delete('/:marchandContact', deleteMarchand)


export default routerMarchand