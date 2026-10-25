import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditProductPage from "../app/products/[id]/edit/page";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
  useRouter: () => ({ push: jest.fn() }),
}));

test("shows the product in the edit form", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({
      id: "1",
      brand: "Dell",
      model: "XPS 13",
      description: "Lightweight laptop",
      price: 999,
    }),
  });

  render(<EditProductPage />);

  expect(await screen.findByDisplayValue("XPS 13")).toBeTruthy();
});


test("sends the product update request", async () => {
  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      json: async () => ({
        id: "1",
        brand: "Dell",
        model: "XPS 13",
        description: "Lightweight laptop",
        price: 999,
      }),
    })
    .mockResolvedValueOnce({ ok: true });

  jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<EditProductPage />);

  const model = await screen.findByDisplayValue("XPS 13");
  fireEvent.change(model, { target: { value: "XPS 15" } });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/api/products/1",
      expect.objectContaining({ method: "PATCH" })
    );
  });
});

