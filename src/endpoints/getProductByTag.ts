import { Request, Response } from "express"
import { ProductDataBase } from "../data/ProductDataBase"

export async function getProductByTag(req: Request, res: Response) {
  
    try {
        const { tag } = req.params 

        if (!tag) {
            res.status(422).send("Tag not informed!")
            return
        }

        const productDataBase = new ProductDataBase()
        
        const product: any = await productDataBase.findProductByTag(tag)

        if (!product) {
            res.status(404).send("No products match the indicated tag!")
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