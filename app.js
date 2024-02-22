
import express from 'express'
import mongoose from 'mongoose'
import routerProducts from "./routes/products.router.js"
import handlebars from 'express-handlebars'
/*import routerDaoProducts from "./routes/dao.products.router.js"*/
import routerCarts from "./routes/carts.router.js"
import routerViews from "./routes/view.router.js"
import __dirname from './src/utils.js'
import { Server } from 'socket.io'
const port = 8080
import { connectedDB } from "./db/db.js"
import Products from './models/products.model.js'
connectedDB()

/*mongoose.connect("mongodb://localhost:27017/ecommerce")*/

const app = express();

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.use(express.static( __dirname + "/public"))

app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)
app.use('/',routerViews)
/*app.use('/dao/products',routerDaoProducts)*/


io.on('connection', (socket) => {
  console.log('a user connected');
    const emitProducts = async ()=>{
      const prod = await Products.find()
      io.emit('loadProducts',prod)
    }
    emitProducts();
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {
    io.emit('message',msg);
  });

  socket.emit('evento_para_socket_individual','Este mensaje solo lo debe recibir el actual')
  socket.broadcast.emit('evento_para_todos_menos_el_actual','Se conecto otro cliente')
  io.emit('evento_para_todos','Este evento lo estan escuchando todos')
});
