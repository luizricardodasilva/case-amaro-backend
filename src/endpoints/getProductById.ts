import { Request, Response } from "express"
import { ProductDataBase } from "../data/ProductDataBase"

export async function getProductById(req: Request, res: Response) {
    
    try {
        const { id } = req.params

        if (!id) {
            res.status(422).send("Id not informed!")
            return
        }

        const productDataBase = new ProductDataBase()

        const product = await productDataBase.findProductByIdForQuery(id)

        if (!product) {
            res.status(404).send("Product not found!")
            return
        }

        const result = {
            id: product.id,
            name: product.name,
            tags: product.tags
        }

        res.status(200).send(result)

    } catch (error: any) {
        res.status(400).send(error.message)
    }
}