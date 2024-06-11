import Category from '../Models/category.js';

// Controller to get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories)
        res.json(categories);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};