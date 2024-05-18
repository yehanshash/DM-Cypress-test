describe('Add Users', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/admin');
    });

    it('should show validation error for empty fields in admin panel Users', () => {
        // Navigate to the Add Users Page
        cy.contains('Users').click();
        cy.get('a[title="Add User"]').click();

        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="name"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="email"]').siblings('.text-danger').should('be.visible');
        cy.get('input[name="password"]').siblings('.text-danger').should('be.visible');
        cy.get('select[name="role"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a Users successfully in admin panel', () => {
        // Navigate to the Add Users Page
        cy.contains('Users').click();
        cy.get('a[title="Add User"]').click();

        // Fill out the form
        cy.get('input[name="name"]').type('Test admin User');
        cy.get('input[name="email"]').type('testuser@gmail.com');
        cy.get('input[name="password"]').type('testuser123');
        cy.get('input[name="photo"]').type('http://example.com/test.jpg'); // Provide a photo URL
        cy.get('select[name="role"]').eq(0).select('admin', { force: true });// Select a role
        cy.get('select[name="status"]').select('Active'); // Select a status


        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Successfully added user').should('be.visible');
    });

    it('should edit a Users successfully in admin panel', () => {
        // Navigate to the Users Page
        cy.contains('Users').click();

        // Navigate to the Edit Users Page
        cy.get('.fa-edit').last().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for Users update
        cy.get('.alert-success').contains('Successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a Users and cancel in admin panel Users', () => {
        // Navigate to the Users Page
        cy.contains('Users').click();

        // Click delete button for the added Users
        cy.get('.fa-trash-alt').last().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the Users is not deleted
        cy.contains('Test admin User').should('exist');

    });

    it('should delete a Users successfully in admin panel Users', () => {
        // Navigate to the Users Page
        cy.contains('Users').click();

        // Click delete button for the added Users
        cy.get('.fa-trash-alt').last().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for Users deletion
        cy.get('.alert-success').contains('User Successfully deleted').should('be.visible');
    });
});
