# ORBEES

**Plataforma web de monitoramento financeiro pessoal e em grupo**

Orbees é uma plataforma de controle financeiro que automatiza a importação e categorização de transações bancárias via extrato OFX/CSV, com módulos de gestão em grupo, controle de categorias personalizadas e autenticação robusta.

> **Projeto de TCC** — Este repositório faz parte de um trabalho de conclusão de curso e não aceita contribuições externas no momento.

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Guia Rápido de Configuração](DOCS/quick-setup-guide.md) | Como configurar o `.env`, subir com Docker e rodar localmente |
| [Documentação do Backend](DOCS/backend.md) | Arquitetura, models, services, endpoints, autenticação e mais |
| [Documentação do Frontend](DOCS/frontend.md) | Componentes, hooks, serviços, roteamento e design system |
| [API Reference](DOCS/api-reference.md) | Todos os endpoints com exemplos de request e response em JSON |
| [Modelo de Dados](DOCS/data-model.md) | Diagrama ERD, schema completo das tabelas, índices e convenções |

---

## Sobre o Projeto

Orbees combina gestão financeira pessoal e colaborativa:

- **Gestão Pessoal**: Controle individual de finanças com categorias customizadas
- **Gestão em Grupo**: Compartilhamento de despesas e categorias entre membros
- **Importação Automatizada**: Suporte para extratos bancários OFX e CSV (Nubank)
- **Autenticação Robusta**: Login tradicional + OAuth Google + confirmação de email
- **Exportação de Dados**: CSV, Excel e PDF — síncrono ou assíncrono via BackgroundService
- **Dashboard**: Totais, variações percentuais, insights automáticos e gráficos

Arquitetura monorepo com backend em **ASP.NET Core 8** e frontend em **React 19**.

---

## Stack

### Backend

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| .NET / ASP.NET Core | 8.0 | Framework principal |
| Entity Framework Core | 8.0.5 | ORM |
| PostgreSQL | 14 | Banco de dados |
| JWT Bearer | 8.16.0 | Autenticação stateless |
| Google OAuth | 8.0.5 | Autenticação social |
| FluentValidation | 11.3.1 | Validação de DTOs |
| BCrypt.Net | 4.1.0 | Hash de senhas |
| MailKit | 4.15.1 | Envio de emails |
| Serilog | 8.0.3 | Logging estruturado |
| Swagger | 6.6.2 | Documentação da API |
| QuestPDF | 2026.2.3 | Geração de PDFs |
| ClosedXML | 0.105.0 | Geração de Excel |
| CsvHelper | 33.1.0 | Leitura e escrita de CSV |

### Frontend

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| React | 19.2.0 | Biblioteca UI |
| TypeScript | 5.9.3 | Tipagem estática |
| Vite | 7.3.1 | Build tool |
| React Router DOM | 7.15.1 | Roteamento |
| Styled Components | 6.4.2 | Estilização CSS-in-JS |
| Axios | 1.16.1 | Cliente HTTP |
| React Hook Form | 7.76.0 | Formulários |
| Recharts | 3.8.1 | Gráficos e visualizações |

### Infraestrutura

- **Docker & Docker Compose** — Containerização (PostgreSQL, API, Frontend, Mailpit)
- **Mailpit** — Servidor SMTP fake para desenvolvimento

---

## Arquitetura

```
┌─────────────────────────────────────┐
│         Controllers Layer           │  ← Recebe requisições HTTP
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│          Services Layer             │  ← Lógica de negócio
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│        Repositories Layer           │  ← Acesso a dados (EF Core)
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│        PostgreSQL (Docker)          │
└─────────────────────────────────────┘
```

---

## Funcionalidades Implementadas

### Backend

- [x] Autenticação JWT + OAuth Google + confirmação de email + reset de senha
- [x] CRUD completo de usuários, categorias, grupos, contas bancárias e transações
- [x] Sistema de roles global (Admin/User) e por grupo (Admin/Member)
- [x] Importação de extratos OFX com preview e sugestão automática de categoria
- [x] Importação de CSV por banco (Nubank funcional)
- [x] Criação em lote (até 100 transações por requisição)
- [x] Dashboard com totais, variações, insights automáticos e dados para gráficos
- [x] Exportação em CSV, Excel e PDF — síncrona (≤ 100 tx) e assíncrona (> 100 tx)
- [x] BackgroundService para processamento de jobs de exportação com polling de status
- [x] Upload de foto de perfil
- [x] Middleware global de tratamento de exceções
- [x] Logging estruturado com Serilog (console + arquivo diário)
- [x] Seeds automáticos: roles, bancos, categorias padrão, admin

### Frontend

- [x] Página de Login (email/senha + Google OAuth)
- [x] Página de Registro
- [x] Página de Confirmação de Email
- [x] Callback do Google OAuth
- [x] AuthContext global com persistência do token JWT
- [x] Roteamento com rotas públicas e privadas
- [x] Camada de serviços completa (auth, user, category, group, transaction, dashboard)
- [x] Hooks customizados para cada domínio
- [x] Biblioteca de componentes UI (Button, Input, Card, Modal, etc.)
- [x] Design system com tokens centralizados (theme.ts)

---

## Instalação Rápida

> Para instruções detalhadas, acesse o [Guia Rápido de Configuração](DOCS/quick-setup-guide.md).

```bash
# 1. Clone o repositório
git clone https://github.com/TheRermz/orbees.git
cd orbees

# 2. Configure o ambiente
cp orbees-api/.env.example orbees-api/.env
cp orbees-frontend/.env.example orbees-frontend/.env
# Edite os arquivos .env conforme necessário

# 3. Suba com Docker
docker compose -f docker-compose.development.yml up -d
```

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:5210 |
| Swagger | http://localhost:5210/swagger |
| Mailpit | http://localhost:8025 |

---

## Estrutura do Projeto

```
orbees/
├── DOCS/
│   ├── quick-setup-guide.md        # Guia de configuração e execução
│   ├── backend.md                  # Documentação técnica do backend
│   └── frontend.md                 # Documentação técnica do frontend
│
├── orbees-api/                     # Backend ASP.NET Core
│   ├── Controllers/
│   ├── Services/
│   │   └── Interfaces/
│   ├── Repositories/
│   │   └── Interfaces/
│   ├── Models/
│   │   └── Enums/
│   ├── Dtos/
│   ├── Validators/
│   ├── Data/
│   │   ├── Configurations/
│   │   └── Seeds/
│   ├── Migrations/
│   ├── Extensions/
│   ├── Middlewares/
│   └── Program.cs
│
├── orbees-frontend/                # Frontend React
│   └── src/
│       ├── components/             # UI + Layouts
│       ├── contexts/               # AuthContext
│       ├── hooks/                  # Custom Hooks
│       ├── interfaces/             # Tipos TypeScript
│       ├── pages/                  # Páginas
│       ├── routes/                 # Roteamento
│       ├── services/               # API Layer (Axios)
│       ├── helpers/                # Utilitários
│       └── styles/                 # Design tokens
│
├── docker-compose.development.yml
├── docker-compose.production.yml
└── orbees.sln
```

---

## Banco de Dados

11 migrations aplicadas automaticamente no startup. Seeds executados via `DefaultSeeder.SeedAsync()`:

- Roles globais e de grupo
- Bancos brasileiros principais
- Categorias padrão do sistema
- Usuário admin padrão

> Detalhes completos em [Documentação do Backend — Banco de Dados](DOCS/backend.md#banco-de-dados).

---

## Licença

Este projeto é parte de um **Trabalho de Conclusão de Curso (TCC)** e não possui licença para uso ou contribuição externa no momento.

---

## Contato

**Repositório**: [https://github.com/TheRermz/orbees](https://github.com/TheRermz/orbees)

---

**Desenvolvido com .NET 8.0, React 19 e PostgreSQL**
