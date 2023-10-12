import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import connectDb from "./database/db.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//app.use("/api/v1", routerUtilisateurs);


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on " + process.env.PORT);
})

dotenv.config({ path: './config/.env' })
connectDb();


