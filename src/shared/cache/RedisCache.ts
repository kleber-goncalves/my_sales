import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@/config/cache";

export default class RedisCache {
    private client: RedisClient;

    // construtor do redis cache com a configuracao passada como parametro para o redis client e a instancia do redis client criada no construtor ser armazenada na variavel client
    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    // metodo para salvar dados no redis com a chave passada como parametro e o valor passado como parametro em JSON string format
    async save(key: string, value: string): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    // metodo para recuperar dados do redis com a chave passada como parametro e retorna o valor em JSON string format ou null se nao encontrar nenhum dado com essa chave no redis
    async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}
