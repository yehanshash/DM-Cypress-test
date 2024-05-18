describe('Add Banner', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/admin');
    });

    it('should show validation error for empty fields in admin panel banner', () => {
        // Navigate to the Add Banner Page
        cy.contains('Banners').click();
        cy.contains('Add Banners').click();

        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="title"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a banner successfully in admin panel', () => {
        // Navigate to the Add Banner Page
        cy.contains('Banners').click();
        cy.contains('Add Banners').click();

        // Fill out the form
        cy.get('input[name="title"]').type('Test admin Banner');
        cy.get('textarea[name="description"]').type('This is a test admin banner description', {force: true});
        cy.get('input[name="photo"]').type('http://example.com/test.jpg'); // Provide a photo URL
        cy.get('select[name="status"]').select('Active'); // Select a status


        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Banner successfully added').should('be.visible');
    });

    it('should edit a Banner successfully in admin panel', () => {
        // Navigate to the Banner Page
        cy.contains('Banners').click();
        cy.get('.collapse-item').contains('Banner').click();

        // Navigate to the Edit Banner Page
        cy.get('.fa-edit').last().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for Banner update
        cy.get('.alert-success').contains('Banner successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a Banner and cancel in admin panel banner', () => {
        // Navigate to the Banner Page
        cy.contains('Banners').click();
        cy.get('.collapse-item').contains('Banner').click();

        // Click delete button for the added Banner
        cy.get('.fa-trash-alt').last().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the Banner is not deleted
        cy.contains('Test admin Banner').should('exist');

    });

    it('should delete a Banner successfully in admin panel banner', () => {
        // Navigate to the Banner Page
        cy.contains('Banners').click();
        cy.get('.collapse-item').contains('Banner').click();

        // Click delete button for the added Banner
        cy.get('.fa-trash-alt').last().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for Banner deletion
        cy.get('.alert-success').contains('Banner successfully deleted').should('be.visible');
    });
});
