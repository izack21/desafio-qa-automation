const {
    faker
} = require("@faker-js/faker");

describe('Testes de Cadastro Usuario - Automation Practice', () => {
    beforeEach(() => {
        cy.visit('/');
    });


    it('1. Deve validar o preenchimento do e-mail', () => {
        cy.get('#SubmitCreate').should('be.visible').click();
        cy.get('#create_account_error').should('be.visible')
            .within(() => {
                cy.get('li').should('contain', 'Invalid email address');
            })
    })

    it('2. Deve verificar se o e-mail é valido', () => {
        cy.get('#email_create').type('email.com.br').pressTab();
        cy.get('.form-group').should('have.class', 'form-error');
        cy.get('#email_create').type('email@email.com').pressTab();
        cy.get('.form-group').should('have.class', 'form-ok');
    })

    it('3. Deve verificar se o e-mail ja foi cadastrado', () => {
        cy.get('#email_create').type('praticas@praticas.com.br');
        cy.get('#SubmitCreate').click();
        cy.get('#create_account_error').should('be.visible')
            .within(() => {
                cy.get('li').should('contain', 'An account using this email address has already been registered. Please enter a valid password or request a new one. ');
            })
    })

    it('4. Usuario deve ser redirecionado para tela de dados da Conta', () => {
        cy.get('#email_create').type(faker.internet.email());
        cy.get('#SubmitCreate').click();
        cy.url().should('eq', 'http://www.automationpractice.pl/index.php?controller=authentication&back=my-account%2F#account-creation')

    })

    it('5. O forumário deve preencher automaticamente o e-mail', () => {
        const emailcadastro = faker.internet.email();
        cy.get('#email_create').type(emailcadastro);
        cy.get('#SubmitCreate').click();
        cy.get('#email').should('have.value', emailcadastro)

    })

    it('6. Validar funcionamento Campos obrigatorios', () => {

        const emailcadastro = faker.internet.email();
        cy.get('#email_create').type(emailcadastro);
        cy.get('#SubmitCreate').click();
        cy.get('#customer_firstname').click().pressTab();
        cy.get('.form-group').should('have.class', 'form-error')
        cy.get('#customer_lastname').click().pressTab();
        cy.get('#email').clear().pressTab();
        cy.get('#passwd').click().pressTab();
        cy.get('#customer_firstname').type(faker.name.firstName());
        cy.get('#customer_lastname').type(faker.name.lastName());
        cy.get('#email').type(emailcadastro);
        cy.get('#passwd').type('123456');
        cy.get('.form-group').should('have.class', 'form-ok')
    })

    it('7. Validar funcionamento de validação e-mail', () => {
        cy.criarCadastroCompleto();
        cy.get('#email').clear().type('teste').pressTab();
        cy.get('.form-group').should('have.class', 'form-error')
        cy.get('#email').clear().type('teste@').pressTab();
        cy.get('.form-group').should('have.class', 'form-error')
        cy.get('#email').clear().type('teste.com').pressTab();
        cy.get('.form-group').should('have.class', 'form-error')
        cy.get('#email').clear().type('teste@teste.com').pressTab();
        cy.get('.form-group').should('have.class', 'form-ok')


    })

    it('8. Validar tamanho campo Senha', () => {
        cy.criarCadastroCompleto();
        cy.get('#passwd').clear().type('123').pressTab();
        cy.get('.form-group').should('have.class', 'form-error')
        cy.get('#passwd').clear().type('12345').pressTab();
        cy.get('.form-group').should('have.class', 'form-ok');
        cy.get('#passwd').clear().type('123456').pressTab();
        cy.get('.form-group').should('have.class', 'form-ok');
    })

    it('9. Usuario deve ser conseguir preencher e enviar seus dados', () => {
        cy.get('#email_create').type(faker.internet.email());
        cy.get('#SubmitCreate').click();
        cy.get('#customer_firstname').type(faker.name.firstName());
        cy.get('#customer_lastname').type(faker.name.lastName());
        cy.get('#passwd').type(faker.internet.password());
        cy.get('#submitAccount').click()
        cy.get('.alert-success').should('be.visible').within(() => {
            cy.contains('p', 'Your account has been created.')
        })
    })
})