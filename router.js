const express = require('express')
const router = express.Router()
const credential = {
    email:'admin@gmail.com',
    password:'12345'
}

const auth = require('./middleware/auth')


router.post('/login', (req, res) => {
    // Check if a session already exists
    if (req.session.user) {
        // Redirect to home page if session exists
        res.redirect('router/dashboard');
    } else{
        if (req.body.username == credential.email && req.body.password == credential.password) {
            req.session.user = req.body.username;
            req.session.password = req.body.password;
            res.redirect('/router/dashboard');
        } else {
            // If username and password don't match
            res.render('base', { title: 'Login System', error: 'Username or password is incorrect.' });
        }
    }
});

//router for dashboard
router.get('/dashboard',auth.isLoggedin,(req,res)=>{
    
        res.render('dashboard',{user:req.session.user})

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
