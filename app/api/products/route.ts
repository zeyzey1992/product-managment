import { NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

interface Context{
    params : Promise<{id:string}>;
}

interface Product{
    id: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  image: string;
}
export async function GET( request: Request, { params }: Context){
    
    await authenticate();
    const product = await db.collection("products").getFullList<Product>({
        fields: " id, brand, model, price, description, image",

    });
    return NextResponse.json(product);

}