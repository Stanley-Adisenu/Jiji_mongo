import Product from "../Models/product.js";
import Cart from "../Models/cart.js"

export const addToCart = async (req, res, next) => {
    try {
        const { product_id } = req.body;
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = await Cart.findOne({ product_id });
        if (cartItem) {
            if (cartItem.quantity + 1 > product.stock) {
                return res.status(400).json({ message: 'Not enough stock available' });
            }
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            if (product.stock < 1) {
                return res.status(400).json({ message: 'Not enough stock available' });
            }
            await Cart.create({ product_id, quantity: 1 });
        }

        res.status(201).json({ message: 'Product added to cart' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }

}

export const getCart = async (req, res, next) => {
    try {
        const cartItems = await Cart.find().populate('product_id');
        res.status(200).json(cartItems);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

export const updateCartItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const cartItem = await Cart.findById(id).populate('product_id');

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity > cartItem.product_id.stock) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ success: true, message: 'Cart item updated successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

export const removeCartItem = async(req, res, next) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findById(id).populate('product_id');
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            return res.status(200).json({ success: true, message: 'Cart item quantity decremented', cartItem });
        } else {
            await Cart.findByIdAndDelete(id);
            return res.status(200).json({ success: true, message: 'Cart item removed from cart' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}