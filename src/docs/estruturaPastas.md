# A estrutura de pastas do projeto será organizada da seguinte forma:
 - ``Config``: Contém as configurações do projeto.
 - ``Modules``: Armazena os módulos da aplicação (cada módulo representa uma tabela/recurso).
 - ``Shared``: Contém configurações e código compartilhado entre módulos.
 - ``HTTP``: Dentro de Shared, contém o arquivo server.ts para execução do projeto.

```js
src/
├── Config/
├── Modules/
├── Shared/
│   └── HTTP/
│       └── server.ts
└── ...
```

# Módulos e Recursos
Cada módulo dentro da pasta Modules representa um recurso da API e contém:

 - Controlador
 - Repositório
 - Serviço
 - Entidade
 - Esquemas de validação
Esta organização facilita a manutenção e escalabilidade do projeto.
---
# Boas Práticas de Desenvolvimento
### Organização do Código
 - **Separação de Responsabilidades**: Cada módulo deve ter uma responsabilidade clara.
 - **DRY (Don't Repeat Yourself)**: Evite duplicação de código utilizando funções e módulos compartilhados.
 - **SOLID Principles**: Aplique os princípios SOLID para melhorar a qualidade e manutenibilidade do código.
