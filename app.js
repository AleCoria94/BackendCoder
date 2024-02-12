
import express from 'express'
const app = express();
import routerProducts from "./routes/products.router.js"
import handlebars from 'express-handlebars'
import routerCarts from "./routes/carts.router.js"
import routerViews from "./routes/view.router.js"
import __dirname from './src/utils.js'
import {Server} from 'socket.io'
const port = 8080

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const socketServer = new Server(httpServer);

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.use(express.static( __dirname + "'public"))

app.use('/api/products',routerProducts)
app.use('/api/carts',routerCarts)
app.use('/',routerViews)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

socketServer.on('connection', async(socket) => {
  console.log("nuestro cliente ha sido conectado",socket.id)
})
//por lo que veo no se manda el mensaje, creo que no se activo socket
//Minuto 49 de la clase