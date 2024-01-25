const express = require("express")
const router = express.Router()

const ProductManager = require ('../index.js')
const products = await ProductManager.getProducts()

router.get('/',(req,res)=>{
    res.render('home',{products});
})

router.get('/realTimeProducts',(req,res)=>{
    res.render('realTimeProducts',{products});
})

export default router;