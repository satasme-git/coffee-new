const functions = require("firebase-functions");
const stripe = require("stripe")('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');
exports.payWithStripe = functions.https.onRequest((request, response) => {
    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
    }).then((charge) => {
        response.send(charge);
    }).catch(er => {
        console.log(er);
    });
},);
