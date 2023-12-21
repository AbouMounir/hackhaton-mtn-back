
import Image from "../models/Image.js";


const postImage = ( async (req, res) => {
    console.log(req.path);
    try {
        const imagePath = req.path;
        
        // Enregistrez le chemin d'accès imagePath dans MongoDB
        const image = new Image({
            urlImage: imagePath
        });
        

        await image.save();

        res.send({
            message: 'Image téléchargée avec succès.',
            data: req.file.path
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                message :'Erreur lors du téléchargement de l\'image.',
                data: error
            });
    }
})

const getImage = (async (req, res) => {
    await Image.findOne({ userNumber: req.params.userNumber }).then(item => res.send(item));
})

export { getImage, postImage };


