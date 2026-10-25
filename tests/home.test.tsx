import { render, screen } from "@testing-library/react";
import Home from "../app/page";

test("shows the homepage title", async() =>{
    global.fetch = jest.fn().mockResolvedValue({
        json: async () =>({
            title: "Laptop Product Manager",
            description: "Manage your laptop products in one place.",
            linkText: "View products",
        }),
    });

    render(<Home />);

    expect(
        await screen.findByText("Laptop Product Manager")
    ).toBeTruthy();
});