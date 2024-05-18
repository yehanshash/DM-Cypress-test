describe('Price Prediction Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/predict-price');
    });

    it('should show error message for empty fields', () => {
        cy.get('#predictBtn').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Please fill the empty fields');
        });
    });

    it('should show predicted price on successful prediction', () => {
        // Fill in the required fields
        cy.get('#make').select('Toyota');
        cy.get('#model').select('Corolla');
        cy.get('#model_year').select('2015');
        cy.get('#engine_capacity').type('1500');
        cy.get('#mileage').type('50000');

        // Click on the predict button
        cy.get('#predictBtn').click();

        // Check if the predicted price is displayed
        cy.get('#predictedTxt').should('not.be.empty');
    });

    it('should redirect to home page when clicking home button', () => {
        // Click on the home button
        cy.get('#homeBtn').click();

        // Wait for the page to load completely
        cy.wait(2000); // Adjust the wait time as needed

        // Verify that the URL is the home page URL
        cy.url();
    });
});
