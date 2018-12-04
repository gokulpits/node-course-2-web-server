
const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname +'/views/partials');


app.use((req,res,next)=>{
    var log = `${req.method} ,${req.url}`
    fs.appendFileSync('server-log',log + '\n')
next();
});

// app.use((req,res,next)=>{
//     res.render('maintanance.hbs')
// })


app.use(express.static(__dirname +'/public'))

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});

hbs.registerHelper('changeCase',(text)=>{
return text.toLowerCase();
})

app.get('/',(req,res)=>{
   res.render('home.hbs',{
       title:'Home Page',
       subTitle : 'New Home Page',
       message:'Welcome to home',
     
   })
});

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       title:'About Page',
       subTitle : "Abouts page",
       message :"SAMPLE MESSAGE"
      
   });
})

app.get('/bad',(re,res)=>{
    res.send({
        errorMessage:'Unable to handle this request'
    })
})


app.listen(port,()=>{
    console.log(`server is up on ${port}  `);
});