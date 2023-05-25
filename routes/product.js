const express = require('express');

const router = express.Router();

const Product = require('../models/product');//import model Poduct

const multer = require('multer'); // importe bibliotheque d'image multer 

filename = '';

const mystorage = multer.diskStorage({
    destination:'./uploads',
    filename: (req, file, redirect)=>{
        let date = Date.now();
        let fl = date + '.'+file.mimetype.split('/')[1]; // mimetype return index 1 ==> "image/png" ;
        redirect(null,fl); // redirection file in uploads
        filename = fl; // name file save in data base
    }
})

const upload = multer({storage: mystorage}); //middelware work inter appel request('/createproduct') and function creation (async (req, res))

// CRUD PRODUCT

router.post('/createproduct', upload.any('image'), async (req, res)=>{   //upload.any before save element in db , upload.any => any number image
    try{
        data = req.body;

        Productdata = new Product(data);
        Productdata.image = filename;
        savedPoduct = await Productdata.save();
        filename=''; // reset filename
        res.status(200).send(savedPoduct);

    } catch(error){

        res.status(400).send(error)

    }
})

router.get('/getallproduct' , async (req, res)=>{
    try{
        products = await Product.find();
        res.status(200).send(products);
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/getbyidproduct/:id', async (req, res)=>{
    try{
        myidproduct= req.params.id;
        dataproduct = await Product.findById({_id:myidproduct})
        res.status(200).send(dataproduct);
    }
    catch(error){
        res.status(400).send(error)
    }
})



router.put('/updateproduct/:id', async(req, res)=>{
    try{
        idproduct=req.params.id;
        newdataproduct = req.body;
        updatproductDate=await Product.findByIdAndUpdate({_id:idproduct}, newdataproduct)
        res.status(200).send(updatproductDate)
    }
    catch(error){
        res.status(400).send(error)
    }
})


router.delete('/deleteproduct/:id', async (req, res)=>{
    try{
        idpro=req.params.id
        deletedProd= await Product.findByIdAndDelete({_id:idpro});
        res.status(200).send(deletedProd)
    }catch(error){
        res.status(400).send(error)
    }
})




module.exports = router;