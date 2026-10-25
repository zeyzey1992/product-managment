import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NewProductPage from "../app/products/new/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

test("shows all fields in the add product form", () => {
  render(<NewProductPage />);

  expect(screen.getByLabelText("Brand")).toBeTruthy();
  expect(screen.getByLabelText("Model")).toBeTruthy();
  expect(screen.getByLabelText("Price (€)")).toBeTruthy();
  expect(screen.getByLabelText("Description")).toBeTruthy();
});

test("submits the entered product details", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true });
  jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<NewProductPage />);

  fireEvent.change(screen.getByLabelText("Brand"), {
    target: { value: "Dell" },
  });
  fireEvent.change(screen.getByLabelText("Model"), {
    target: { value: "XPS 13" },
  });
  fireEvent.change(screen.getByLabelText("Price (€)"), {
    target: { value: "999" },
  });
  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: "Lightweight laptop" },
  });

  const form = screen.getByRole("button", { name: "Add product" }).closest("form");
  fireEvent.submit(form!);

  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});

test("submits a product with unusual characters", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true });
  jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<NewProductPage />);

  fireEvent.change(screen.getByLabelText("Brand"), {
    target: { value: "Dell" },
  });
  fireEvent.change(screen.getByLabelText("Model"), {
    target: { value: "XPS <>&*!" },
  });
  fireEvent.change(screen.getByLabelText("Price (€)"), {
    target: { value: "0" },
  });
  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: "Test @#$% & special characters" },
  });

  const form = screen.getByRole("button", { name: "Add product" }).closest("form");
  fireEvent.submit(form!);

  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});

