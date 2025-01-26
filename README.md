# desafio-qa-automation
Desafio de testes automatizados
• **Desafio:** Automatizar os cenários de teste criados pra o site http://www.automationpractice.pl/index.php
• **Framework:** Cypress
• **Linguagem de Programação:** javascript
• **IDE:** VSCode


### Dependências Adicionais

Além do Cypress, foram utilizados os seguintes plugins para aprimorar os testes:

1. **[faker-js](https://github.com/faker-js/faker)**  
   - **Função:** Gerar dados aleatórios (ex.: nomes, e-mails, senhas) para preencher campos durante os testes.  
   - **Motivo:** Simular dados reais e evitar dependências de dados estáticos, garantindo mais robustez aos testes.  
   - **Instalação:**  
     ```bash
     npm install @faker-js/faker --save-dev
     ```
   - **Uso no código:**  
     ```javascript
     const { faker } = require('@faker-js/faker');

     const randomEmail = faker.internet.email();
     const randomPassword = faker.internet.password();
     cy.get('#email').type(randomEmail);
     cy.get('#passwd').type(randomPassword);
     ```

2. **[cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)**  
   - **Função:** Simular eventos reais de interação do usuário, como `hover`, `mousedown`, e `keypress`, que ainda não possuem suporte completo no Cypress.  
   - **Motivo:** Garantir que ações específicas, como o foco em elementos ou interações avançadas, sejam testadas corretamente.  
   - **Instalação:**  
     ```bash
     npm install cypress-real-events --save-dev
     ```
   - **Uso no código:**  
     ```javascript
     import 'cypress-real-events/support';

     cy.get('#submit-button').realClick(); // Clique "real" em um botão
     cy.get('#dropdown').realHover();     // Simula passar o mouse sobre o dropdown
     ```

---

#### **2. Seção: Como Configurar**
Explique como configurar os plugins no projeto. 

```markdown
### Configuração dos Plugins

#### 1. faker-js
Não requer configuração adicional. Basta instalar e importar no arquivo de teste:

```javascript
const { faker } = require('@faker-js/faker');
