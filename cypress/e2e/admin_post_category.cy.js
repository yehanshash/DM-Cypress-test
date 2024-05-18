describe('Add Post Category', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/admin');
    });

    it('should show validation error for empty fields in admin panel Post Category', () => {
        // Navigate to the Add Post Category Page
        cy.get('[data-target="#postCategoryCollapse"]').click();
        cy.get('#postCategoryCollapse').contains('.collapse-item', 'Add Category').click();


        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="title"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a Post Category successfully in admin panel', () => {
        // Navigate to the Add Post Category Page
        cy.get('[data-target="#postCategoryCollapse"]').click();
        cy.get('#postCategoryCollapse').contains('.collapse-item', 'Add Category').click();

        // Fill out the form
        cy.get('input[name="title"]').type('Test admin Post Category');
        cy.get('select[name="status"]').select('Active'); // Select a status


        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Post Category Successfully added').should('be.visible');
    });

    it('should edit a Post Category successfully in admin panel', () => {
        // Navigate to the Post Category Page
        cy.get('[data-target="#postCategoryCollapse"]').click();
        cy.get('#postCategoryCollapse').contains('.collapse-item', 'Category').click();


        // Navigate to the Edit Post Category Page
        cy.get('.fa-edit').last().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for Post Category update
        cy.get('.alert-success').contains('Post Category Successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a Post Category and cancel in admin panel Post Category', () => {
        // Navigate to the Post Category Page
        cy.get('[data-target="#postCategoryCollapse"]').click();
        cy.get('#postCategoryCollapse').contains('.collapse-item', 'Category').click();


        // Click delete button for the added Post Category
        cy.get('.fa-trash-alt').last().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the Post Category is not deleted
        cy.contains('Test admin Post Category').should('exist');

    });

    it('should delete a Post Category successfully in admin panel Post Category', () => {
        // Navigate to the Post Category Page
        cy.get('[data-target="#postCategoryCollapse"]').click();
        cy.get('#postCategoryCollapse').contains('.collapse-item', 'Category').click();


        // Click delete button for the added Post Category
        cy.get('.fa-trash-alt').last().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for Post Category deletion
        cy.get('.alert-success').contains('Post Category successfully deleted').should('be.visible');
    });
});
