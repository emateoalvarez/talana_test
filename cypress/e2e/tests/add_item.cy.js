/// <reference types="cypress" />

describe('Technical Test', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/index.html')
    })

    function verifyProductAddedAlert() {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Product added.')
        })
    }

    it('can add new items', () => {
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
        cy.get('[id="navbarExample"]').contains('Home').click()

        cy.get('.list-group-item').contains('Laptops').click()
        cy.get('[id="tbodyid"]').contains('Dell i7 8gb').click()
        cy.contains('Add to cart').click()

        verifyProductAddedAlert()
        cy.get('[id="navbarExample"]').contains('Home').click()

        cy.get('.list-group-item').contains('Monitors').click()
        cy.get('[id="tbodyid"]').contains('ASUS Full HD').click()
        cy.contains('Add to cart').click()

        verifyProductAddedAlert()

        cy.get('[id="navbarExample"]').contains('Cart').click()
        cy.get('#tbodyid').children().should('have.length', 3);
    })

})
