describe('Testes de Interação com o Carrinho - Automação Pratica', () => {

    it('1. Validar inclusão de item no Carrinho', () => {
        /* Dado que o usuário recebeu o link de um produto
           Quando o usuário realizar a compra
           A página deverá exibir que há um novo item em seu carrinho
        */
        cy.visitarPagina('vestidoPreto')
        cy.validarCarrinhoVazio();
        cy.adicionarCarrinho();

        cy.get('.cross').click();

        cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
    })



    it('2. Retirar Item do Carrinho', () => {
        /* Dado que o usuário esta na página de pre-order
           Quando houver a desistencia de compra de um item
           Então a página permitir excluir o item do carrinho
        */
        cy.visitarPagina('vestidoBranco');
        cy.adicionarCarrinho();
        cy.get('.cross').click();
        cy.visitarPagina('visaoCarrinho');
        cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
        cy.retirarPrimeiroItemCarrinho();
        cy.validarCarrinhoVazio();

    })
})
