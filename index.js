//npm install -g firebase-tools

import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import connectDb from "./database/db.js";
import routerTransaction from "./routes/Transaction.js";
import routerUser from "./routes/User.js";
import router from "./routes/api_mtn.js";

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})

dotenv.config({ path: './config/.env' })
connectDb();


app.use('/', router)
app.use('/users/', routerUser)
app.use('/apipay', routerTransaction)
