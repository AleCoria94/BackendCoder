import express from "express"
const router = express.Router()

import ProductManager from '../index.js'
const products = await ProductManager.getProducts()

router.get('/',(req,res)=>{
    res.render('home',{products});
})

router.get('/realTimeProducts',(req,res)=>{
    res.render('realTimeProducts',{products});
})

router.get('/sockets',(req,res)=>{
    res.render('sockets');
})

export default router;