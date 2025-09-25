# MockAPI - API Mock Server

Uma API simulada (mock) desenvolvida com NestJS e Prisma que permite criar, gerenciar e responder a requisições HTTP dinâmicas. Ideal para desenvolvimento frontend, testes de integração e prototipagem rápida.

## 📋 Funcionalidades

### ✨ API Mock Dinâmica

- **Captura automática de requisições**: Aceita qualquer endpoint e método HTTP
- **Armazenamento persistente**: Salva requisições e respostas em banco SQLite via Prisma
- **Recursos dinâmicos**: Cria automaticamente recursos baseados no primeiro segmento da URL

### 🔄 Operações CRUD Completas

- **POST** `/recurso` - Cria nova entrada (status 201)
- **GET** `/recurso` - Lista todas as entradas do recurso
- **GET** `/recurso/:id` - Retorna entrada específica por ID
- **PUT/PATCH** `/recurso/:id` - Atualiza entrada existente
- **DELETE** `/recurso/:id` - Remove entrada por ID

### 📊 Exemplos de Uso

```bash
# Criar usuários
POST /usuarios
{
  "nome": "João Silva",
  "email": "joao@email.com"
}

# Listar todos os usuários
GET /usuarios

# Buscar usuário específico
GET /usuarios/abc123

# Atualizar usuário
PUT /usuarios/abc123
{
  "nome": "João Santos",
  "email": "joao.santos@email.com"
}

# Deletar usuário
DELETE /usuarios/abc123
```

### 🏗️ Estrutura do Banco de Dados

- **Resource**: Representa categorias de dados (ex: usuarios, produtos)
- **MockEntry**: Armazena requisições individuais com:
  - ID único (CUID)
  - Método HTTP
  - Headers da requisição
  - Body da requisição/resposta
  - Status code
  - Timestamps de criação e atualização

## 🚀 Como Usar

### Pré-requisitos

- Node.js (versão 16+)
- npm ou yarn

### Instalação e Configuração

1. **Instalar dependências**

```bash
npm install
```

2. **Configurar banco de dados**

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev
```

3. **Iniciar o servidor**

```bash
# Modo desenvolvimento (com watch)
npm run start:dev

# Modo desenvolvimento padrão
npm run start

# Modo produção
npm run start:prod
```

O servidor estará disponível em `http://localhost:3000`

### Comandos Úteis

```bash
# Verificar código com ESLint
npm run lint

# Formatar código
npm run format

# Build para produção
npm run build
```

## 🛠️ Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[SQLite](https://www.sqlite.org/)** - Banco de dados local
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem de programação

## 📁 Estrutura do Projeto

```
src/
├── mock.controller.ts  # Controller principal que captura todas as requisições
├── mock.service.ts     # Lógica de negócio para gerenciar mocks
├── prisma.service.ts   # Serviço de conexão com Prisma
├── prisma.module.ts    # Módulo Prisma
├── app.module.ts       # Módulo principal da aplicação
└── main.ts            # Ponto de entrada da aplicação

prisma/
├── schema.prisma      # Schema do banco de dados
├── dev.db            # Banco SQLite de desenvolvimento
└── migrations/       # Migrações do banco
```

## 🧪 Casos de Uso

### Desenvolvimento Frontend

- Simule APIs que ainda não existem
- Teste diferentes cenários de resposta
- Prototipe rapidamente sem backend real

### Testes de Integração

- Crie mocks consistentes para testes
- Simule falhas e diferentes status codes
- Valide comportamento do frontend

### Demonstrações e MVPs

- Configure rapidamente uma API funcional
- Apresente protótipos com dados dinâmicos
- Valide conceitos sem infraestrutura complexa

## 📄 Licença

Este projeto está sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação
