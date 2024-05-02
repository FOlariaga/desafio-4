import { Router } from "express";
import config from "../config.js";
import ProductManager from "../managers/productsManager.js";
import { Socket } from "socket.io";

const router = Router()
const manager = new ProductManager(`${config.DIRNAME}/mocks/products.json`)

router.get("/",  async (req, res) => {
    const limit = req.query.limit
    const products =  await manager.getProduct(limit)
    res.render("home", {products: products})
})


router.get("/realTimeProducts", async (req, res) => {
    const limit = req.query.limit
    const products =  await manager.getProduct(limit)
    res.render("realTimeProducts", { products: products })
})


export default router