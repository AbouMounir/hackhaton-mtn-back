import mongoose from "mongoose";

const Child = mongoose.model('Childs', {
    childNumber: {
        type: String,
        unique: true,
        required: [true, "Your Child number is required"],
    },
    childFirstName: {
        type: String,
        required: [true, "Your Child firstname is required"],
    },
    childLastName: {
        type: String,
        required: [true, "Your Child lastname is required"],
    },
    parentNumber: String,
    codeParental: String,
    codeSecurite: String
});

export default Child ;