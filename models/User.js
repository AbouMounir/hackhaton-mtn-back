import mongoose from "mongoose";

const User = mongoose.model('users', {
    userFirstName: String,
    userLastName: String,
    userNumber: String,
    codeParental: String,
    codeSecurite: String
});

export default User ;