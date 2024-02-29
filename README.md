# Cypress-basico-v2

Projeto base do curso básico de automação de testes. Nele pude aprender:
- Como configurar um projeto Cypress do zero;
- Como visitar páginas locais e remotas;
- Como lidar com os elementos mais comuns encontrados em aplicações web;
- Como testar _upload_ de arquivos;
- Como realizar as mais diversas verificações de resultados esperados;
- Como criar comandos customizados;
- Como lidar com links que abrem em outra aba do navegador;
- Como rodar testes simulando as dimensões de um dispositivo móvel;
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents);
- Como executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes);
- Como criar uma documentação mínima para seu projeto de testes automatizados.

## Pré-requisitos

É necessário ter o Node.js e o npm instalados para rodar o projeto.

> Usei as versões `v16.13.2` e `8.3.2` do Node.js e npm.

## Instalação

Rodar o comando `$ npm install` para instalar as dependências de desenvolvimento.


## Testes

É possível rodar os testes simulando a viewport de um computador ou celular.

### Computador

Rode `$ npm test` para rodar o Cypress em modo headless, ou rode `$ npm run cy:open` para abrir o modo interativo do Cypress.

### Celular

Rode `$ npm run test:mobile` para rodar o Cypress em modo headless, ou rode `$ npm run cy:open:mobile` para abrir o modo interativo do Cypress.