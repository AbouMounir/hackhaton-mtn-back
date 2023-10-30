import express from 'express';
import apiMTNpay from "../controllers/api_mtn.js";
const routerAPI = express.Router();

// Communiquer avec l api mtn en sandbox
routerAPI.post('/api', apiMTNpay)


export default routerAPI;


