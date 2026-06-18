import RedisCache from "@/shared/cache/RedisCache";
import { Product } from "../database/entities/Products";
import { productsRepositories } from "../database/repositories/ProductsRepositories";

export default class ListProductService {
    async execute(): Promise<Product[]> {
        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>("api-mysales-PRODUCT-LIST");

        if (!products) {
            products = await productsRepositories.find();
            await redisCache.save(
                "api-mysales-PRODUCT-LIST",
                JSON.stringify(products),
            );
        }

        return products;
    }
}
