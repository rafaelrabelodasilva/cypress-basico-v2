/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    // Digitando em campos e clicando em elementos

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Rabelo')
        cy.get('#email').type('rafaelrabelodasilva@outlook.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com e-mail com formatação errada', function() {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Rabelo')
        cy.get('#email').type('rafaelrabelodasilva@outloo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone').type('aopsuhdasd').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Rabelo')
        cy.get('#email').type('rafaelrabelodasilva@outloo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Rafael').should('have.value', 'Rafael').clear().should('have.value', '')
        cy.get('#lastName').type('Rabelo').should('have.value', 'Rabelo').clear().should('have.value', '')
        cy.get('#email').type('rafaelrabelodasilva@outlook.com').should('have.value', 'rafaelrabelodasilva@outlook.com').clear().should('have.value', '')
        cy.get('#phone').type('12345678').should('have.value', '12345678').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    // Selecionando opções em campos de seleção suspensa

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    // Marcando inputs do tipo radio

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]') //Pega todos os elementos
            .should('have.length', 3)
            .each(function($radio) { //Passa por cada um dos elementos
                cy.wrap($radio) //Empacota o elemento para fazer uma verificação
                    .check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    })

    //Marcando e desmarcando inputs do tipo checkbox
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]') //Pega todos os elementos do tipo checkbox
        .check() //Marca todos eles
        .should('be.checked')
        .last() //Pega o último marcado
        .uncheck() //Desmarca ele
        .should('not.be.checked') //Faz a verificação se foi desmarcado
    })

    //Fazendo upload de arquivos com Cypress
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]') //Pega o input do tipo file
        .should('not.have.value') //Verifica que não tem valor
        .selectFile('./cypress/fixtures/example.json') //Seleciona o arquivo
        .should(function($input) {
            // console.log($input) //Log
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]') //Pega o input do tipo file
        .should('not.have.value') //Verifica que não tem valor
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}) //Pega o arquivo e arrasta para a página
        .should(function($input) {
            // console.log($input) //Log
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json')
            .as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //Lidando com links que abrem em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') //Remove o atributo target da tag
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
})