import { render, screen } from "@testing-library/react";
import ProductPage from "../app/products/[id]/page";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
  useRouter: () => ({ push: jest.fn() }),
}));

test("shows the selected product", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      id: "1",
      brand: "Dell",
      model: "XPS 13",
      description: "Lightweight laptop",
      price: 999,
      image: "/images/xps.jpg",
    }),
  });

  render(<ProductPage />);

  expect(await screen.findByText("Dell XPS 13")).toBeTruthy();
});

