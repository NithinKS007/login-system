
const express = require('express');
const app = express()
const port = 7000
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const router = require('./router')
app.set('view engine','ejs')

//home route  

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))
app.use('/router',router)
app.get('/',(req,res)=>{
    const logout = req.query.logout === 'true';
    res.render('base',{title:'Login System', logout}); // Pass logout variable to the template
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
     