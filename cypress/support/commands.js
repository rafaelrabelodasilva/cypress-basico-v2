Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Rabelo')
    cy.get('#email').type('rafaelrabelodasilva@outlook.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})