import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();
    const key = "home-page-context";

    let content = await redis.get(key);

    if (!content) {
        content = JSON.stringify({
        title: "Laptop Product Manager",
        description: "Manage your laptop products in one place",
        linkText: "View products",
      });

      await redis.set(key, content);
    }

    return NextResponse.json(JSON.parse(content));

  } catch (error) {
    console.error("Redis connection error:", error);

    return NextResponse.json(
      { error: "Could not connect to Redis." },
      { status: 500 }
    );
  }
}