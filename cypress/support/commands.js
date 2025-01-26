const { faker } = require("@faker-js/faker");

// cypress/support/commands.js
Cypress.Commands.add('pressTab', () => {
    cy.realPress('Tab')
  });
  
Cypress.Commands.add('gerarEmailAleatorio',()=>{
    const emailAleatorio = 'user${Date.now()}@exemple.com';
    return emailAleatorio;
})

Cypress.Commands.add('criarCadastro', () => {
    const emailcadastro = faker.internet.email();  // Gera um email aleatório com faker
    cy.get('#email_create').type(emailcadastro);  // Preenche o campo de email
    cy.get('#SubmitCreate').click();  // Clica no botão de submit
  });
  
  Cypress.Commands.add('criarCadastroCompleto', () => {
    const emailcadastro = faker.internet.email();  // Gera um email aleatório com faker
    cy.get('#email_create').type(emailcadastro);  // Preenche o campo de email
    cy.get('#SubmitCreate').click();  // Clica no botão de submit
    cy.get('#customer_firstname').type(faker.name.firstName());
    cy.get('#customer_lastname').type(faker.name.lastName());
    cy.get('#passwd').type(faker.internet.password());
    
  });
  
  Cypress.Commands.add('visitarPagina',(pagina)=>{
const urls = {
    vestidoBranco : 'http://www.automationpractice.pl/index.php?id_product=2&controller=product&search_query=blouse&results=1#/1-size-s/8-color-white',
    vestidoPreto : 'http://www.automationpractice.pl/index.php?id_product=5&controller=product#/1-size-s/11-color-black',
    visaoCarrinho : 'http://www.automationpractice.pl/index.php?controller=order',
};
cy.visit(urls[pagina])
  })

  Cypress.Commands.add('adicionarCarrinho',()=>{
    cy.get('button')
    .find('span')
    .contains('Add to cart')
    .click();
  })

  Cypress.Commands.add('retirarPrimeiroItemCarrinho',()=>{
    cy.get('td.cart_delete')  // Seleciona todas as <td> com a classe cart_delete
  .first()  // Pega a primeira <td> encontrada
  .find('i.icon-trash')  // Encontra o <i> com a classe icon-trash dentro da <td>
  .click();  // Clica no ícone
  cy.wait(2000);
  })

  Cypress.Commands.add('validarCarrinhoVazio',()=>{
    cy.get('.shopping_cart')
    .find('span')
    .contains('(empty)')
    .should('be.visible');
  })