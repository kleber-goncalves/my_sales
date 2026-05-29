# comando iniciais
- ``npm init -y``
- ``npm i typescript ts-node-dev @types/node tsconfig-paths ts-node -D``
- ``npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true``

----

# erros que derão durante o processo

TypeScript não sabe o que é o console. Por padrão, o TypeScript não inclui as funções do Node.js (como console.log, process, etc.) no seu ambiente.

simplificando eu não conseguia rodar um ``console.log``

## para resolver
 1. Abra o seu tsconfig.json.
 2. Procure pela linha ``"types": []`` e mude para:
- ``"types": ["node"]``

Garanta que tem os tipos do Node instalados correndo este comando no terminal:
- ``npm install -D @types/node``

---

# Sobre o .editorconfing

```js
root=true

[*]
indent_style = space
indent_size = 4
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

```
O ``.editorconfig`` é um ficheiro que serve para padronizar a formatação do código entre diferentes editores de texto (como VS Code, WebStorm, etc.) e diferentes programadores que trabalham no mesmo projeto.

### Aqui está o que cada linha faz detalhadamente:
 1. ``root = true``
 - **O que faz:** Diz ao editor que este é o ficheiro de configuração principal do projeto. O editor vai parar de procurar por outros ficheiros .editorconfig em pastas superiores do seu computador.
 2. ``[*]``
 - **O que faz:** É um seletor. Significa que as regras escritas logo abaixo aplicam-se a todos os ficheiros do projeto (independente de serem .ts, .js, .json, .css, etc.).
 3. ``indent_style = space``
 - **O que faz:** Define que a indentação (o recuo do código) deve ser feita usando espaços e não a tecla Tab. Se carregar na tecla Tab, o editor vai convertê-la automaticamente em espaços.
 4. ``indent_size = 4``
 - **O que faz:** Define a quantidade de espaços para cada nível de indentação. Neste caso, cada vez que avança uma linha no código (dentro de uma função ou classe), o editor insere exatamente 4 espaços.
 5. ``charset = utf-8``
 - **O que faz:** Define a codificação de caracteres dos ficheiros como UTF-8. Isto garante que acentos (como á, ç, õ) e emojis sejam exibidos corretamente em qualquer sistema operacional (Windows, Mac ou Linux) sem corromper o texto.
 6. ``trim_trailing_whitespace = true``
 - **O que faz:** Remove automaticamente todos os espaços em branco inúteis que ficam no final das linhas de código quando guarda o ficheiro. Isto ajuda a manter o código limpo.
 7. ``insert_final_newline = true``
 - **O que faz:** Garante que o editor adiciona sempre uma linha em branco no final de cada ficheiro ao guardar. Isto é uma boa prática padrão no Git e em sistemas POSIX para evitar avisos no terminal.
 8. ``end_of_line = lf``
 - **O que faz:** Define o caractere de quebra de linha como LF (padrão do Linux/Mac). Evita conflitos quando uma pessoa trabalha no Windows (que usa CRLF) e outra no Mac, impedindo que o Git detete alterações invisíveis em todas as linhas do ficheiro.


----

# eslint

comando: - ``npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin``

crir aquivo ``.eslintrc`` e colocar isso:
```js
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ]
}

```

apos criar o arquivo ``.eslintrc`` crie o arquivo ``.eslintignore``, para o eslint não alterar os arquivos ou pastas adiconadas no ``.eslintignore``

```js
node_modules
dist
build
/*.js

```
# erro

A explicação acima é da versão antiga do eslint com isso eu tive que fazer algumas alteraçõs.

apagar os arquivos:
 - ``.eslintrc``
 - ``.eslintignore``

e criar o arquivo:
 - ``eslint.config.js``

dentro dele adicone neste codigo :

```js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // .eslintignore (coloque as pastas a ignorar aqui)
        ignores: ["build/", "dist/", "node_modules/"],
    },
);

```

No arquivo ``tsconfig`` adicone o codigo abaixo depois do ``compilerOptions``

```js
   "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "build",
    "dist",
    "eslint.config.js"
  ]
```
e no ``package.json`` no comando ``lin`` mude para :
```js
    "lint": "eslint .",
```
----

# Configuração do Ambiente de Desenvolvimento
### Configuração do TypeScript
Para melhorar a organização e facilitar as importações, configuramos o TypeScript com aliases:

No ``tsconfig.json``, configure:
```js
"paths": {
          "@/*": ["./src/*"],
          "@modules/*": ["./src/modules/*"],
          "@shared/*": ["./src/shared/*"]
      },
```
No package.json mude para:
``"dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/http/server.ts"``

