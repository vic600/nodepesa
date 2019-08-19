const request = require('request');
const ts = require('time-stamp');
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
                                res.json({ success: false, message: error })

                            } else {
                                res.json({ success: true, message: body })

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
                res.json({success:false,message:'provide a valid CheckoutRequestID'})
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
                            res.json({
                                success: false,
                                message: error
                            })
                        } else {
                            res.json({ success: true, message: body })
                        }
    
                    }
                )
            }
         


        })
    })

    router.post('/pstatus', (req, res) => {
        gettoken(function (tk) {
            if (!req.body.check) {
                res.json({success:false,message:'provide a valid CheckoutRequestID'})
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
                            res.json({ success: false, message: error });
                        } else {
                            res.json({ success: true, message: body })
                        }
    
                    }
                )  
            }
            

        })
    })
    return router
}