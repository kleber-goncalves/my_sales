# Bibliotecas usadas neste projeto

Este documento lista as dependências instaladas no projeto `my_sales`, explica para que serve cada biblioteca e mostra como elas são usadas na implementação atual.

## Dependências principais

### `express`
- O web framework usado para criar o servidor HTTP.
- Uso no projeto: `src/shared/http/server.ts` cria a instância `app`, adiciona middlewares e monta as rotas.
- Exemplo de uso:
  - `app.use(express.json())`
  - `app.use(routes)`
  - `app.listen(SERVER_PORT)`

### `cors`
- Permite requisições entre origens diferentes (Cross-Origin Resource Sharing).
- Uso no projeto: habilitado globalmente em `src/shared/http/server.ts` com `app.use(cors())`.

### `express-async-errors`
- Adiciona suporte a propagação automática de erros em rotas assíncronas do Express.
- Uso no projeto: importado em `src/shared/http/server.ts` apenas para ativar o comportamento global.
- Isso evita ter que usar `try/catch` manual em todas as rotas async.

### `celebrate`
- Wrapper de validação de requisições que usa `Joi` internamente.
- Uso no projeto: valida dados de entrada em diversas rotas, como `src/modules/users/schemas/*.ts`, `src/modules/products/schemas/*.ts`, `src/modules/orders/schemas/*.ts` e `src/modules/customers/schemas/*.ts`.
- Exemplo de uso:
  - `celebrate({ [Segments.BODY]: Joi.object({ ... }) })`
- O middleware de erro do `celebrate` é adicionado em `src/shared/http/server.ts` via `app.use(errors())`.

### `class-transformer`
- Transforma objetos de classe em objetos JavaScript puros e permite expor ou excluir propriedades quando serializa.
- Uso no projeto:
  - `src/modules/users/database/entities/Users.ts` usa `@Exclude()` para esconder a senha e `@Expose({ name: "avatar_url" })` para criar a URL pública do avatar.
  - `src/modules/users/controllers/UsersControllers.ts` usa `instanceToInstance()` para aplicar essas transformações antes de retornar dados ao cliente.

### `date-fns`
- Biblioteca de manipulação de datas.
- Uso no projeto: `src/modules/users/services/ResetPasswordService.ts` usa funções como `addHours` e `isAfter` para calcular validade de tokens e validar expiração.

### `dotenv`
- Carrega variáveis de ambiente do arquivo `.env`.
- Uso no projeto:
  - `src/shared/typeorm/data-source.ts` importa `dotenv/config` para configurar o banco.
  - `src/config/email.ts` importa `dotenv/config` para ler credenciais e configurações de e-mail.

### `jsonwebtoken`
- Cria e verifica tokens JWT.
- Uso no projeto:
  - `src/modules/users/services/SessionUserService.ts` gera tokens de autenticação com `sign()`.
  - `src/shared/middlewares/authMiddleware.ts` valida o token com `verify()` e adiciona `req.user`.

### `bcrypt`
- Faz hash e comparação de senhas.
- Uso no projeto:
  - `src/modules/users/services/CreateUserService.ts` usa `hash()` para salvar senhas seguras.
  - `src/modules/users/services/SessionUserService.ts` e `src/modules/users/services/UpdateProfileService.ts` usam `compare()` para verificar senhas.
  - `src/modules/users/services/ResetPasswordService.ts` usa `hash()` ao atualizar a senha.

### `multer`
- Faz upload de arquivos multipart/form-data.
- Uso no projeto:
  - `src/config/upload.ts` define a configuração de armazenamento dos arquivos.
  - `src/modules/users/routes/AvatarRoutes.ts` e outras rotas de avatar usam `multer(uploadConfig)` para receber o arquivo enviado.

### `nodemailer`
- Envia e-mails a partir do Node.js.
- Uso no projeto: `src/config/email.ts` cria `transporter` com as configurações SMTP e é usado pelos serviços de recuperação de senha.

### `pg`
- Driver PostgreSQL para Node.js.
- Uso no projeto: é o cliente de banco utilizado pelo TypeORM para conectar ao PostgreSQL.

### `reflect-metadata`
- Necessário para o TypeORM e decorators do TypeScript.
- Uso no projeto: importado em `src/shared/http/server.ts` antes de inicializar o TypeORM.

### `typeorm`
- ORM usado para mapear entidades, executar migrações e fazer consultas ao banco de dados.
- Uso no projeto:
  - `src/shared/typeorm/data-source.ts` configura a conexão com o banco.
  - `src/modules/*/database/entities/*.ts` definem as entidades.
  - `src/shared/typeorm/migrations/*.ts` contêm as migrações de esquema.
  - Repositórios como `src/modules/customers/database/repositories/CustomersRepositories.ts` usam `AppDataSource.getRepository(...)`.

## Dependências de desenvolvimento

### `typescript`
- Compilador TypeScript.
- Uso no projeto: compila o código `.ts` em JavaScript quando necessário e fornece tipagem estática.

### `ts-node` e `ts-node-dev`
- `ts-node` permite executar TypeScript diretamente sem compilar primeiro.
- `ts-node-dev` reinicia automaticamente o servidor quando há mudanças nos arquivos.
- Uso no projeto: script `dev` no `package.json` roda o servidor em modo de desenvolvimento com `ts-node-dev`.

### `tsconfig-paths`
- Suporta path aliases definidos no `tsconfig.json` durante a execução de TypeScript.
- Uso no projeto: combinado com `ts-node-dev -r tsconfig-paths/register` no script `dev` para resolver aliases como `@/...`.

### `cross-env` e `cross-var`
- `cross-env`: define variáveis de ambiente de forma compatível entre Windows e Unix.
- `cross-var`: permite usar variáveis de ambiente em scripts npm como `npm_config_name`.
- Uso no projeto: `migration:create` usa `cross-var` para criar migrações com nome passado via `npm_config_name`. `cross-env` está instalado, mas não aparece em scripts atuais; pode ser útil para adicionar variáveis de ambiente portáveis no futuro.

### `eslint`, `@eslint/js`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `typescript-eslint`
- Ferramentas de lint para manter o código consistente e detectar problemas de estilo/qualidade.
- Uso no projeto: `npm run lint` roda `eslint . --fix`.
- `@typescript-eslint/parser` e `@typescript-eslint/eslint-plugin` permitem lintar arquivos TypeScript.

### `@types/*`
- Fornecem definições de tipo TypeScript para bibliotecas JavaScript que não têm tipagem própria.
- As dependências instaladas no projeto são:
  - `@types/cors`
  - `@types/express`
  - `@types/joi`
  - `@types/jsonwebtoken`
  - `@types/multer`
  - `@types/node`
  - `@types/nodemailer`
- Uso no projeto: garantem autocompletar e checagem de tipos durante compilação.

## Como entender o uso no projeto atual

- `src/shared/http/server.ts` é o ponto de entrada do servidor e reúne `express`, `cors`, `celebrate`, `express-async-errors`, `reflect-metadata` e TypeORM.
- `src/shared/typeorm/data-source.ts` configura o banco de dados PostgreSQL usando `typeorm` e `dotenv`.
- As rotas e controllers usam `celebrate` para validar dados de entrada e `class-transformer` para serializar entidades.
- Os serviços de usuário usam `bcrypt` para senha e `jsonwebtoken` para autenticação.
- O upload de arquivos de avatar é feito com `multer` e configurado em `src/config/upload.ts`.
- A recuperação de senha e envio de e-mail usam `nodemailer` com variáveis de ambiente.

## Observações finais

- Runtime: as dependências listadas em `dependencies` são usadas no código que roda no servidor.
- Desenvolvimento: as dependências listadas em `devDependencies` ajudam a compilar, rodar e verificar o projeto, mas não são exigidas em produção.
- Para rodar o servidor localmente: `npm run dev`.
- Para rodar lint: `npm run lint`.
