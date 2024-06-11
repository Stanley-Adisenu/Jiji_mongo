import express from "express";
import { getCart, updateCartItem, removeCartItem, addToCart  } from "../controllers/cart.js";
import { getStockQuantity } from "../controllers/product.js";

const router = express.Router();

//Add a product to the cart
router.post('/', addToCart)

//Get products from the cart
router.get('/', getCart)

//Update the products in a cart
router.put('/:id', updateCartItem)

//Remove a product from the cart
router.delete('/:id', removeCartItem)

//check stock quantity of a product
router.get('/stock/:id',  getStockQuantity)



export default router;