describe('Login Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/user/login');
    });

    it('should not login with empty credentials', () => {
        // Submit the form without filling out any fields
        cy.get('.login-btn button[type="submit"]').click();

        // Check for validation errors
        cy.get('input[name="email"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please fill out this field.')
    });

    it('should show error message for incomplete email address', () => {
        // Fill out the email field with an incomplete email address
        cy.get('input[name="email"]').type('test');

        // Submit the form
        cy.get('.login-btn button[type="submit"]').click();

        // Check for error message
        cy.get('input[name="email"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('contain', "Please include an '@' in the email address");
    });

    it('should not allow login with invalid credentials', () => {
        cy.get('input[name="email"]').type('invalid@example.com');
        cy.get('input[name="password"]').type('invalidpassword');
        cy.get('.login-btn button[type="submit"]').click();
        cy.url().should('eq', 'http://127.0.0.1:8000/');
        cy.wait(1000);
        cy.get('.alert-danger').contains('Invalid email and password pleas try again!').should('be.visible');
    });

    it('should allow login with valid credentials', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('.login-btn button[type="submit"]').click();

        cy.url().should('eq', 'http://127.0.0.1:8000/');
        cy.wait(1000);
        cy.get('.alert-success').contains('Successfully login').should('be.visible');
    });

    it('should redirect to register page after clicking register button', () => {
        // Click the login button
        cy.contains('a', 'Register here').click();

        // Check if redirected to the register page
        cy.url().should('eq', 'http://127.0.0.1:8000/user/register');
    });
});
