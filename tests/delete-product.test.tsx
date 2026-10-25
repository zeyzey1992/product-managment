import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductPage from "../app/products/[id]/page";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
  useRouter: () => ({ push: jest.fn() }),
}));

test("sends a request to delete the product", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      id: "1",
      brand: "Dell",
      model: "XPS 13",
      description: "Lightweight laptop",
      price: 999,
      image: "/images/xps.jpg",
    }),
  });
  jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<ProductPage />);

  await screen.findByText("Dell XPS 13");
  fireEvent.click(screen.getByRole("button", { name: "Delete" }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/products/1",
      expect.objectContaining({ method: "DELETE" })
    );
  });
});