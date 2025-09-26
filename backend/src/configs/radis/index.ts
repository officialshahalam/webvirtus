import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_DATABASE_URL!);

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (error) => {
  console.error("❌ Redis connection error:", error);
});

export default redis;
