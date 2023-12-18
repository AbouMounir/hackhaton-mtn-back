import Notification from "../models/Notification.js";

const createNotification = (async (req, res) => {
    try {
        const notification = await new Notification({
            notiTitle: req.body.notiTitle,
            notiContent : req.body.notiContent,
        })
        await notification.save()
        res.send(notification);
    } catch (error) {
        console.log(error);
    }
})

const getNotification = (async (req, res) => {
    await Notification.findOne({ _id: req.params.id }).then(item => res.send(item));
})

const getNotifications = (async (req, res) => {
    await Notification.findOne({ }).then(item => res.send(item));
})

const deleteNotification = (async (req, res) => {
    await Notification.findOneAndDelete({ _id: req.params.id }).then(item => res.send(item));
})
export { createNotification, deleteNotification, getNotification, getNotifications };


