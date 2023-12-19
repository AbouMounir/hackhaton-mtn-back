//npm install -g firebase-tools

import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import connectDb from "./database/db.js";
import Image from "./models/Image.js";
import routerMarchand from "./routes/Marchand.js";
import routerTransaction from "./routes/Transaction.js";
import router from "./routes/api_mtn.js";
import routerChild from "./routes/child/User.js";
import routerParent from "./routes/parent/User.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        // Enregistrez le chemin d'accès imagePath dans MongoDB
        const image = new Image({
            urlImage: imagePath
        });

        await image.save();

        res.send('Image téléchargée avec succès.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors du téléchargement de l\'image.');
    }
});

app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})

dotenv.config({ path: './config/.env' })
connectDb();


app.use('/', router)
app.use('/users/childs', routerChild)
app.use('/users/parents', routerParent)
app.use('/apipay', routerTransaction)
app.use('/marchands', routerMarchand)

