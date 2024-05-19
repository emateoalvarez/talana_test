/// <reference types="cypress" />

describe('Checkout Flow with Credit Card Number Validation', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/index.html')
    })

    function verifyProductAddedAlert() {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Product added.')
        })
    }

    it('automates the checkout flow and validates credit card number', () => {
        cy.get('[id="navbarExample"]').contains('Log in').click()

        cy.fixture('data.json').then((user) => {
            cy.wait(1000)
            cy.get('[id="loginusername"]').should('be.visible').type(user.username)
            cy.get('[id="loginpassword"]').should('be.visible').type(user.password)
            cy.get('[type="button"]').contains('Log in').click()
            cy.get('[id="nameofuser"]').should('contain', `Welcome ${user.username}`)
        });

        cy.get('.list-group-item').contains('Phones').click()
        cy.get('[id="tbodyid"]').contains('Samsung galaxy s6').click()
        cy.contains('Add to cart').click()
        verifyProductAddedAlert()
        cy.get('[id="navbarExample"]').contains('Cart').click()

        cy.contains('Place Order').click()

        const cardNumber = '4111111111111111';
        cy.get('[id="name"]').type('John Doe')
        cy.get('[id="country"]').type('USA')
        cy.get('[id="city"]').type('New York')
        cy.get('[id="card"]').type(cardNumber)
        cy.get('[id="month"]').type('12')
        cy.get('[id="year"]').type('2025')

        cy.get('[onclick="purchaseOrder()"]').click()
        
        cy.get('.sweet-alert').should('be.visible').within(() => {
            cy.contains(cardNumber)
            cy.contains('OK').click()
        })
    })
})
