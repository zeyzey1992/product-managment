import { NextRequest, NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

interface ProducInput{
    brand: string;
    model: string;
    description: string;
    price: number;
    image:string;
}

export async function POST(request: NextRequest) {

    await authenticate();

    const form = await request.formData();

    const body: ProducInput = {
        brand: String(form.get("brand") ?? ""),
        model: String(form.get("model") ?? ""),
        description: String(form.get("description") ?? ""),
        price: Number(form.get("price") ?? ""),
        image: String(form.get("image") ?? ""),
    };

    const product = await db.collection("products").create(body);

    return NextResponse.json(product, { status: 201});
}