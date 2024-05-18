describe('Edit User Profile', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/user/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('.login-btn button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/user');
    });

    it('should navigate to user profile page and update the name', () => {
        // Click on the user dropdown menu
        cy.get('#userDropdown').click();

        // Click on the profile link
        cy.get('.dropdown-menu').contains('Profile').click();

        // Verify that we are on the profile page
        cy.url().should('include', '/user/profile');

        // Change the name in the input field
        cy.get('input[name="name"]').clear().type('John De');

        // Click the update button
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Successfully updated your profile').should('be.visible');

        // Check if the updated name is displayed on the page
        cy.contains('John De').should('exist');
    });


    it('Allows user to change password successfully', () => {

        cy.get('#userDropdown').click();
        // Click on the "Change Password" link
        cy.contains('Change Password').click();

        // Fill out the form with old and new passwords
        cy.get('#password').type('password123'); // Old password
        cy.get('#new_password').type('password12345'); // New password
        cy.get('#new_confirm_password').type('password12345'); // Confirm new password
        // Submit the form
        cy.get('button[type="submit"]').click();
        // Verify that the success message is displayed
        cy.contains('Password successfully changed').should('be.visible');
        cy.wait(1000);


        // Back to old password
        cy.get('#userDropdown').click();
        // Click on the "Change Password" link
        cy.contains('Change Password').click();
        cy.get('#password').type('password12345'); // Old password
        cy.get('#new_password').type('password123'); // New password
        cy.get('#new_confirm_password').type('password123'); // Confirm new password
        // Submit the form
        cy.get('button[type="submit"]').click();
        // Verify that the success message is displayed
        cy.contains('Password successfully changed').should('be.visible');
    });
});
