describe('', () => {

    beforeEach(() => {
        cy.visit('http://www.automationpractice.pl/index.php?id_product=2&controller=product#/1-size-s/8-color-white');
    });

    it('1. Validar inclusão de item no Carrinho', () => {
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