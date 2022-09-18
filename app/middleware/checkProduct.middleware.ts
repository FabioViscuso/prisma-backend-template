import { Request, Response, NextFunction } from "express";
import { prisma } from "../server";

export const checkIfProductExists = async (req: Request, res: Response, next: NextFunction) => {
    const productName = String(req.body.productName);

    const product = await prisma.products.findFirst({
        where: {
            productName: productName
        }
    })
        .catch((err: any) => {
            res.status(500).json({ message: err.message })
        });

    if (product && req.method === 'POST') {
        res.status(409).json({ message: "Error: product already exists" });
        return;
    };
    if (!product && req.method === 'POST') {
        next();
    };
    if ((product && req.method === 'PUT')) {
        next();
    };
    if ((product && req.method === 'DELETE')) {
        next();
    };
    return;
};

