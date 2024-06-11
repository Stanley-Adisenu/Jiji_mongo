import Region from '../Models/region.js';

// Controller to get all regions
export const getRegions = async (req, res) => {
    try {
        const regions = await Region.find();
        console.log(regions)
        res.json(regions);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};