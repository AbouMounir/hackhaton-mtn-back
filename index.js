//npm install -g firebase-tools

import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import fs from 'fs';
import multer from "multer";
import os from "os";
import path from 'path';
import connectDb from "./database/db.js";
import Child from "./models/child/User.js";
import Parent from "./models/parent/User.js";
import routerMarchand from "./routes/Marchand.js";
import routerTransaction from "./routes/Transaction.js";
import router from "./routes/api_mtn.js";
import routerChild from "./routes/child/User.js";
import routerParent from "./routes/parent/User.js";

const app = express();


const uploadDir = path.join(os.tmpdir(), 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/* app.use('/upload', express.static(path.join(__dirname, 'uploads')));*/

app.put('/upload', upload.single('image'), async (req, res) => {
    
    try {
        const imagePath = req.file.path;
        console.log(req.body.user);
        if (req.body.user === "child") {
            console.log(req.body.number);
            const child = await Child.findOneAndUpdate(
                { childNumber: req.body.number },
                { urlImage: imagePath },
                { $currentDate: { lastModified: true }}
            )
            await child.save()
                .then((item) => res.status(201).json({
                    message: 'Child : Image téléchargée avec succès.',
                    data: item
                }))
                .catch(error => res.status(400).json({ error }));
            console.log(child);
        } else {
            console.log(req.body.number);
            const parent = await Parent.findOneAndUpdate(
                { parentNumber: req.body.number },
                { urlImage: imagePath },
                { $currentDate: { lastModified: true }}
            )
            await parent.save()
                .then((item) => res.status(201).json({
                    message: 'Parent : Image téléchargée avec succès.',
                    data: item
                }))
                .catch(error => res.status(400).json({ error }));
            console.log(parent);
        }
        } catch (error) {
            console.log(error);
            res.status(500).send(
                {
                    message :'Erreur lors du téléchargement de l\'image.',
                    data: error
                });
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

