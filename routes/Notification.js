import express from 'express';
const routerNotification = express.Router()

import {
    createNotification,
    deleteNotification,
    getNotification,
    getNotifications
} from '../controllers/Notification.js';

routerNotification.get('/', getNotifications)

routerNotification.get('/:id', getNotification)

routerNotification.post('/', createNotification)

routerNotification.delete('/id', deleteNotification)


export default routerNotification