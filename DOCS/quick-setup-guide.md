# Guia Rápido de Configuração — Orbees

Este guia cobre tudo o que você precisa para colocar o projeto rodando em ambiente de desenvolvimento, do zero ao primeiro acesso.

---

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Clonar o Repositório](#clonar-o-repositório)
- [Configurar Variáveis de Ambiente](#configurar-variáveis-de-ambiente)
- [Rodar com Docker (Recomendado)](#rodar-com-docker-recomendado)
- [Rodar Localmente (Sem Docker)](#rodar-localmente-sem-docker)
- [URLs de Acesso](#urls-de-acesso)
- [Comandos Úteis](#comandos-úteis)
- [Solução de Problemas](#solução-de-problemas)

---

## Pré-requisitos

### Para rodar com Docker (recomendado)

| Ferramenta | Versão mínima |
|------------|--------------|
| Docker | 24+ |
| Docker Compose | 2.20+ |

### Para rodar localmente (sem Docker)

| Ferramenta | Versão mínima |
|------------|--------------|
| .NET SDK | 8.0 |
| Node.js | 18+ |
| npm | 9+ |
| PostgreSQL | 14+ |

> Verifique as versões instaladas:
> ```bash
> docker --version
> docker compose version
> dotnet --version
> node --version
> ```

---

## Clonar o Repositório

```bash
git clone https://github.com/TheRermz/orbees.git
cd orbees
```

---

## Configurar Variáveis de Ambiente

### Backend (`orbees-api/.env`)

```bash
cd orbees-api
cp .env.example .env
```

Abra o arquivo `.env` e preencha os valores:

```bash
# ── Banco de Dados ─────────────────────────────────────────────────────────────
# Se usar Docker, mantenha os valores abaixo (host = nome do serviço Docker)
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=orbees

# Variáveis do container PostgreSQL (Docker Compose)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=orbees

# ── Aplicação ──────────────────────────────────────────────────────────────────
API_PORT=5210
FRONTEND_URL=http://localhost:5173

# ── JWT ────────────────────────────────────────────────────────────────────────
# Use uma string longa e aleatória em produção
JWT_SECRET_KEY=minha-chave-super-secreta-minimo-32-chars
JWT_ISSUER=orbees-api
JWT_AUDIENCE=orbees-frontend

# ── OAuth Google ───────────────────────────────────────────────────────────────
# Obtenha em: https://console.cloud.google.com/
# Deixe em branco se não for usar OAuth Google em desenvolvimento
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── Email (Mailpit em desenvolvimento) ─────────────────────────────────────────
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USER=user
MAIL_PASSWORD=password
MAIL_FROM=noreply@orbees.com

# ── Debug ──────────────────────────────────────────────────────────────────────
# true = popula o banco com 20 usuários e dados de teste
SEED_DB=false
```

> **Atenção**: Para desenvolvimento local sem Docker, altere `DB_HOST=localhost` e `MAIL_HOST=localhost`.

---

### Frontend (`orbees-frontend/.env`)

```bash
cd orbees-frontend
cp .env.example .env
```

```bash
# URL base da API (sem barra no final)
VITE_API_BASE_URL=http://localhost:5210/api
```

---

## Rodar com Docker (Recomendado)

O Docker Compose sobe todos os 4 serviços de uma vez: banco de dados, API, frontend e servidor de email.

### 1. Subir o ambiente

Na raiz do projeto (`/orbees`):

```bash
docker compose -f docker-compose.development.yml up -d
```

O comando:
- Constrói as imagens da API e do Frontend
- Sobe o PostgreSQL e aguarda o healthcheck
- Aplica as migrations automaticamente ao iniciar a API
- Executa os seeds iniciais (roles, bancos, categorias padrão, admin)

### 2. Verificar os logs

```bash
# Todos os serviços
docker compose -f docker-compose.development.yml logs -f

# Apenas a API
docker compose -f docker-compose.development.yml logs -f api

# Apenas o frontend
docker compose -f docker-compose.development.yml logs -f webapp
```

A API está pronta quando o log exibir algo como:

```
Now listening on: http://0.0.0.0:5210
```

### 3. Reconstruir após mudanças no Dockerfile ou dependências

```bash
docker compose -f docker-compose.development.yml up -d --build
```

### 4. Parar o ambiente

```bash
# Para os containers (preserva dados)
docker compose -f docker-compose.development.yml down

# Para e remove volumes (APAGA o banco de dados)
docker compose -f docker-compose.development.yml down -v
```

---

## Rodar Localmente (Sem Docker)

### Backend

#### 1. Requisito: PostgreSQL rodando

Crie o banco de dados:

```sql
CREATE DATABASE orbees;
```

#### 2. Configure o `.env`

Certifique-se que `DB_HOST=localhost` e `MAIL_HOST=localhost` no `orbees-api/.env`.

#### 3. Instalar ferramentas do EF Core (uma vez)

```bash
dotnet tool install --global dotnet-ef --version 8.0.11
```

#### 4. Restaurar dependências e aplicar migrations

```bash
cd orbees-api
dotnet restore
dotnet ef database update
```

#### 5. Rodar a API

```bash
# Modo normal
dotnet run

# Modo watch (hot reload)
dotnet watch run
```

A API será acessível em `http://localhost:5210`.

---

### Frontend

```bash
cd orbees-frontend
npm install
npm run dev
```

O frontend será acessível em `http://localhost:5173`.

---

## URLs de Acesso

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API (REST) | http://localhost:5210 |
| Swagger UI | http://localhost:5210/swagger |
| Mailpit (emails) | http://localhost:8025 |

---

## Comandos Úteis

### Migrations (backend)

```bash
# Aplicar todas as migrations pendentes
dotnet ef database update

# Criar nova migration
dotnet ef migrations add NomeDaMigration

# Reverter a última migration
dotnet ef migrations remove

# Listar migrations aplicadas
dotnet ef migrations list
```

### Docker

```bash
# Ver status dos containers
docker compose -f docker-compose.development.yml ps

# Acessar o shell do container da API
docker compose -f docker-compose.development.yml exec api bash

# Acessar o PostgreSQL via psql
docker compose -f docker-compose.development.yml exec db psql -U postgres -d orbees

# Reiniciar apenas um serviço
docker compose -f docker-compose.development.yml restart api
```

### Frontend

```bash
# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

---

## Solução de Problemas

### A API não conecta ao banco de dados

- Verifique se o container `db` está saudável: `docker compose ... ps`
- Confirme que `DB_HOST=db` (nome do serviço Docker) no `.env`
- Para local: confirme que o PostgreSQL está rodando na porta `5432`

### Migrations falham no startup

```bash
# Rode manualmente no container
docker compose -f docker-compose.development.yml exec api dotnet ef database update
```

### Frontend não acessa a API (CORS / 401)

- Verifique se `VITE_API_BASE_URL` no `.env` do frontend aponta para a URL correta
- Verifique se `FRONTEND_URL` no `.env` do backend corresponde à origem do frontend
- Em desenvolvimento, a URL padrão é `http://localhost:5173`

### Emails não aparecem no Mailpit

- Confirme que `MAIL_HOST=mailpit` (Docker) ou `MAIL_HOST=localhost` (local) no `.env`
- Acesse http://localhost:8025 para ver os emails capturados

### SEED_DB=true não popula os dados

- O seed só roda se `SEED_DB=true` no `.env`
- Reinicie a API após alterar a variável

### Porta já em uso

```bash
# Verificar qual processo usa a porta
lsof -i :5210
lsof -i :5173
```
