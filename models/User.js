import mongoose from "mongoose";

const User = mongoose.model('users', {
    userNumber: {
        type: String,
        unique: true,
        required: [true, "Your user number is required"],
    },
    userFirstName: {
        type: String,
        required: [true, "Your user firstname is required"],
    },
    userLastName: {
        type: String,
        required: [true, "Your user lastname is required"],
    },
    parentNumber: String,
    codeParental: String,
    codeSecurite: String
});

export default User ;