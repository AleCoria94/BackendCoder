const express = require("express")
const router = express.Router()
const ProductManager = require ('../index.js')

router.get("/",async(req,res)=>{
    const {limit} = req.query
try{
    const products = await ProductManager.getProducts()
    if(!products.length)
    res.status(200).json({message:'No hay products'})
    else
    if(limit){
        if (limit>0) {
            res.status(200).json(products.slice(0, limit));
            } else {
                    res.redirect('/')
                }
            }else{
                res.status(200).json({ message: 'Encontrado',products});
            }
    }catch(error){
     res.status(500).json({message:error,error})
    }
})

router.get('/:pid',async(req,res)=>{
    const {pid} = req.params
    try{
        const product = await ProductManager.getProductById(+pid)
        if(!product)
        res.status(200).json({message:'Not found'})
        else
        res.status(200).json({message:'Encontrado',product})
    }catch(error){
        res.status(500).json({message:error})
    }
    
    })

router.post('/',async(req,res)=>{
    try{
        const productCreated = await ProductManager.addProduct(req.body)
        
            if(!productCreated)
                res.status(200).json({message:'Not found'})
                    else
                res.status(200).json({message:'El producto fue agregado',product})
        }catch(error){
        res.status(500).json({message:'Error',error})
    }
})

router.put('/:pid',async(req,res)=>{
        const updatedProduct = req.body
        //console.log(updatedProduct)
        const {pid} = req.params
        //console.log(req.params)
        const idNumber = Number(pid);
        //console.log("Este es el id number",idNumber);
    try{
        const productOk = await ProductManager.getProductById(idNumber)
        
            if(!productOk){
            res.status(200).json ({message: 'Product not found'});}
        else{
            await ProductManager.updatedId(idNumber,updatedProduct)
            res.status(200).json({message:'Product id updated',idNumber})}
        }catch(error){
        res.status(500).json({message:error, error})
    }
    
    })
router.delete('/:pid',async(req,res)=>{
        try{
            const {pid} = req.params
            const idNumber = Number(pid);
            await ProductManager.deleteById(idNumber)
                res.status(200).json({message:'The product was deleted.'})
            }catch(error){
                res.status(500).json({message:"error",error})
            }
        })
module.exports = router;