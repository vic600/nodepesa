const express=require('express');
const app=express();
const path=require('path');
const port=3000;
const router=express.Router();

const payments=require('./routes/payments')(router);
const bodyParser=require('body-parser');




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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