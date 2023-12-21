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
    codeParental: {
        type: String,
        required: [true, "Your parental code is required"]
    },
    childNumber: {
        type: [String],
        default: [],
    },
    urlImage: String,
    codeSecurite: String
});

export default Parent ;

