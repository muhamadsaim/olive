const qr = require('qrcode');

const genQr = (data) => {
    
    let strJson = JSON.stringify(data);
    qr.toDataURL(strJson, function (err, code) {
        if (err) return console.log('error in generating qrcode', err);
        console.log(code)
    })
}

module.exports=genQr