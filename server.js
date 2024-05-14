
const express = require('express');
const app = express()
const port = 7000
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const router = require('./router');
app.set('view engine','ejs')

//home route  

app.use(express.static('public')) //adding styles to login page
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

// Middleware to set cache control headers
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});


app.use('/router',router)

app.get('/',(req,res) =>{
    if (req.session.user) {
        // Redirect to home page if session exists
        res.redirect('router/dashboard');
    }else{
        res.render('base',{title:'Login System' });
    }
})

app.get('/logout',(req,res)=>{
    const logout = req.query.logout === 'true';
    res.render('base',{title:'Login System', logout}); // Pass logout variable to the template
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
     
