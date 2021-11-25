const router = require("express").Router();
const stripe = require("stripe")("sk_test_51JmYLkSBnPjkDaqT0KJmeCjUcGgFhxUGuXYTuOOlBgiFVdgOmqQyy7Og8xNdTkuQkQrsnOgHcK80LU9ofRDs8Glk00YxwwaZDC");

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log(stripeErr);
      } else {
        res.status(200).json(stripeRes);
        console.log(stripeRes);
      }
    }
  );
});

module.exports = router;
