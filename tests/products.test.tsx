import { render, screen } from "@testing-library/react";
import ProductPage from "../app/products/page";


test("shows products returned by the API", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: "1",
        brand: "Dell",
        model: "XPS 13",
        description: "Lightweight laptop",
        price: 999,
        image: "",
      },
    ],
  });

  render(<ProductPage />);

  expect(await screen.findByText("Lightweight laptop")).toBeTruthy();
});

