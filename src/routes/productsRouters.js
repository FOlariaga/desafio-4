import { Router } from "express";
import ProductManager from "../managers/productsManager.js";
import config from "../config.js";

const router = Router()
const manager = new ProductManager(`${config.DIRNAME}/mocks/products.json`)

router.get("/", async (req, res) => {
    const limit = req.query.limit
    const products =  await manager.getProduct(limit)
    res.send({status:"OK", payload: products})
})

router.get("/:pid", async (req, res) => {
    const id = req.params.pid
    const product = await manager.getProductById(id)
    res.send({status:"OK", payload: product})
})

router.post("/", async (req, res) => {
    const socketServer = req.app.get('socketServer')
    if(await manager.addProduct(req.body)){
        const data = req.body
        socketServer.emit('newProduct', data)
    }
})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    await manager.updateProduct(id, req.body)
})

router.delete("/:pid", async (req, res) => {
    const socketServer = req.app.get('socketServer')
    const id = req.params.pid
    if(await manager.deleteProduct(id)){
        socketServer.emit('deleteProduct', id)
    }
})

export default router