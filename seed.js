import mongoose from 'mongoose';
import Category from './Models/category.js';
import Product from './Models/product.js';
import Cart from './Models/cart.js';
import Region from './Models/region.js';
import { connect } from './index.js';

const seedDatabase = async () => {
    await connect(); // Ensure connect is awaited

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Region.deleteMany({});

    // Insert categories
    const categories = await Category.insertMany([
        { name: 'Electronics' },
        { name: 'Books' },
        { name: 'Clothing' },
        { name: 'Stationary' }
    ]);

    // Insert regions with required fields (product_id and quantity)
    const regions = await Region.insertMany(
       [
            { name: 'Ashanti' },
            { name: 'Accra' },
            { name: 'Central' },
            { name: 'Volta' },
            { name: 'Eastern' },
            { name: 'Bono' }
        ]
);

    // Insert products
    const products = await Product.insertMany([
        {
            name: 'Smartphone',
            description: 'Latest model smartphone with high-end features.',
            price: 699.99,
            category_id: categories[0]._id,
            stock: 50,
            region: regions[0]._id // Reference to the region document
        },
        {
            name: 'Laptop',
            description: 'Powerful laptop for work and gaming.',
            price: 999.99,
            category_id: categories[0]._id,
            stock: 30,
            region: regions[0]._id // Reference to the region document
        },
        {
            name: 'Novel',
            description: 'Bestselling fiction novel.',
            price: 19.99,
            category_id: categories[1]._id,
            stock: 100,
            region: regions[1]._id // Reference to the region document
        },
        {
            name: 'T-shirt',
            description: 'Comfortable cotton t-shirt.',
            price: 9.99,
            category_id: categories[2]._id,
            stock: 200,
            region: regions[2]._id // Reference to the region document
        },
        { 
            name: 'Tablet',
            description: 'A lightweight and portable tablet', 
            price: 399,
            category_id: categories[1]._id, 
            region: regions[4].name, 
            stock: 80

         },
        { 
            name: 'Camera',
            description: 'A digital camera with high resolution', 
            price: 499, 
            category_id: categories[2]._id, 
            region: regions[5].name, 
            stock: 60
        },
        { 
            name: 'Monitor', 
            description: 'A 4K ultra HD monitor', 
            price: 299, 
            category_id: categories[0]._id, 
            region: regions[0].name, 
            stock: 90 
        },
            { name: 'Keyboard', description: 'Mechanical keyboard with RGB lighting', price: 129, category_id: categories[1]._id, region: regions[1].name, stock: 150 },
            { name: 'Mouse', description: 'Ergonomic wireless mouse', price: 59, category_id: categories[2]._id, region: regions[2].name, stock: 110 },
            { name: 'Printer', description: 'Wireless multifunction printer', price: 199, category_id: categories[0]._id, region: regions[3].name, stock: 40 },
            { name: 'Printer', description: 'Wireless multifunction printer', price: 199, category_id: categories[0]._id, region: regions[3].name, stock: 40 },
            { name: 'Speakers', description: 'High-quality Bluetooth speakers', price: 149, category_id: categories[2]._id, region: regions[4].name, stock: 130 },
            { name: 'Gaming Console', description: 'Next-gen gaming console', price: 499, category_id: categories[1]._id, region: regions[5].name, stock: 70 },
            { name: 'Router', description: 'High-speed internet router', price: 89, category_id: categories[0]._id, region: regions[0].name, stock: 140 },
            { name: 'External Hard Drive', description: '1TB external hard drive', price: 79, category_id: categories[1]._id, region: regions[1].name, stock: 120 },
            { name: 'Fitness Tracker', description: 'Track your fitness goals', price: 99, category_id: categories[2]._id, region: regions[2].name, stock: 200 },
            { name: 'Drone', description: '4K camera drone', price: 599, category_id: categories[0]._id, region: regions[3].name, stock: 50 },
            { name: 'Projector', description: 'HD home projector', price: 299, category_id: categories[1]._id, region: regions[4].name, stock: 60 },
            { name: 'E-Reader', description: 'Portable e-reader with backlight', price: 129, category_id: categories[2]._id, region: regions[5].name, stock: 110 },
            { name: 'Bluetooth Earbuds', description: 'Wireless Bluetooth earbuds', price: 69, category_id: categories[0]._id, region: regions[0].name, stock: 180 },
            { name: 'Smart Thermostat', description: 'Smart home thermostat', price: 199, category_id: categories[1]._id, region: regions[1].name, stock: 90 },
            { name: 'Electric Scooter', description: 'Foldable electric scooter', price: 399, category_id: categories[2]._id, region: regions[2].name, stock: 70 },
            { name: 'VR Headset', description: 'Virtual reality headset', price: 299, category_id: categories[0]._id, region: regions[3].name, stock: 60 },
            { name: 'Smart Doorbell', description: 'Video doorbell with motion detection', price: 149, category_id: categories[1]._id, region: regions[4].name, stock: 100 },
            { name: 'Wireless Charger', description: 'Fast wireless charger', price: 49, category_id: categories[2]._id, region: regions[5].name, stock: 140 }
    ]);

    // Update regions with correct product_id
    await Region.updateOne({ _id: regions[0]._id }, { product_id: products[0]._id });
    await Region.updateOne({ _id: regions[1]._id }, { product_id: products[2]._id });
    await Region.updateOne({ _id: regions[2]._id }, { product_id: products[3]._id });

    // Insert cart items
    await Cart.insertMany([
        {
            product_id: products[0]._id,
            quantity: 1
        },
        {
            product_id: products[1]._id,
            quantity: 2
        },
        {
            product_id: products[2]._id,
            quantity: 3
        }
    ]);

    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDatabase().catch(err => console.error(err));
