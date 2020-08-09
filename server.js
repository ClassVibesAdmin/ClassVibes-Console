const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const firebase = require('firebase');
const ejs = require('ejs')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var speakeasy = require("speakeasy");


////////////////////////////////////////
//----------GLOBAL VARIABLES -----------
////////////////////////////////////////


router.get('/',function(req,res){
  res.redirect('/login')
});

     
router.get('/index.html',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/dashboard',function(req,res){
  res.sendFile(path.join(__dirname+'/dashboard.html'));
});

router.get('/activate',function(req,res){
  res.sendFile(path.join(__dirname+'/activateAccounts.html'));
  });

router.get('/manage',function(req,res){
res.sendFile(path.join(__dirname+'/serverManagement.html'));
});

router.get('/registry',function(req,res){
  res.sendFile(path.join(__dirname+'/transactionRegistry.html'));
  });

router.get('/verifyAuth-2FA',function(req,res){
  var userToken = req.query.userToken

  var secret = 'IMZEWNDIJM4WY3DYKESF2ZT2PFUWS3SN'

  var verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: userToken
  });

  console.log(verified)

    res.send(verified)

 
  });




/////////////////////////
//STATIC ASSETS HANDLER
/////////////////////////
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))
app.use('/vendor', express.static('vendor'))
app.use('/authcss', express.static('app/authentication/css/'))
app.use('/authjs', express.static('app/authentication/js/'))
app.use('/authimg', express.static('app/authentication/img/'))
app.use('/student', express.static('app/studentPortal/'))

app.use('/teacher', express.static('app/teacherPortal/'))
app.use('/app', express.static('app/'))
app.use('/teacherjs', express.static('app/teacherPortal/js/'))
app.use('/teachercss', express.static('app/teacherPortal/css/'))
app.use('/404page', express.static('PageNotFound/'))

//add the router
app.use('/', router);
//app.listen(process.env.port || 3000);


/////////////////////////
//HTTP SERVER LISTENER CONFIG
/////////////////////////

app.get('*', function(req, res){
  res.status(404).sendFile(path.join(__dirname+'/PageNotFound/404.html'));
});

http.listen(3222, () => {
  console.log('listening on *:3222');
});

