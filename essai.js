/* let i = 0
function getCodeDeVerification(){
    let code = ''
    while (i < 4) {
        code = code + Math.floor(Math.random() * 10).toString();
        i++;
    }
    return code;
}

console.log(getCodeDeVerification()); */





module.exports={
    sendVerificationCode,
    verifyCode
}

const express = require('express');
const controller = require('../controllers/controller')
const router = express.Router();

router.post('/send-code', controller.sendVerificationCode);
router.post('/verify-code', controller.verifyCode)

module.exports = router;