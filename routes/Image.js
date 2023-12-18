import express from 'express';
const routerImage = express.Router()

import {
    getImage,
    postImage
} from '../controllers/Image.js';


routerImage.get('/:userNumber', getImage)

routerImage.post('/:userNumber', postImage)


export default routerImage