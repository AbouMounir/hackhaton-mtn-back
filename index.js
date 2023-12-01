//npm install -g firebase-tools

import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import connectDb from "./database/db.js";
import routerMarchand from "./routes/Marchand.js";
import routerTransaction from "./routes/Transaction.js";
import router from "./routes/api_mtn.js";
import routerChild from "./routes/child/User.js";
import routerParent from "./routes/parent/User.js";

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

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
app.use('/marchands',routerMarchand)
