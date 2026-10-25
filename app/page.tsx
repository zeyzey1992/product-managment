"use client";

import { useEffect, useState } from "react";

interface HomeContent {
  title: string;
  description: string;
  linkText: string;
}

export default function Home(){

  const [content, setContent]= useState<HomeContent>();

  useEffect(() =>{
    fetch("/api/home")
    .then((res) => res.json())
    .then(setContent)
    .catch(console.error);
  }, []);

  if(!content) return null;

  return(
    <main style={{ padding: "3rem", fontFamily: "Arial, sans-serif"}}>
      
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <a href="/products">{content.linkText}</a>

    </main>
  );
}