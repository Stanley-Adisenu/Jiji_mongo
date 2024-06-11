import express from "express";
import { getRegions } from "../controllers/region.js";

const router = express.Router();

//Get all categories
router.get('/', getRegions)


export default router;