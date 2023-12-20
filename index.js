//npm install -g firebase-tools


import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import fs from 'fs';
import multer from "multer";
import os from 'os';
import path from "path";
import connectDb from "./database/db.js";
import Image from "./models/Image.js";
import routerMarchand from "./routes/Marchand.js";
import routerTransaction from "./routes/Transaction.js";
import router from "./routes/api_mtn.js";
import routerChild from "./routes/child/User.js";
import routerParent from "./routes/parent/User.js";

const app = express();

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); */

/* const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },

    region: process.env.AWS_REGION,

    // The transformation for endpoint is not implemented.
    // Refer to UPGRADING.md on aws-sdk-js-v3 for changes needed.
    // Please create/upvote feature request on aws-sdk-js-codemod for endpoint.
    endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`
});


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
}); */

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); */
/* app.use(cors({
    origin: ["https://hackhaton-mtn-back.vercel.app/"],
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true
})); */

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

