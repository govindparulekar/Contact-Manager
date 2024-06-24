const express = require('express');
const router = express.Router();

router.get('/signup',(req,res)=>{
    console.log("signed up");
    res.end();

});

router.post('/signin',(req,res)=>{
    alert("signed in");

});

module.exports = router;

