var express = require('express');
var router = express.Router();
var achelper = require('../helpers/accounthelper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const ch = req.session.mailCheck || false; // Use session variable
  req.session.mailCheck = null; // Clear the session variable
  res.render('register', { ch });
});

router.post('/', async (req, res) => {
  var users = await achelper.checkusers();

  const userExists = users.find(user => user.mail === req.body.mail);
  if (userExists) {
    req.session.mailCheck = true; // Set session variable
    console.log("already inserted");
    return res.redirect('/register'); // Use return to prevent further execution
  } else {
    console.log(req.body.password);
    await achelper.register(req.body);
    return res.redirect('/'); // Redirect to a success page or similar
  }
});

module.exports = router;
