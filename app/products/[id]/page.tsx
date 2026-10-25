"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

function ProductDetails(){

    const {id} = useParams<{ id:string }>();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);


    useEffect(() => {
    fetch(`/api/products/${id}`)
    .then((res) => res.json())
    .then(setProduct)
    .catch(console.error);
      
  }, [id]);

  if(!product) return <p>Loading...</p>

  async function deleteProduct() {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });


    if(response.ok){
      alert("Product deleted successfully");
      router.push("/products");
    }else{
      alert("Could not delete product");
    }
  }
  
  return(
    <main>
        <h1>{product.brand} {product.model}</h1>
       
        <img
        src={product.image}
        alt=""
        width="300"/>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <Link className="delete-button" href={`/products/${id}/edit`}>Edit</Link>
        <button className="delete-button" onClick={deleteProduct}>Delete</button>
    </main>
  );

}

export default function ProductPage(){
    return(
        <Suspense fallback={<p>Loading...</p>}>
        <ProductDetails/>
        </Suspense>
    )
}
