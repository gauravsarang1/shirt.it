import { redisClient } from "../config/redis";

// SET value
export async function setCache(
    key: string,
    value: any,
    ttl?: number, // seconds
) {
    const data = JSON.stringify(value);

    if (ttl) {
        await redisClient.set(key, data, {
            EX: ttl,
        });
    } else {
        await redisClient.set(key, data);
    }
}

// GET value
export async function getCache<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);

    if (!data) return null;

    return JSON.parse(data);
}

// DELETE (important)
export async function deleteCache(key: string) {
    await redisClient.del(key);
}
