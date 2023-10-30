import express from 'express';

const scanner = express.Router();

scanner.post('/createqr', createQr)