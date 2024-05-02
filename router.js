var express = require('express')
var router = express.Router()
var credential = {
    email:'admin@gmail.com',
    password:'12345'
}

router.post('/login', (req, res) => {


    if (req.body.username == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.username;
        req.session.password = req.body.password;
        res.redirect('/router/dashboard');
    } else {
        res.render('base', { title: 'Login System'});
    }
});

    //router for dashboard
    router.get('/dashboard',(req,res)=>{
        if(req.session.user){
            res.render('dashboard',{user:req.session.user})
        }else{
            res.send('Unauthorized user')
        }
    })
//router for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('Error occurred');
        } else {
            res.redirect('/?logout=true');
        }
    });
});

    module.exports = router



