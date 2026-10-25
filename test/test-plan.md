# Test Plan

## Purpose
I will check that the pages and product features work correctly, including when the user enters unusual or invalid information.

## Approach
I will use Jest and React Testing Library for unit tests. I will use sample products and mock the API responses for page tests. I will also check that a submitted product is saved in PocketBase using test data.

## Test cases

### Home page
- Check that the title, description, and products link appear.
- Check what happens if the homepage cannot load its text.

### Products page
- Check that product information appears.
- Check the empty-list and API-error cases.
- Check that a product without an image does not show a broken image.
- Check that clicking a product opens its details.

### Add product page
- Check that all form fields can be filled in and submitted.
- Check that a valid product is saved in PocketBase.
- Try empty fields, short and long text, numbers, wildcards, and special characters.
- Check what happens if adding the product fails.

### Product details page
- Check that the correct product information appears.
- Check what happens if the product cannot be found.
- Check that the delete button removes the product.

### Edit product page
- Check that the current product information appears in the form.
- Check that valid changes are saved.
- Try empty fields, invalid prices, long text, and special characters.
- Check what happens if updating the product fails.

### Admin page
- Check that the total for each brand is correct.
- Check that both charts display the brand totals.

### API routes
- Check listing, viewing, adding, editing, and deleting products.
- Check missing information, invalid data, missing products, and database errors.

## Coverage
I will include tests for the main pages, API routes, successful actions, error cases, and different user inputs.