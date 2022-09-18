/*
    This file contains specification for the routes used for products CRUD
*/

import express from "express";
import { checkIfProductExists } from "../middleware/checkProduct.middleware";
import { productsController } from "../controllers/products.controller";

export const productRoutes = express.Router();

productRoutes.get('/product/:productName', productsController.getProduct);
productRoutes.get('/product', productsController.getAllProducts);
productRoutes.post('/product', [checkIfProductExists], productsController.addProduct);
productRoutes.put('/product', [checkIfProductExists], productsController.editProduct);
productRoutes.delete('/product', [checkIfProductExists], productsController.deleteProduct);
