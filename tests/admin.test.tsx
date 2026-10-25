import { render, screen, waitFor } from "@testing-library/react";
import AdminPage from "../app/admin/page";

jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

test("shows the admin page and loads products", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => [{ brand: "Dell" }],
  });

  render(<AdminPage />);

  expect(screen.getByText("Admin Statistics")).toBeTruthy();

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith("/api/products");
  });
});