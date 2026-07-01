# My Sales

Este projeto é uma API backend desenvolvida para fins de estudo, com foco em construir uma aplicação de gestão de vendas utilizando Node.js, TypeScript e boas práticas de arquitetura. Ele foi criado com o objetivo de aprender na prática como funciona o desenvolvimento de sistemas backend modernos, desde a criação de rotas e serviços até autenticação, validação, banco de dados, cache, testes e organização de código.

O projeto também faz parte do contexto de estudos em parceria com a escola DNC, onde a ideia é aplicar conceitos reais de desenvolvimento e compreender como diferentes ferramentas se conectam para formar uma aplicação completa.

## O que é o projeto?

O My Sales é uma aplicação voltada para a gestão de vendas e operações comerciais. A API permite:

- cadastro e autenticação de usuários;
- gerenciamento de clientes;
- cadastro e controle de produtos;
- criação de pedidos;
- upload de avatar do usuário;
- recuperação de senha por e-mail;
- proteção contra excesso de requisições (rate limiting);
- uso de cache para melhorar desempenho;
- testes automatizados para validar o comportamento da aplicação.

## Objetivo do projeto

O principal objetivo deste projeto é servir como base de aprendizado para quem está iniciando no desenvolvimento backend. A proposta é estudar como estruturar uma API de forma organizada, separando responsabilidades em módulos, aplicando padrões de projeto e utilizando recursos que aparecem com frequência no mercado.

## Estrutura geral do projeto

A aplicação foi organizada em módulos para deixar o código mais claro e escalável. Alguns dos principais módulos são:

- users: autenticação, usuários e perfil;
- customers: cadastro e gestão de clientes;
- products: cadastro e controle de produtos;
- orders: criação e visualização de pedidos;
- shared: componentes reutilizáveis, middlewares, erros, container de dependências e infraestrutura.

## Tecnologias e bibliotecas utilizadas

A seguir, estão as principais tecnologias e bibliotecas usadas no projeto, organizadas por tema para facilitar a leitura.

### Ambiente e linguagem

- Node.js: ambiente de execução da aplicação backend. A versão recomendada para este projeto é a 20.x ou superior.
- TypeScript: adiciona tipagem estática ao JavaScript, ajudando a evitar erros e a deixar o código mais seguro e fácil de manter.
- Express: framework usado para criar a API REST, definir rotas e controlar requisições HTTP.
- ts-node-dev: permite rodar a aplicação em modo de desenvolvimento com reinicialização automática sempre que o código muda.
- tsconfig-paths: facilita os imports com aliases, deixando o código mais organizado.

### Banco de dados

- TypeORM: ORM utilizado para mapear objetos JavaScript/TypeScript para o banco de dados relacional.
- pg: driver oficial do PostgreSQL, responsável por conectar a aplicação ao banco de dados.
- reflect-metadata: habilita recursos importantes do TypeORM e da injeção de dependências.
- PostgreSQL: banco de dados relacional usado para armazenar dados principais da aplicação, como usuários, clientes, produtos e pedidos.

### Cache e performance

- Redis: sistema de armazenamento em memória usado para cache, controle de sessões temporárias e melhoria de desempenho.
- ioredis: cliente Redis para Node.js, utilizado para comunicação com o Redis de forma simples e eficiente.
- rate-limiter-flexible: protege a API contra excesso de requisições, evitando abuso ou sobrecarga.

### Autenticação, validação e arquivos

- bcrypt: responsável por criptografar senhas antes de armazená-las.
- jsonwebtoken: implementa autenticação via JWT, permitindo identificar usuários logados.
- celebrate: utilizada para validar dados recebidos nas requisições.
- multer: usado para upload de arquivos, como imagens de avatar.
- nodemailer: facilita o envio de e-mails, por exemplo para recuperação de senha.
- dotenv: carrega variáveis de ambiente a partir de um arquivo .env.
- cors: permite controlar o acesso da API a partir de diferentes origens frontend.

### Organização e qualidade de código

- tsyringe: biblioteca de injeção de dependências, usada para organizar a criação de serviços e reduzir o acoplamento entre classes.
- jest e supertest: ferramentas de testes automatizados, usadas para validar endpoints e regras de negócio.
- eslint e typescript-eslint: ajudam a manter o código padronizado e com menos problemas de qualidade.
- uuid: gera identificadores únicos para registros.
- date-fns: facilita o trabalho com datas e formatação de valores temporais.

## Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm ou yarn
- banco de dados PostgreSQL disponível
- Redis disponível, caso queira utilizar cache e rate limiting

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

### Executar migrations

Para criar uma nova migration:

```bash
npm run migration:create --name=exempleNameMigration
```

Para aplicar as migrations no banco de dados:

```bash
npm run migration:run
```

### Executar testes

```bash
npm test
```

## Scripts disponíveis

- npm run dev: inicia a aplicação em modo de desenvolvimento.
- npm run lint: executa a análise estática do código.
- npm run migration:create: cria uma nova migration.
- npm run migration:run: aplica as migrations.
- npm run test: executa os testes automatizados.

## Boas práticas presentes no projeto

- organização em módulos;
- uso de TypeScript para reduzir erros;
- separação entre serviços, controllers, rotas e infraestrutura;
- validação de dados nas requisições;
- tratamento centralizado de erros;
- uso de cache e proteção contra abuso;
- testes automatizados para garantir maior confiabilidade.

## Observações adicionais

- O arquivo .editorconfig ajuda a manter a formatação do código consistente entre diferentes editores.
- O ESLint é utilizado para manter o código mais limpo e padronizado.
- O projeto é um ótimo exemplo de aplicação backend realista para estudar conceitos importantes de arquitetura e desenvolvimento com Node.js.
