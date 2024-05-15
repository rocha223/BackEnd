import { Router } from "express";
const router = Router()

import { __dirname } from "../path.js";

import ProductManager from "../managers/productManager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

import {prodValidator} from '../middles/prodValidator.js'


router.get('/',async(req,res)=>{
    try {
        const { limit } = req.query
        console.log(limit)
        const products = await productManager.getProducts(limit)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({messege:error.messege})
    }
})

router.get('/:idProd',async(req,res)=>{
    try {
        const { idProd }= req.params
        const product = await productManager.getProductById(idProd)
        if(!product)res.status(404).json({msg:'Product not found'})
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg:error.messege})
        console.log(error)
    }
})

router.post('/',prodValidator,async(req,res)=>{
    try {
        console.log(req.body)
        const product = req.body
        const newProd = await productManager.createProduct(product)
        res.json(newProd)
    } catch (error) {
        res.status(404).json({msg:error.messege})
    }
})

router.put('/:idPord',async(req,res)=>{
    try {
        const { idProd } = req.params
        const prodUpdate = await productManager.updateProduct(req.body,idProd)
        if(!prodUpdate)res.status(404).json({msg:'Error updating product'})
        res.status(200).json(prodUpdate)
    } catch (error) {
        res.status(500).json({msg:error.messege})
    }
})

router.delete('/:idProd',async(req,res)=>{
    try {
        const { idProd } = req.params
        const delateProd = await productManager.deleteProduct(idProd)
        if(!delateProd)res.status(404).json({msg:'Error delate product'})
        else res.status(200).json({msg:`product id ${idProd} delated successfully`})
    } catch (error) {
        res.status(500).json({msg:error.messege})
    }
})

router.delete('/', async(req, res)=>{
    try {
        await productManager.deleteFile();
        res.send('products deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

export default router;