let express = require('express');
let router = express.Router();
// let conn = require('./connect');
let jwt = require('jsonwebtoken');
let secretCode = 'myecomkey';
let fetch = require('node-fetch');
let session = require('express-session');
let axios = require('axios');
const { render } = require('ejs');

router.use(session({
  secret: 'sessionforecommerce',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

router.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backup');
});


// router.post('/submitDeliveryList', (req, res) => {
//   const { deliveryList, forwarder, user, channel } = req.body;
//   console.log('ได้ข้อมูล', deliveryList, forwarder, user, channel )

//   // ดำเนินการบันทืกข้อมูล
//   res.json({ message: 'รับข้อมูลเรียบร้อย'})
// })

router.post('/submitDeliveryList', async (req, res) => {
  const { deliveryList, forwarder, user, channel } = req.body;

  const body = [
    {
      dnNo: deliveryList,
      shipment: {
        driverCode: "170003",
        driverName: "ADMIN.DKSH",
        fowardAgent: "0",
        shipmentNo: "",
        shipmentRemarks: ""
      }
    }
  ];

  try {
    const response = await fetch("https://app-sg-cc-epodbe01p.azurewebsites.net/api/DeliveryNotes/Shipment", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).send("Delivery API failed");
  }
});





// router.get('/getOrderNo/:orderNo', async (req, res) => {
//   const response = await fetch("https://tracking.dksh.com/api/deliveryorder/get", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({ DeliveryOrder: req.params.orderNo })
//   });
  
//   const data = await response.json();
//   res.json(data); // ส่งต่อให้ frontend
// });

module.exports = router;
