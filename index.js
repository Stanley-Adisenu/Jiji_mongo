import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from "./Routes/products.js"
import categoryRoutes from "./Routes/categories.js"
import regionRoutes from "./Routes/regions.js"
import cartRoutes from "./Routes/cart.js"
import Product from "./Models/product.js"
import Region from "./Models/region.js"
import Category from "./Models/category.js"

const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//register view engine
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT
export const connect = () =>{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        
        console.log("Connected to Database")
    }).catch((err)=>{
        throw err;
    });
}
app.get('/', async (req,res) => {
    const products=  await Product.find()
    const categories = await Category.find()
    const regions = await Region.find()
    res.render('index', { products, categories, regions, title: 'Products' })  
})
app.get('/cartView', async (req,res) => {
    const products=  await Product.find()
    const categories = await Category.find()
    const regions = await Region.find()
    res.render('cartView', { products, categories, regions, title: 'Cart-View' })  
})

// app.get('/productDetails', async (req,res) => {
//     const products=  await Product.find()
//     const categories = await Category.find()
//     const regions = await Region.find()
//     res.render('productDetails', { products, categories, regions, title: 'Details' })  
// })

app.use('/categories', categoryRoutes);
app.use('/regions', regionRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)


app.use((err,req, res, next) => {
    const status = err.status || "500"
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(PORT, async()=>{
    try {
         connect(); // Ensure database connection before starting server
         console.log(`Connected to server on port ${PORT}`);
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
})
