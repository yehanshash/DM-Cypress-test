describe('Add Post', () => {
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
        // Navigate to the Add Post Page
        cy.contains('Posts').click();
        cy.contains('Add Post').click();

        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="title"]').siblings('.text-danger').should('be.visible');
        cy.get('textarea[name="summary"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a Post successfully in admin panel', () => {
        // Navigate to the Add Post Page
        cy.contains('Posts').click();
        cy.contains('Add Post').click();

        // Fill out the form
        cy.get('input[name="title"]').type('Test admin Post');
        cy.get('textarea[name="quote"]').type('This is a test admin Post quote', {force: true});
        cy.get('textarea[name="summary"]').type('This is a test admin Post summary', {force: true});
        cy.get('textarea[name="description"]').type('This is a test admin Post description', {force: true});
        cy.get('select[name="post_cat_id"]').select('Car'); // Select a category
        cy.get('input[name="photo"]').type('http://example.com/test.jpg'); // Provide a photo URL
        cy.get('select[name="status"]').select('Active'); // Select a status


        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Post Successfully added').should('be.visible');
    });

    it('should edit a Post successfully in admin panel', () => {
        // Navigate to the Post Page
        cy.contains('Posts').click();
        cy.get('.collapse-item').contains('Post').click();

        // Navigate to the Edit Post Page
        cy.get('.fa-edit').first().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for Post update
        cy.get('.alert-success').contains('Post Successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a Post and cancel in admin panel', () => {
        // Navigate to the Post Page
        cy.contains('Posts').click();
        cy.get('.collapse-item').contains('Post').click();

        // Click delete button for the added Post
        cy.get('.fa-trash-alt').first().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the Post is not deleted
        cy.contains('Test admin Post').should('exist');

    });

    it('should delete a Post successfully in admin panel', () => {
        // Navigate to the Post Page
        cy.contains('Posts').click();
        cy.get('.collapse-item').contains('Post').click();

        // Click delete button for the added Post
        cy.get('.fa-trash-alt').first().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for Post deletion
        cy.get('.alert-success').contains('Post successfully deleted').should('be.visible');
    });
});
