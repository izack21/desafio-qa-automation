const {
    realPress
} = require("cypress-real-events/commands/realPress");

describe('Testes de Login - Automation Practice', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('1. Deve fazer login com credenciais invalidas', () => {
        cy.get('#email').type('usuario_valido@example.com');
        cy.get('#passwd').type('senhaValida123');
        cy.get('#SubmitLogin').click();
        cy.get('#center_column > :nth-child(2)').should('be.visible')
        cy.get('.alert-danger').contains('Authentication failed.');

    });
    it('2. Deve validar quando inserido e-mail invalido', () => {
        cy.get('#email').type('usu.com.br').pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#SubmitLogin').click();
        cy.get('.alert-danger').contains('Invalid email address.');
    });

    it('3. Deve validar que E-mail é obrigatório', () => {
        cy.get('#SubmitLogin').click();
        cy.get('.alert-danger').contains('An email address required.');
    });
    it('4. Deve validar que senha é obrigatória', () => {
        cy.get('#email').type('email@rmail.com');
        cy.get('#passwd').click().pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#SubmitLogin').click();
        cy.get('.alert-danger').contains('Password is required.');
    });
    it('5. Deve validar o preenchido valido dos campos de Login', () => {
        cy.get('#email').click().pressTab();
        cy.get('#passwd').click('').pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#email').type('praticas@praticas.com.br').pressTab();
        cy.get('#passwd').type('123456').pressTab();
        cy.get('.form-group').should('have.class', 'form-ok');

    });

    it('6. Deve ser possivel Login com Sucesso', () => {
        cy.get('#email').type('praticas@praticas.com.br');
        cy.get('#passwd').type('123456');
        cy.get('#SubmitLogin').click();
        cy.url().should('eq', 'http://www.automationpractice.pl/index.php?controller=my-account/')
    });
});