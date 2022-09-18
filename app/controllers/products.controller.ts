
import { Request, Response } from "express";
import { prisma } from '../server'

// Save Product to Database
const addProduct = (req: Request, res: Response) => {
    prisma.products.create({
        data: {
            productName: String(req.body.productName),
            description: String(req.body.description),
            price: Number(req.body.price),
        }
    })
        .then(() => {
            res.status(201).json({ message: `Product created` })
        })
        .catch((err: any) => {
            res.status(500).json({ message: err.message });
        });
};

// Edit Product in Database
const editProduct = async (req: Request, res: Response) => {
    const property = String(req.body.property);
    const propValue = String(req.body.propValue);
    const productName = String(req.body.productName)

    const product = await prisma.products.findFirst({
        where: {
            productName: req.body.productName
        }
    });

    if (product) {
        await prisma.products.update({
            where: {
                productName: productName
            },
            data: {
                [property]: propValue
            }
        }
        )
            .then(() => {
                res.status(200).json({ message: `Product edited` })
            })
            .catch((err: any) => {
                res.status(500).json({ message: err.message });
            });

    } else {
        res.status(404).json({ message: 'product not found' })
    }
};

// Delete Product in Database
const deleteProduct = async (req: Request, res: Response) => {
    const productName = String(req.body.productName)

    await prisma.products.delete({
        where: {
            productName: productName
        }
    })
        .then(() => {
            res.status(200).json({ message: `Product deleted` })
        })
        .catch((err: any) => {
            res.status(500).json({ message: err.message });
        });
};

// Get all Products in Database
const getAllProducts = (req: Request, res: Response) => {
    prisma.products.findMany()
        .then((products) => {
            res.status(200).json(products)
        })
        .catch((err: any) => {
            res.status(500).json({ message: err.message });
        });
}

// Get a single Product in Database by productName (passed by url param)
const getProduct = (req: Request, res: Response) => {
    const productName = String(req.params.productName);

    prisma.products.findFirst({
        where: {
            productName: productName
        }
    })
        .then((product) => {
            res.status(200).json(product)
        })
        .catch((err: any) => {
            res.status(500).json({ message: err.message });
        });
}

export const productsController = {
    addProduct,
    editProduct,
    deleteProduct,
    getAllProducts,
    getProduct
}
