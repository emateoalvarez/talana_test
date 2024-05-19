/// <reference types="cypress" />

describe('Shopping Cart Update Test', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/index.html')
    })

    function verifyProductAddedAlert() {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Product added.')
        })
    }

    it('validates that the shopping cart updates correctly when adding and removing items', () => {
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

        const products = [
            { name: 'Samsung galaxy s6', price: 360 },
            { name: 'Dell i7 8gb', price: 700 },
            { name: 'ASUS Full HD', price: 230 }
        ];
        
        cy.get('#tbodyid').children().should('have.length', products.length);

        let total = 0;
        products.forEach((product) => {
            cy.get('#tbodyid').contains('td', product.name).should('be.visible');
            total += product.price;
        });

        cy.get('#totalp').should('contain', total);

        // Remove an item and verify the total
        cy.get('#tbodyid').contains('td', 'Dell i7 8gb').parent().contains('Delete').click();

        const remainingProducts = products.filter(product => product.name !== 'Dell i7 8gb');
        let newTotal = 0;
        remainingProducts.forEach((product) => {
            newTotal += product.price;
        });

        cy.get('#tbodyid').children().should('have.length', remainingProducts.length);
        cy.get('#totalp').should('contain', newTotal);
    })
})
