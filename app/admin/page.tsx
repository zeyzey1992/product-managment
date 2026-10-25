"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

interface Product {
  brand: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const brandData = ["Dell", "Lenovo", "Acer"].map((brand) => ({
    brand,
    quantity: products.filter((product) => product.brand === brand).length,
  }));

  return (
    <main>
      <h1>Admin Statistics</h1>
     <BarChart width={400} height={300} data={brandData}>
        <XAxis dataKey="brand"/>
        <YAxis/>
        <Bar dataKey="quantity" fill="green"/>
     </BarChart>

     <div style={{ width:500, maxWidth: "100%", height: 300}}>
        <Line
        data={{
            labels: brandData.map((item) => item.brand),
            datasets: [
                {
                    label: "Laptops in stock",
                     data: brandData.map((item) => item.quantity),
                     borderColor: "blue",
                },
            ],
        }}
         options={{ responsive: true, maintainAspectRatio: false }}
        />
     </div>
     
    </main>
  );
}