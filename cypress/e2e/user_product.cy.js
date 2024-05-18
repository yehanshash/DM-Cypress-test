describe('Add Product', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/user/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('.login-btn button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/user');
    });

    it('should show validation error for empty fields', () => {
        // Navigate to the Add Product Page
        cy.contains('Vehicles').click();
        cy.contains('Add Vehicle').click();

        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="title"]').siblings('.text-danger').should('be.visible');
        cy.get('textarea[name="summary"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="price"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="model"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="mileage"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="phone_number"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a product successfully', () => {
        // Navigate to the Add Product Page
        cy.contains('Vehicles').click();
        cy.contains('Add Vehicle').click();

        // Fill out the form
        cy.get('input[name="title"]').type('Test Product');
        cy.get('textarea[name="summary"]').type('This is a test product summary', {force: true});
        cy.get('textarea[name="description"]').type('This is a test product description', {force: true});
        cy.get('select[name="cat_id"]').select('Cars'); // Select a category
        cy.get('input[name="price"]').type('100000');
        cy.get('select[name="brand_id"]').select('Honda'); // Select a brand
        cy.get('input[name="model"]').type('Test Model');
        cy.get('input[name="mileage"]').type('50000');
        cy.get('select[name="year"]').select('2022'); // Select a year
        cy.get('select[name="fuel_type"]').select('Petrol'); // Select a fuel type
        cy.get('select[name="transmission"]').select('Automatic'); // Select a transmission
        cy.get('input[name="phone_number"]').type('1234567890');
        cy.get('input[name="photo"]').type('http://example.com/test.jpg'); // Provide a photo URL
        cy.get('select[name="status"]').select('Active'); // Select a status

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Product Successfully added').should('be.visible');
    });

    it('should edit a product successfully', () => {
        // Navigate to the Product Page
        cy.contains('Vehicles').click();
        cy.get('.collapse-item').contains('Vehicle').click();

        // Navigate to the Edit Product Page
        cy.get('.fa-edit').first().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for product update
        cy.get('.alert-success').contains('Product Successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a product and cancel', () => {
        // Navigate to the Product Page
        cy.contains('Vehicles').click();
        cy.get('.collapse-item').contains('Vehicle').click();

        // Click delete button for the added product
        cy.get('.fa-trash-alt').first().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the product is not deleted
        cy.contains('Test Product').should('exist');

    });

    it('should delete a product successfully', () => {
        // Navigate to the Product Page
        cy.contains('Vehicles').click();
        cy.get('.collapse-item').contains('Vehicle').click();

        // Click delete button for the added product
        cy.get('.fa-trash-alt').first().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for product deletion
        cy.get('.alert-success').contains('Product successfully deleted').should('be.visible');
    });
});
