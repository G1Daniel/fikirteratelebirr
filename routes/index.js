var express = require('express');
var router = express.Router();
var payController = require('../controllers/pay');
var notifyController = require('../controllers/notify');
const { payValidate } = require('../validators/pay.validate');


/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Payment Test', error: false });
});

router.post('/pay', payValidate("pay"), payController.pay)

router.post('/notify', notifyController.notify)

router.get('/return', function(req, res){
  console.log("Get return"); 
  console.log(req.params);
  res.json(req.params)
})

module.exports = router;
