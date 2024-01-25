
const express = require('express')
const app = express();
const routerProducts = require("./routes/products.router.js")
const routerCarts = require("./routes/carts.router.js")
const ___dirname = require('./src/utils.js');

app.use(express.json())
app.use(express.static( ___dirname + '/public'));
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)
app.use('/',viewRouter)
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})