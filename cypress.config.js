const {
  defineConfig
} = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://automationpractice.pl/index.php?controller=authentication&back=my-account',
    setupNodeEvents(on, config) {
      // Adicione eventos personalizados se necessário
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});