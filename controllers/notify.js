const fetch = (...args) => import('node-fetch').then(({
  default: fetch
}) => fetch(...args));
const TheModule = require("../firebase-service.js");
const admin = TheModule.admin;
const firestore = admin.firestore();

const {
  initializeApp
} = require('firebase-admin/app');

exports.notify = async (req, res) => {
  try {
    console.log("post notify");

    console.log(req.body);
    let body = JSON.parse(req.body.data);

    firestore.collection(
      `transactions`
    ).doc(body["tradeNo"]).set({
      msisdn: body["msisdn"],
      outTradeNo: body["outTradeNo"],
      totalAmount: body["totalAmount"],
      tradeDate: body["tradeDate"],
      tradeNo: body["tradeNo"],
      completed: true,
      tradeStatus: body["tradeStatus"],
      transactionNo: body["transactionNo"]
    })

    return "success";
  } catch (error) {
    throw error
    res.status(400).json({
      error: true,
      message: error.message
    })
  }
}