import { Router } from "express";
import config from "../config.js";
import CartsManager from "../managers/cartsManager.js";

const router = Router()
const manager = new CartsManager(`${config.DIRNAME}/mocks/carts.json`)

router.post("/", async (req, res) => {
    await manager.createCart()
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = +req.params.cid
    const pid = +req.params.pid
    await manager.addProductToCart(cid, pid)
})

router.get("/:cid", async (req, res) => {
    const id = req.params.cid
    const productsCart = await manager.getCartById(id)
    res.send({status: "OK", payload: productsCart})
})

export default router