# comando iniciais
- npm init -y
- npm i typescript ts-node-dev @types/node tsconfig-paths ts-node -D
- npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

----

# erros que derão durante o processo

TypeScript não sabe o que é o console. Por padrão, o TypeScript não inclui as funções do Node.js (como console.log, process, etc.) no seu ambiente.

simplificando eu não conseguia rodar um console.log

## para resolver
 1. Abra o seu tsconfig.json.
 2. Procure pela linha "types": [] e mude para:
- "types": ["node"]

Garanta que tem os tipos do Node instalados correndo este comando no terminal:
- npm install -D @types/node

---

# Sobre o .editorconfing

```cmd
root=true

[*]
indent_style = space
indent_size = 4
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

```
