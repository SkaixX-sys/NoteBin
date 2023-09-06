import { createHash } from "crypto";
import redis from "ioredis";

const redisClient = new redis();
redisClient.on("error", () => {});

// Генерация уникального хэша на основе случайных данных
export function generateUniqueHash() {
  const randomData = Math.random().toString();
  const hash = createHash("sha256").update(randomData).digest("hex");
  return hash;
}

// Создание 10 уникальных хэшей и сохранение их в Redis
export async function generateAndStoreHashes() {
  for (let i = 0; i < 10; i++) {
    const uniqueHash = generateUniqueHash();
    console.log(`Сгенерирован уникальный хэш: ${uniqueHash}`);
    await redisClient.sadd("unique_hashes", uniqueHash);
  }
}
