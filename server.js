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
                res.status(200).send(savedUser) //response BD partie frontend after save
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err)
            }
        )
})


app.post('/create', async (req, res)=>{
    try{
        data = req.body;

        Userdata = new User(data);

        savedUser = await Userdata.save();

        res.send(savedUser);

    } catch(error){

        res.send(error)

    }
})


app.get('/getall', (req, res) => {
    User.find()
        .then(
            (users)=>{
                res.send(users);
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )

})

app.get('/all' , async (req, res)=>{
    try{
        users = await User.find({ age:23});
        res.send(users);
    }catch(error){
        res.send(error)
    }
})

app.get('/getbyid/:id' , (req, res)=>{
    myid= req.params.id;
    User.findOne({ _id:myid})
        .then(
            (user)=>{
                res.send(user)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

app.get('/byid/:id', async (req, res)=>{
    try{
        myid= req.params.id;
        data = await User.findById({_id:myid})
        res.send(data);
    }
    catch(error){
        res.send(error)
    }
})


app.put('/update/:id', (req, res) => {
    id = req.params.id
    newData=req.body;
    User.findByIdAndUpdate({_id:id}, newData )
        .then(
            (updated)=>{
                res.send(updated)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

app.put('/up/:id', async(req, res)=>{
    try{
        id=req.params.id
        newdata = req.body
        upUserDate=await User.findByIdAndUpdate({_id:id}, newdata)
        res.status(200).send(upUserDate)
    }
    catch(error){
        res.status(400).send(error)
    }
})


app.delete('/delete/:id', (req, res) => {
    id=req.params.id
    User.findOneAndDelete({_id:id})
        .then(
            (deletedUser)=>{
                res.send(deletedUser)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

app.delete('/del/:id', async (req, res)=>{
    try{
        id=req.params.id
        deletedUser= await User.findByIdAndDelete({_id:id});
        res.send(deletedUser)
    }catch(error){
        res.send(error)
    }
})

app.listen(3000, () => {
    console.log('Server run');
})