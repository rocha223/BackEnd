import express from 'express';
import cartRouter from './src/routes/cartRouter.js'
import productsRouter from './src/routes/productsRoutes.js';
import morgan from 'morgan';
import { __dirname } from './path.js';
import { error } from './src/middles/error.js';

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.use(error);

const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})