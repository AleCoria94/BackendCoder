const ProductManager = require ('./index.js')

const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products',async(req,res)=>{
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
                    res.redirect('/products')
                }
            }else{
                res.status(400).json({ message: 'Encontrado',products});
            }
    }catch(error){
     res.status(500).json({message:error})
    }
})

app.get('/products/:pid',async(req,res)=>{
    const {pid} = req.params
    console.log ('Este es el params',pid)
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})