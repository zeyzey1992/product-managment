"use client";

import { useRouter } from "next/navigation";
import { type FormEvent } from "react";

export default function NewProductPage(){

    const router = useRouter();

    async function addProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const response = await fetch("/api/addProduct", {
            method: "POST",
            body: form,
        });

        if(response.ok){
            alert("Product added successfully");
            router.push("/products")
        }else{
            alert("sorry!!! Could not add product");
        }
    }

    
    return(
        <main className="form-page">
            <section className="product-form-card">
            <p className="form-p">PRODUCT CATALOGUE</p>
            <h1>Add a laptop</h1>
            <p className="form-p2">Enter the laptop details below to add it to your catalogue.</p>

            <form className="product-form" onSubmit={addProduct}>
                <label className="form-field">
                Brand
                <select name="brand" required>
                    <option value="">Select a brand</option>
                    <option value="Dell">Dell</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Acer">Acer</option>    
                </select>
                </label>

                <label className="form-field">
                    Model
                    <input name="model" placeholder="e.g. XPS 13" required />
                </label>

                <label className="form-field">
                    Price (€)
                    <input name="price" type="number" min="0" step="0.01" placeholder="e.g. 999" required />
                </label>

                <label className="form-field">
                    Description
                    <textarea name="description" rows={4} placeholder="Describe the laptop" required />
                </label>

                <button className="submit-button" type="submit">Add product</button>
            </form>
            </section>
        </main>
    );
}
