import express from "express";
import { getAllProducts, getProductsById, getStockQuantity } from "../controllers/product.js";

const router = express.Router();

//Get all products
router.get('/', getAllProducts)

//get details of a cart 
router.get('/:id', getProductsById)

//check stock quantity of a product
router.get('/stock/:id',  getStockQuantity)




export default router;