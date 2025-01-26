describe('', () => {

    it('1. Validar inclusão de item no Carrinho', () => {
        cy.visitarPagina('vestidoPreto')
        cy.validarCarrinhoVazio();
        cy.adicionarCarrinho();

        cy.get('.cross').click();

        cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
    })



    it('2. Retirar Item do Carrinho', () => {

        cy.visitarPagina('vestidoBranco');
        cy.adicionarCarrinho();
        cy.get('.cross').click();
        cy.visitarPagina('visaoCarrinho');
        cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
        cy.retirarPrimeiroItemCarrinho();
        cy.validarCarrinhoVazio();

    })
})