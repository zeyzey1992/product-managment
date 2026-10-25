import { NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

interface Context{
    params : Promise<{ id:string}>;
};

export async function GET( request: Request, { params }: Context){
  
    await authenticate();
    const { id } = await params;
    const product = await db.collection("products").getOne(id);

    return NextResponse.json(product);
}

export async function PATCH( request: Request, { params }: Context){

    await authenticate();
    const{ id } = await params;
    const body = await request.json();
    const product = await db.collection("products").update(id, body);

    return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: Context){

    await authenticate();
    const { id } = await params;
    await db.collection("products").delete(id);

    return NextResponse.json({ success: true});
}