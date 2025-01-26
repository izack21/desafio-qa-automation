const {
    realPress
} = require("cypress-real-events/commands/realPress");

describe('I - Testes de Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('1. Deve fazer login com credenciais invalidas', () => {
        /*
         Dado que o usuário está na página inicial do site
         Quando tentar informar email e/ou senha invalidos
         Então a página deve retornar critica relacionada aos dados invalidos
        */
        cy.get('#email').type('usuario_valido@example.com');
        cy.get('#passwd').type('senhaValida123');
        cy.get('#SubmitLogin').click();
        cy.get('#center_column > :nth-child(2)').should('be.visible')
        cy.get('.alert-danger').contains('Authentication failed.');

    });
    it('2. Deve validar quando inserido e-mail invalido', () => {
        /*
         Dado que o usuário está operando o formulário de login
         Quando insere um texto em formato diferente de e-mail
         Então a página deve retornar uma critíca quanto ao formato do e-mail
        */
        cy.get('#email').type('usu.com.br').pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#SubmitLogin').click();
        cy.get('.alert-danger').contains('Invalid email address.');
    });

    it('3. Deve validar que E-mail é obrigatório', () => {
        /*
         Dado que o usuário esta operando o formulário de login
         Quando não preenche o campo e-mail e tenta realizar login
         Então a página deve retornar critica quanto ao não preenchimento do campo
        */
        cy.get('#SubmitLogin').click();
        cy.get('.alert-danger').contains('An email address required.');
    });
    it('4. Deve validar que senha é obrigatória', () => {
        /*
         Dado que o usuário esta operando o formulário de login
         Quando não preenche o campo senha e tenta realizar login
         Então a página deve retornar critica quanto ao não preenchimento do campo
        */
        cy.get('#email').type('email@rmail.com');
        cy.get('#passwd').click().pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#SubmitLogin').click();
        cy.get('.alert-danger').contains('Password is required.');
    });
    it('5. Deve validar o preenchido valido dos campos de Login', () => {
        /*
         Dado que o usuário esta operando o formulário de login
         Quando o usuário não preencher ou quando preencher o formulário
         Então a página devera exigir marcadores visuais de erro/sucesso
        */
        cy.get('#email').click().pressTab();
        cy.get('#passwd').click('').pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#email').type('praticas@praticas.com.br').pressTab();
        cy.get('#passwd').type('123456').pressTab();
        cy.get('.form-group').should('have.class', 'form-ok');

    });

    it('6. Deve ser possivel Login com Sucesso', () => {
        /*
         Dado que o usuário preencheu corretamente usuário e senha
         Quando o usuário clicar para enviar
         Então a página deve iniciar a sessão do usuário
        */
        cy.get('#email').type('praticas@praticas.com.br');
        cy.get('#passwd').type('123456');
        cy.get('#SubmitLogin').click();
        cy.url().should('eq', 'http://www.automationpractice.pl/index.php?controller=my-account/')
    });
});
