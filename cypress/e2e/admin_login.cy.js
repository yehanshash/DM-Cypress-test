describe('Login Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login');
    });

    it('admin should not login with empty credentials', () => {
        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check for validation errors
        cy.get('input[name="email"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please fill out this field.')
    });

    it('admin should show error message for incomplete email address', () => {
        // Fill out the email field with an incomplete email address
        cy.get('input[name="email"]').type('test');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for error message
        cy.get('input[name="email"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('contain', "Please include an '@' in the email address");
    });

    it('admin should allow login with valid credentials', () => {
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.url().should('eq', 'http://127.0.0.1:8000/admin');
    });

    it('admin should not allow login with invalid credentials', () => {
        cy.get('input[name="email"]').type('invalid@example.com');
        cy.get('input[name="password"]').type('invalidpassword');
        cy.get('button[type="submit"]').click();
        //Check if redirected to the home page
        cy.url().should('eq', 'http://127.0.0.1:8000/');
    });


});
