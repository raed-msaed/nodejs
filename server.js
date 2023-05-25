const express = require('express'); // import express for API (get,put,dell ...and function listen server)

const productRoute = require('./routes/product'); //import route product


const userRoute = require('./routes/user'); //import route user

require('./config/connect'); // import file connect

const app = express(); // create variable pour express

app.use(express.json()); //pour accepeter format json && app url is http://127.0.0.1:3000/

app.use('/product', productRoute); //  url is http://127.0.0.1:3000/product/****** */

app.use('/user', userRoute); // url is http://127.0.0.1:3000/user/***** */

app.use('/getimage', express.static('./uploads'))





app.listen(3000, () => {
    console.log('Server run');
})