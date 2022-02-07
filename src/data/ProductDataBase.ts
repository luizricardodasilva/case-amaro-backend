import { BaseDataBase } from "./BaseDataBase"
import { Product } from "../model/Product"
import { IdGenerator } from "../services/IdGenerator"

export class ProductDataBase extends BaseDataBase {

    public async createProduct(product: Product): Promise<void> {

        try {
            await BaseDataBase.connection("Amaro_Product").insert({
                id: product.getId(),
                name: product.getName()
            })

            for (let tag of product.getTags()) {

                const idGenerator = new IdGenerator()

                const idTag = idGenerator.generate()

                await BaseDataBase.connection("Amaro_Tag").insert({
                    id: idTag,
                    name: tag
                })

                await BaseDataBase.connection("Amaro_Product_Tag").insert({
                    id_product: product.getId(),
                    id_tag: idTag
                })
            }
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findProductById(id: string): Promise<Product> {

        try {
            const product = await BaseDataBase.connection("Amaro_Product")
                .select()
                .where({ id })

            return product[0] && Product.toProductModel(product[0])

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findProductByIdForQuery(id: string): Promise<any> {

        try {
            const product = await BaseDataBase.connection("Amaro_Product")
                .select("Amaro_Product.id as id", "Amaro_Product.name as name", "Amaro_Tag.name as tags")
                .from("Amaro_Product_Tag")
                .innerJoin("Amaro_Product", "Amaro_Product_Tag.id_product", "Amaro_Product.id")
                .innerJoin("Amaro_Tag", "Amaro_Product_Tag.id_tag", "Amaro_Tag.id")
                .where({ "Amaro_Product.id": id })

            return product[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findProductByName(name: string): Promise<any> {

        try {
            const product = await BaseDataBase.connection("Amaro_Product")
                .select("Amaro_Product.id as id", "Amaro_Product.name as name", "Amaro_Tag.name as tags")
                .innerJoin("Amaro_Product", "Amaro_Product_Tag.id_product", "Amaro_Product.id")
                .innerJoin("Amaro_Tag", "Amaro_Product_Tag.id_tag", "Amaro_Tag.id")
                .from("Amaro_Product_Tag")
                .where({ "Amaro_Product.name": name })
    
            return product[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findProductByTag(tag: string): Promise<Product> {
        
        try {
            const product = await BaseDataBase.connection("Amaro_Tag")
                .select("Amaro_Product.id as id", "Amaro_Product.name as name", "Amaro_Tag.name as tags")
                .innerJoin("Amaro_Product", "Amaro_Product_Tag.id_product", "Amaro_Product.id")
                .innerJoin("Amaro_Tag", "Amaro_Product_Tag.id_tag", "Amaro_Tag.id")
                .from("Amaro_Product_Tag")
                .where({ "Amaro_Tag.name": tag })

                return product[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}