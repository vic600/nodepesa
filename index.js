const express=require('express');
const app=express();
const path=require('path');
const port=3000;
const router=express.Router();
const cors = require('cors')
const payments=require('./routes/payments')(router);
const bodyParser=require('body-parser');
const payment=require('paypal-rest-sdk')

payment.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfvF-5XfDEgnEp42WH16xLi2_6WchaSzAJBk950axEbgz_Y0ZGzWCLCijQjf369vwcdCg2a2T9oDo1RB',
    'client_secret': 'EDJGtKeViCMv3YWep5zeC2XQ9_oT3UY2ojvZo8C1YMA0vYv2h7o55MP7Gs7siBp8fTGez0C3WsZ3hy-K'
  });
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.json({success:true,message:'welcome home'})
})
app.use('/payments',payments);
app.get('*',(req,res)=>{
res.json({success:true,message:'page not found AKA 404'})
})
app.listen(port,(err)=>{
if (err) {
   console.log(err);
    
} else {
console.log('server listening on ' + port);

}
});