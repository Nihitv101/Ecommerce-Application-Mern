import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';



import { createProductController, 
    getProductController,
    getSingleProduct,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    braintreePaymentController

} from '../controllers/product.controller.js';


const router = express.Router();


router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

router.get('/get-product', getProductController);

// single product

router.get('/get-product/:slug',getSingleProduct);


// get photo:
router.get('/product-photo/:pid', productPhotoController);


router.delete('/delete-product/:pid', deleteProductController);


router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// filter product

router.post('/product-filters', productFilterController);

// product Count:
router.get('/product-count', productCountController);


// Products Per Page
router.get('/product-list/:page', productListController);



// search product
router.get('/search/:keyword', searchProductController);


// Similar Products
router.get('/related-product/:pid/:cid', relatedProductController);


// category wise product

router.get('/product-category/:slug', productCategoryController);



// Payments route
// token
router.get('/braintree/token', braintreeTokenController);


router.post('/braintree/payment', requireSignIn, braintreePaymentController);


export default router;
