describe('Register Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/user/register');
    });

    it('should not register with empty credentials', () => {
        // Submit the form without filling out any fields
        cy.get('.login-btn button[type="submit"]').click();

        // Check for validation errors
        cy.get('input[name="name"]:invalid')
        .invoke('prop', 'validationMessage')
        .should('equal', 'Please fill out this field.')
    });

    it('should not register with passwords mismatch', () => {
        // Fill out the registration form with mismatching passwords
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="password_confirmation"]').type('password456');

        // Submit the form
        cy.get('.login-btn button[type="submit"]').click();

        // Check if redirected to the home page with error message
        cy.url().should('eq', 'http://127.0.0.1:8000/');
    });

    it('should register with valid credentials', () => {
        // Fill out the registration form with valid credentials
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="password_confirmation"]').type('password123');

        // Submit the form
        cy.get('.login-btn button[type="submit"]').click();

        // Check if redirected to the home page with success message
        cy.url().should('eq', 'http://127.0.0.1:8000/');
        cy.wait(1000);
        cy.get('.alert-success').contains('Successfully registered').should('be.visible');

    });

    it('should redirect duplicated user to home page', () => {
        // Fill out the registration form with valid credentials
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('test@example.com'); // Assuming this email is already registered
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="password_confirmation"]').type('password123');

        // Submit the form
        cy.get('.login-btn button[type="submit"]').click();

        // Check if redirected to the home page
        cy.url().should('eq', 'http://127.0.0.1:8000/');

    });


    it('should redirect to login page after clicking login button', () => {
    // Click the login button
        cy.contains('a', 'Login here').click();

    // Check if redirected to the login page
        cy.url().should('eq', 'http://127.0.0.1:8000/user/login');
  });

});
