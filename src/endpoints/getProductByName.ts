import { Request, Response } from "express"
import { ProductDataBase } from "../data/ProductDataBase"

export async function getProductByName(req: Request, res: Response) {
  
    try {
        const { name } = req.params

        if (!name) {
            res.status(422).send("Name not informed!")
            return
        }

        const productDataBase = new ProductDataBase()
        
        const product = await productDataBase.findProductByName(name)

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