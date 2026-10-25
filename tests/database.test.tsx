/** @jest-environment node */

test("saves and reads a product from PocketBase", async () => {
  const model = "Jest test laptop";
  const form = new FormData();

  form.append("brand", "Dell");
  form.append("model", model);
  form.append("price", "1");
  form.append("description", "Temporary test product");
  form.append("image", "");

  let productId: string | undefined;

  try {
    const response = await fetch("http://localhost:3000/api/addProduct", {
      method: "POST",
      body: form,
    });

    expect(response.status).toBe(201);

    const createdProduct = await response.json();
    productId = createdProduct.id;

    const savedResponse = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const savedProduct = await savedResponse.json();

    expect(savedProduct.model).toBe(model);
  } finally {
    if (productId) {
      await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE",
      });
    }
  }
});