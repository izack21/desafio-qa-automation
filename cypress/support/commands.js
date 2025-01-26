const {
    faker
} = require("@faker-js/faker");

// Comando usado para acionar um comando de Tab do teclado.
Cypress.Commands.add('pressTab', () => {
    cy.realPress('Tab')
});


// Preenchimento inicial para criar usuário.
Cypress.Commands.add('criarCadastro', () => {
    const emailcadastro = faker.internet.email(); // Gera um email aleatório com faker
    cy.get('#email_create').type(emailcadastro); // Preenche o campo de email
    cy.get('#SubmitCreate').click(); // Clica no botão de submit
});

// Preenchimento completo para criar um usuário.
Cypress.Commands.add('criarCadastroCompleto', () => {
    const emailcadastro = faker.internet.email(); // Gera um email aleatório com faker
    cy.get('#email_create').type(emailcadastro); // Preenche o campo de email
    cy.get('#SubmitCreate').click(); // Clica no botão de submit
    cy.get('#customer_firstname').type(faker.name.firstName()); //Preenche o campo First Name
    cy.get('#customer_lastname').type(faker.name.lastName()); // Preenche o campo Last Name
    cy.get('#passwd').type(faker.internet.password()); // Preenche o campo Password

});

// Acesso à páginas especificas.
Cypress.Commands.add('visitarPagina', (pagina) => {
    const urls = {
        vestidoBranco: 'http://www.automationpractice.pl/index.php?id_product=2&controller=product&search_query=blouse&results=1#/1-size-s/8-color-white',
        vestidoPreto: 'http://www.automationpractice.pl/index.php?id_product=5&controller=product#/1-size-s/11-color-black',
        visaoCarrinho: 'http://www.automationpractice.pl/index.php?controller=order',
    };
    cy.visit(urls[pagina])
})

// Acionar o botão para adicionar compra ao carrinho.
Cypress.Commands.add('adicionarCarrinho', () => {
    cy.get('button') // Seleciona os <button> da tela
        .find('span') // procura a tag <spna> dentro do button
        .contains('Add to cart') // verifica se tem o texto do botão
        .click(); // efetua o click
})

// Comando para deletar o primeiro item na tela de pre-order.
Cypress.Commands.add('retirarPrimeiroItemCarrinho', () => {
    cy.get('td.cart_delete') // Seleciona todas as <td> com a classe cart_delete
        .first() // Pega a primeira <td> encontrada
        .find('i.icon-trash') // Encontra o <i> com a classe icon-trash dentro da <td>
        .click(); // Clica no ícone
    cy.wait(2000);
})

// Comando para validar carrinho vazio.
Cypress.Commands.add('validarCarrinhoVazio', () => {
    cy.get('.shopping_cart') // Localiza a classe shopping_cart, o campo do carrinho
        .find('span') // Encontra a tag <span> para a classe
        .contains('(empty)') //Verifica se esta como empty
        .should('be.visible'); // Valida que esta visivel
})