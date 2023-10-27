import mongoose from "mongoose";

let i = 0
function getCodeDeVerification(){
    let code = ''
    while (i < 4) {
        code = code + Math.floor(Math.random() * 10).toString();
        i++;
    }
    return code;
}
const User = mongoose.model('users', {
    userFirstName: String,
    userLastName: String,
    userNumber: String,
    codeParental: String,
    codeSecurite: String
});

export default User ;