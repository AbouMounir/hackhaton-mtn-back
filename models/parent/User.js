import mongoose from "mongoose";

const Parent = mongoose.model('parents', {
    parentNumber: {
        type: String,
        unique: true,
        required: [true, "Your Parent number is required"],
    },
    parentFirstName: {
        type: String,
        required: [true, "Your Parent firstname is required"],
    },
    parentLastName: {
        type: String,
        required: [true, "Your Parent lastname is required"],
    },
    codeSecurite: {
        type: String,
        required: [true, "Your code is required"]
    },
    codeParental: {
        type: String,
    },
    childNumber: {
        type: [String],
        default: [],
    },
    urlImage: String,
});

export default Parent ;

