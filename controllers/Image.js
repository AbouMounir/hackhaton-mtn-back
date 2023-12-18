import Image from "../models/Image.js";
import {encode, decode} from 'node-base64-image';

const postImage = (async (req, res) => {

    const url = req.body.urlImage
    
    try {
        const image = await new Image({
            userNumber: req.body.userNumber,
            urlImage: req.body.urlImage
        })
        await image.save()
        res.send(image);
    } catch (error) {
        console.log(error);
    }
})

const getImage = (async (req, res) => {
    await Image.findOne({ userNumber: req.params.userNumber }).then(item => res.send(item));
})

export { getImage, postImage };


