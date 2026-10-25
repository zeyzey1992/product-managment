import { createClient } from "redis";

const redis= createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket:{
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

redis.on("error", (error) => console.error("Redis hatasi:", error));

export async function getRedis(){
    if(!redis.isOpen){
        await redis.connect();
    }

    return redis;
}