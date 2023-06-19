import express from 'express';
const router = express.Router();

import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController,
    categoryController,
    getSingleCategoryController,
    deleteCategoryController
 } from '../controllers/category.controller.js';


// Create Category:

router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update Category:
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);


// get All Cateogory:
router.get('/get-category', categoryController);


// Get single Category:
router.get('/single-category/:slug', getSingleCategoryController);

// delete category:

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);



export default router;
