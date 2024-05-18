describe('Add Product', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/admin');
    });

    it('should show validation error for empty fields in admin panel', () => {
        // Navigate to the Add Product Page
        cy.contains('Products').click();
        cy.contains('Add Product').click();

        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="title"]').siblings('.text-danger').should('be.visible');
        cy.get('textarea[name="summary"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="price"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="model"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="mileage"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a product successfully in admin panel', () => {
        // Navigate to the Add Product Page
        cy.contains('Products').click();
        cy.contains('Add Product').click();

        // Fill out the form
        cy.get('input[name="title"]').type('Test admin Product');
        cy.get('textarea[name="summary"]').type('This is a test admin product summary', {force: true});
        cy.get('textarea[name="description"]').type('This is a test admin product description', {force: true});
        cy.get('select[name="cat_id"]').select('Cars'); // Select a category
        cy.get('input[name="price"]').type('100000');
        cy.get('select[name="brand_id"]').select('Honda'); // Select a brand
        cy.get('input[name="model"]').type('Test admin Model');
        cy.get('input[name="mileage"]').type('50000');
        cy.get('select[name="year"]').select('2022'); // Select a year
        cy.get('select[name="fuel_type"]').select('Petrol'); // Select a fuel type
        cy.get('select[name="transmission"]').select('Automatic'); // Select a transmission
        cy.get('input[name="phone_number"]').type('1234567891');
        cy.get('select[name="condition"]').select('Default'); // Select a condition
        cy.get('input[name="photo"]').type('http://example.com/test.jpg'); // Provide a photo URL
        cy.get('select[name="status"]').select('Active'); // Select a status


        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Product Successfully added').should('be.visible');
    });

    it('should edit a product successfully in admin panel', () => {
        // Navigate to the Product Page
        cy.contains('Products').click();
        cy.get('.collapse-item').contains('Product').click();

        // Navigate to the Edit Product Page
        cy.get('.fa-edit').first().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for product update
        cy.get('.alert-success').contains('Product Successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a product and cancel in admin panel', () => {
        // Navigate to the Product Page
        cy.contains('Products').click();
        cy.get('.collapse-item').contains('Product').click();

        // Click delete button for the added product
        cy.get('.fa-trash-alt').first().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the product is not deleted
        cy.contains('Test admin Product').should('exist');

    });

    it('should delete a product successfully in admin panel', () => {
        // Navigate to the Product Page
        cy.contains('Products').click();
        cy.get('.collapse-item').contains('Product').click();

        // Click delete button for the added product
        cy.get('.fa-trash-alt').first().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for product deletion
        cy.get('.alert-success').contains('Product successfully deleted').should('be.visible');
    });
});
