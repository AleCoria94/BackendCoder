
const express = require('express')
const app = express();
const routerProducts = require("./routes/products.router.js")
const routerCarts = require("./routes/carts.router.js")

app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})