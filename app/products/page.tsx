"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

type Laptop = {
    id: string;
    brand: string;
    model: string;
    description: string;
    price: number;
    image: string;
}

export default  function ProductPage(){

    const [laptops, setLaptops] = useState<Laptop[]>([]);

   useEffect(() => {
  async function loadLaptops() {
    try {
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Products could not be loaded");
      }

      const data: Laptop[] = await response.json();
      setLaptops(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadLaptops();
}, []);

    return(
        <main style={{ maxWidth: 900, margin: "40px auto", padding: 20}}>

            <h1>Laptop Products</h1>
            <p>Browse the laptop in our product catalogue.</p>

            <ul style={{ listStyle: "none", padding: 0}}>
                {laptops.map((laptop) =>(
                    <li
                    key={laptop.id}
                    style={{ 
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        padding: 16,
                        marginTop: 12,
                    }}
                    >
                    {laptop.image && (
                    <img
                        src={laptop.image}
                        alt={`${laptop.brand} ${laptop.model}`}
                        loading="lazy"
                        style={{
                        width: 220,
                        height: 150,
                        objectFit: "contain",
                        display: "block",
                        marginBottom: 12,
                        }}
                    />
                    )}
                    <Link href={`/products/${laptop.id}`}>
                    <strong>{laptop.brand}</strong> - {laptop.model}
                    </Link>
                    <p>{laptop.description}</p>
                    <span style={{ color: "#00c010ff", fontSize: "22px", fontWeight: 700 }}>€{laptop.price}</span>
                    </li>
                ))}
            </ul>

        </main>
    );
}
