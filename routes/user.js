const express = require('express');

const router = express.Router();

const User = require('../models/user');//import from model user for creation instance 

const bcrypt = require('bcrypt');     //crypte password with librairie bcrybt

const jwt = require('jsonwebtoken'); // import bibilo jwt for create token

/*router.post('/add', (req, res) => {

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
})*/

router.post('/register',async (req, res)=>{
    data = req.body; // prend donnée depuis request

    usr = new User(data); // create instance from model and pass parameter

    salt = bcrypt.genSaltSync(10);// create Random String taille 10 pour hash password with it

    cryptedPass = await bcrypt.hashSync(data.password, salt);

    usr.password = cryptedPass;

    usr.save()
        .then(
            (saved)=>{
                res.status(200).send(saved); // return res 'saved' to frontend
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.post('/login',async (req,res)=>{
    data = req.body;

    user = await User.findOne({email: data.email})

    if(!user){
        res.status(404).send('Email or Password invalid ! ')
    }else{
        validPass = bcrypt.compareSync(data.password , user.password)

        if(!validPass){
            res.status(401).send('email or password invalid ! ')
        }else{
            payload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign(payload, '1234567'); // in signe token two param " payload object created and signed it token with secret key '1234567' "

            res.status(200).send({ mytoken : token });
        }
    }


})

router.post('/create', async (req, res)=>{
    try{
        data = req.body;

        Userdata = new User(data);

        savedUser = await Userdata.save();

        res.status(200).send(savedUser);

    } catch(error){

        res.status(400).send(error)

    }
})


router.get('/getall', (req, res) => {
    User.find()
        .then(
            (users)=>{
                res.status(200).send(users);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )

})

router.get('/all' , async (req, res)=>{
    try{
        users = await User.find({ age:23});
        res.status(200).send(users);
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/getbyid/:id' , (req, res)=>{
    myid= req.params.id;
    User.findOne({ _id:myid})
        .then(
            (user)=>{
                res.status(200).send(user)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})

router.get('/byid/:id', async (req, res)=>{
    try{
        myid= req.params.id;
        data = await User.findById({_id:myid})
        res.status(200).send(data);
    }
    catch(error){
        res.status(400).send(error)
    }
})


router.put('/update/:id', (req, res) => {
    id = req.params.id
    newData=req.body;
    User.findByIdAndUpdate({_id:id}, newData )
        .then(
            (updated)=>{
                res.status(200).send(updated)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})

router.put('/up/:id', async(req, res)=>{
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


router.delete('/delete/:id', (req, res) => {
    id=req.params.id
    User.findOneAndDelete({_id:id})
        .then(
            (deletedUser)=>{
                res.status(200).send(deletedUser)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})

router.delete('/del/:id', async (req, res)=>{
    try{
        id=req.params.id
        deletedUser= await User.findByIdAndDelete({_id:id});
        res.status(200).send(deletedUser)
    }catch(error){
        res.status(400).send(error)
    }
})




module.exports = router;