const http = require('http');

const {
  v4: uuidv4
} = require('uuid');

const fetch = (...args) => import('node-fetch').then(({
  default: fetch
}) => fetch(...args));

exports.pay = async (req, res) => {
  try {


    const nonce = req.body.nonce;
    const tradeNo = req.body.tradeNo;
    const timestamp = Date.now()

    let ussd = {
      appId: process.env.app_id,
      totalAmount: req.body.amount,
      nonce: nonce,
      returnUrl: `appZone://appZone.co`,
      notifyUrl: `http://46.101.30.203:8888/payNotify`,
      subject: req.body.subject,
      outTradeNo: tradeNo,
      receiveName: process.env.merchant_name,
      shortCode: process.env.short_code,
      timeoutExpress: "30",
      timestamp: `${timestamp}`,
    }

    let body = new URLSearchParams(ussd).toString();

    console.log(JSON.stringify(body));

    const response = await fetch("http://46.101.30.203:8888/getData", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "http://46.101.30.203:8888/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": body,
      "method": "POST",
      "mode": "cors"
    });

    const responseData = await response.json();

    console.log(responseData.encode);

    var options = {
      'method': 'POST',
      'hostname': '196.188.120.3',
      'port': 11443,
      'path': '/ammapi/payment/service-openup/toTradeWebPay',
      'headers': {
        'Content-Type': 'application/json'
      },
      'maxRedirects': 20
    };

    var postRequest = http.request(options, function (_resquest) {
      var chunks = [];

      _resquest.on("data", function (chunk) {
        chunks.push(chunk);
      });

      _resquest.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(`result ${body.toString()}`);
        res.json(body.toString('utf8'));
      });

      _resquest.on("error", function (error) {
        console.error(error);
      });
    });

    postRequest.write(responseData.encode);

    postRequest.end();


  } catch (error) {
    throw error
    res.status(400).json({
      error: true,
      message: error.message
    })
  }
}