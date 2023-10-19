import mongoose from "mongoose";


const User = mongoose.model('users', {
    userName: String,
    code: String,
    numberName: String,
});

export default User ;