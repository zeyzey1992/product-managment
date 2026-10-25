"use client";

import { Suspense, useEffect, useState, type FormEvent} from "react";
import { useParams, useRouter } from "next/navigation";

interface Product{
    brand: string;
    model: string;
    price: number;
    description: string;
}

function EditProduct(){
    const { id } = useParams<{ id: string}>();
    const router = useRouter();
    const [product, setProduct]= useState<Product>();

    useEffect(() => {
        fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then(setProduct)
        .catch(console.error);
    }, [id])


    async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: form.get("brand"),
        model: form.get("model"),
        price: Number(form.get("price")),
        description: form.get("description"),
      }),
    });

    if(response.ok){
        alert("Product updated successfully !!!!")
        router.push(`/products/${id}`);   
    }else{
        alert("Could not update product sorry!!!!");
    }

    }

    if(!product) return <p>Loading...</p>;

    return(
        <main className="edit-container">
            <h1>Edit product</h1>
            
            <form onSubmit={saveProduct}>
                <label>
                    <select name="brand" defaultValue={product.brand}>
                        <option value="Dell">Dell</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Acer">Acer</option>
                    </select>

                </label>

                <label>
                    Model
                    <input
                    name="model" defaultValue={product.model} required></input>
                </label>

                <label>
                    Price
                    <input
                    name="price"
                    type="number"
                    defaultValue={product.price}
                    required></input>
                </label>

                <label>
                    Description
                    <textarea
                    name="description"
                    defaultValue={product.description}
                    required></textarea>
                </label>

                <button type="submit">Save changes</button>
            </form>
        </main>
    );
}

export default function EditProductPage(){
    return(
        <Suspense fallback={<p>Loading...</p>}>
            <EditProduct/>
        </Suspense>
    );
}