const request = require('request');
const ts = require('time-stamp');
const payment = require('paypal-rest-sdk')
payment.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfvF-5XfDEgnEp42WH16xLi2_6WchaSzAJBk950axEbgz_Y0ZGzWCLCijQjf369vwcdCg2a2T9oDo1RB',
    'client_secret': 'EDJGtKeViCMv3YWep5zeC2XQ9_oT3UY2ojvZo8C1YMA0vYv2h7o55MP7Gs7siBp8fTGez0C3WsZ3hy-K'
});
module.exports = (router) => {
    function gettoken(cb) {
        const Token = String;
        var app_key = "ZuszIZGE8lIHNYNTEq0yjChASNM77QpG";
        var app_secret = "vXzKle0mJvZATI1o";
        var appKeySecret = app_key + ":" + app_secret;
        var auth = "Basic " + new Buffer(appKeySecret).toString("base64");
        var url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

        var au = auth.trim()

        request(
            {
                url: url,
                headers: {
                    "Authorization": au,

                }
            },
            function (error, response, body) {
                if (error) {
                    console.log(error);

                } else {
                    var auth = body.split(":");
                    var Token1 = auth[1];
                    var tk2 = Token1.split(",");
                    var tk3 = tk2[0];
                    var tk = tk3.replace("\"", "");
                    var rt2 = tk.replace('"', "");
                    const Token = "Bearer " + rt2.trim();
                    cb(Token)
                }

            })

    }

    router.post('/pay', (req, res) => {
        gettoken((tk) => {
            if (!req.body.phone) {
                res.json({ success: false, message: 'valid phone number must be provided' })
            } else {

                if (!req.body.amount) {
                    res.json({ success: false, message: 'valid amount  must be provided' })
                } else {
                    var Shortcode = 895407;
                    var PartyB = 895407;
                    var Reference = "28";
                    var description = "Quatrix";
                    // var Bearer = now_token;
                    var Passkey = "d454cbe94ba1619217685cdc8ba423fdecbfd7ff89fd13b1cfbc7cf69eec8aa9";
                    var Time_Stamp = ts('YYYYMMDDHHMMSS')
                    this.Timestamp = Time_Stamp;
                    this.Leo = ts('YYYYMMDD')

                    //console.log('Mpesa time ' +   this.Timestamp);
                    var PartyA = req.body.phone;

                    //this.Thisamo[0] = "1";      //remember to remove this  
                    var Amount = req.body.amount;
                    var plainstring = Shortcode + Passkey + Time_Stamp;
                    var Cred = new Buffer(plainstring).toString("base64")   // Base64.encodeToString(plainstring.getBytes("ISO-8859-1"),Base64.DEFAULT);
                    //console.log('cred ' + Cred);
                    var Credetials = Cred.replace("\\s", "");
                    var url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
                    request(
                        {
                            method: 'POST',
                            url: url,
                            headers: {
                                "Authorization": tk.trim()
                            },
                            json: {
                                BusinessShortCode: Shortcode,
                                Password: Credetials,
                                Timestamp: Time_Stamp,
                                TransactionType: "CustomerPayBillOnline",
                                Amount: Amount,
                                PartyA: PartyA,
                                PartyB: PartyB,
                                PhoneNumber: PartyA,
                                CallBackURL: "https://197.254.116.134:8821",
                                AccountReference: Reference,
                                TransactionDesc: description
                            }
                        },
                        function (error, response, body) {

                            if (error) {
                                res.json(error)

                            } else {
                                res.json(body).status(200)

                            }

                            //console.log(timestamp);

                        }
                    )
                }

            }


        })
        //console.log(Token);
        // res.json({success:true,message:this.Token});

    });
    //stk query

    router.post('/stkquery', (req, res) => {
        gettoken(function (tk) {
            if (!req.body.check) {
                res.json({ success: false, message: 'provide a valid CheckoutRequestID' })
            } else {
                var Shortcode = 895407;
                var Bearer = tk;
                var Passkey = "d454cbe94ba1619217685cdc8ba423fdecbfd7ff89fd13b1cfbc7cf69eec8aa9";
                var Time_Stamp = ts('YYYYMMDDHHMMSS')
                var plainstring = Shortcode + Passkey + Time_Stamp;
                var Cred = new Buffer(plainstring).toString("base64")   // Base64.encodeToString(plainstring.getBytes("ISO-8859-1"),Base64.DEFAULT);
                var Credetials = Cred.replace("\\s", "");
                var url = "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query" //"https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
                request(
                    {
                        method: 'POST',
                        url: url,
                        headers: {
                            "Authorization": Bearer.trim()
                        },
                        json: {
                            "BusinessShortCode": Shortcode,
                            "Password": Credetials,
                            "Timestamp": Time_Stamp,
                            "CheckoutRequestID": req.body.check
                        }
                    },
                    function (error, response, body) {
                        if (error) {
                            res.json(error)
                        } else {
                            res.json(body).status(200)
                        }

                    }
                )
            }



        })
    })

    router.post('/pstatus', (req, res) => {
        gettoken(function (tk) {
            if (!req.body.check) {
                res.json({ success: false, message: 'provide a valid CheckoutRequestID' })
            } else {
                var Shortcode = 895407;
                var Bearer = tk;
                var Passkey = "d454cbe94ba1619217685cdc8ba423fdecbfd7ff89fd13b1cfbc7cf69eec8aa9";
                var Time_Stamp = ts('YYYYMMDDHHMMSS')
                var plainstring = Shortcode + Passkey + Time_Stamp;
                var Cred = new Buffer(plainstring).toString("base64")   // Base64.encodeToString(plainstring.getBytes("ISO-8859-1"),Base64.DEFAULT);
                var Credetials = Cred.replace("\\s", "");
                var url = "https://api.safaricom.co.ke/mpesa/transactionstatus/v1/query"  // "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"

                request(
                    {
                        method: 'POST',
                        url: url,
                        headers: {
                            "Authorization": Bearer.trim()
                        },
                        json: {
                            "Initiator": Shortcode,
                            "SecurityCredential": Credetials,
                            "CommandID": "TransactionStatusQuery",
                            "TransactionID": req.body.check,
                            "PartyA": Shortcode,
                            "IdentifierType": "1",
                            "ResultURL": "",
                            "QueueTimeOutURL": "",
                            "Remarks": "confirm ",
                            "Occasion": "transaction "
                        }
                    },
                    function (error, response, body) {
                        if (error) {
                            res.json(error);
                        } else {
                            res.json(body).status(200)
                        }

                    }
                )
            }


        })
    })

    router.post('/paypal', (req, res) => {
        if (req.body.amount) {
            var amount = req.body.amount;
            this.amtUSD = (amount / 105).toFixed(2);
            var create_payment_json = {
                "intent": "authorize",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://138.68.105.20:3000/payments/execute",
                    "cancel_url": "http://138.68.105.20:3000/payments/cancel"
                },
                "transactions": [{
                    "amount": {
                        "total": this.amtUSD,
                        "currency": "USD"
                    },
                    "description": 'Quatrix Service'
                }]
            };

            payment.payment.create(create_payment_json, (err, loot) => {
                if (err) {
                    res.json({ success: false, message: err })

                } else {
                    for (var index = 0; index < loot.links.length; index++) {
                        //Redirect user to this endpoint for redirect url
                        if (loot.links[index].rel === 'approval_url') {
                            //console.log(loot.links[index].href);
                            const redirect = loot.links[index].href
                            res.json({ success: true, id: loot.id, redirect: redirect }).status(200)
                        }
                    }

                    // res.json({success:true,message:loot})
                }
            })
        } else {
            res.json({ success: false, message: 'Amount is required' })
        }

    })



    router.get('/execute', (req, res) => {
        const payer = req.query.PayerID;
        this.token = req.query.token;
        var execute_payment_json = {
            "payer_id": payer,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": this.amtUSD
                }
            }]
        };
        const paymentId = req.query.paymentId;

        payment.payment.execute(paymentId, execute_payment_json, function (error, pay) {
            if (error) {
                res.json(error)
            } else {

                res.json(pay).status(200)
            }
        });
    })

    router.get('/cancel', (req, res) => {
        const tok = req.query.token
        if (this.token == tok) {
            res.json({ success: false, message: 'invalid token' })
        } else {
            res.json({ status: 'canceled', success: true, message: 'Transaction canceled' });
        }

    })
    router.post('/check', (req, res) => {
        if (!req.body.pid) {
            res.json({ success: false, message: 'invalid paymentId' })
        } else {
            const paymentId = req.body.pid;
            payment.payment.get(paymentId, function (error, payment) {
                if (error) {
                    console.log(error);
                    throw error;
                } else {
                    // console.log("Get Payment Response");
                    //console.log(JSON.stringify(payment));
                    res.json({ success: true, id: payment.id, state: payment.state}).status(200)
                }

            });
        }

    })
    return router
}