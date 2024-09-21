var express = require('express');
const accounthelper = require('../helpers/accounthelper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const ch = req.session.mailCheck || false; // Use session variable
  req.session.mailCheck = null; // Clear the session variable
  res.render('login', { ch });
});

router.post('/', (req, res) => {
  accounthelper.login(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.send("logged in successfully");
    } else {
      req.session.mailCheck = true; // Set error message
      res.redirect('/');
    }
  })
});


module.exports = router;
