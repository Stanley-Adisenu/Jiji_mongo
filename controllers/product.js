import Product from "../Models/product.js";


export const getAllProducts =  async (req, res, next)=>{
    console.log("Entering here")
    try {
        const { category, region, minPrice, maxPrice } = req.query;
        const filter = {};

        if (category) {
            filter.category_id = category;
        }
        if (region) {
            filter.region = region;
        }
        if (minPrice) {
            filter.price = { ...filter.price, $gte: minPrice };
        }
        if (maxPrice) {
            filter.price = { ...filter.price, $lte: maxPrice };
        }

        console.log("Filter being applied:", filter);

        const products = await Product.find(filter)
            .populate('category_id')
            .populate('region');
            console.log(products)
            res.json(products);
    } catch (error) {
        console.error('Error fetching products:');
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProductsById =  async (req, res, next)=>{
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        .populate('category_id');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.render('productDetails', { product, title: 'Product Details'});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }

}

export const getStockQuantity = async(req,res,next)=>{
    try {
        // Extract the product ID from the request parameters
        const productId = req.params.id;

        // Retrieve the product from the database by its ID
        const product = await Product.findById(productId, 'stock');

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Send the stock quantity as JSON response
        res.json({ stock: product.stock });
        
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
