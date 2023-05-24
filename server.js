const express = require('express'); // import express for API (get,put,dell ...and function listen server)

const User = require('./models/user');//import from model user for creation instance 

require('./config/connect'); // import file connect

const app = express();

app.use(express.json()); //pour accepeter format json

app.post('/add', (req, res) => {

    data = req.body; //recupere data in req

    usr = new User(data); //for creation instance from model user

    // function from mongo save data BD

    usr.save()
        .then(
            (savedUser) => {
                res.send(savedUser) //response BD partie frontend after save
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
})

app.get('/getall', () => {
    console.log("get All work");
})

app.put('/update', () => {
    console.log("update work");
})

app.delete('/delete', () => {
    console.log("delete work");
})

app.listen(3000, () => {
    console.log('Server run');
})