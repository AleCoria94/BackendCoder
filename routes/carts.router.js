import express from "express"
const router = express.Router()
import CartManager from '../carts.js'

router.get("/",async(req,res)=>{
    try{
        const carts = await CartManager.getCarts()
            !carts.length ? res.status(200).json({message:'No carts'}) : res.status(400).json({ message: 'Encontrado',carts})
        }catch(error){
            res.status(500).json({message:error})
        }
})

router.post('/',async(req,res)=>{
    try{
        const productCreated = await CartManager.addProduct(req.body)
        console.log ( productCreated);
            if(!productCreated)
                res.status(200).json({message:'Not found'})
                    else
                res.status(200).json({message:'El producto fue agregado',product})
        }catch(error){
        res.status(500).json({message:'Error',error})
    }
})

router.post('/:cid/product/:cid',async(req,res)=>{
    try{
        const productCreated = await CartManager.addProduct(req.body)
        
            if(!productCreated)
                res.status(200).json({message:'Not found'})
                    else
                res.status(200).json({message:'El producto fue agregado',product})
        }catch(error){
        res.status(500).json({message:'Error',error})
    }
})

router.get('/:cid',async(req,res)=>{
    const {cid} = req.params
    try{
        const cart = await CartManager.getCartById(+cid)
            !cart ? res.status(200).json({message:'Not found'}) : res.status(200).json({message:'Encontrado',cart})
        }catch(error){
            res.status(500).json({message:error})
    }

})
export default router