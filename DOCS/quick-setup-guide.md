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

---

## Configurar OAuth Google (Opcional)

Se você deseja habilitar login com Google, siga estes passos:

### 1. Criar Projeto no Google Cloud Console

1. Acesse https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Nomeie o projeto (ex: "Orbees Dev")

### 2. Habilitar Google+ API

1. No menu lateral, vá em **APIs e Serviços** → **Biblioteca**
2. Busque por "Google+ API"
3. Clique em **Ativar**

### 3. Configurar Tela de Consentimento OAuth

1. Vá em **APIs e Serviços** → **Tela de consentimento OAuth**
2. Selecione **Externo** (para testes) ou **Interno** (se tiver Google Workspace)
3. Preencha:
   - **Nome do app**: Orbees
   - **Email de suporte do usuário**: seu email
   - **Domínio autorizado**: `localhost` (dev) ou seu domínio (produção)
   - **Email do desenvolvedor**: seu email
4. Clique em **Salvar e continuar**
5. Em **Escopos**, adicione:
   - `email`
   - `profile`
   - `openid`
6. Conclua o assistente

### 4. Criar Credenciais OAuth 2.0

1. Vá em **APIs e Serviços** → **Credenciais**
2. Clique em **Criar credenciais** → **ID do cliente OAuth 2.0**
3. Selecione **Aplicativo da Web**
4. Configure:
   - **Nome**: Orbees Backend
   - **URIs de redirecionamento autorizados**:
     - Desenvolvimento: `http://localhost:5210/api/auth/google/callback`
     - Produção: `https://seu-dominio.com/api/auth/google/callback`
   - **Origens JavaScript autorizadas**:
     - Desenvolvimento: `http://localhost:5210`
     - Produção: `https://seu-dominio.com`
5. Clique em **Criar**

### 5. Copiar Credenciais

Após criar, você verá:
- **ID do cliente**: `123456789-abcdefg.apps.googleusercontent.com`
- **Chave secreta do cliente**: `GOCSPX-xyz123abc456`

Copie esses valores.

### 6. Configurar no `.env`

No arquivo `orbees-api/.env`:

```bash
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xyz123abc456
```

### 7. Reiniciar a API

```bash
# Docker
docker compose -f docker-compose.development.yml restart api

# Local
# Pare o servidor (Ctrl+C) e rode novamente
dotnet run
```

### 8. Testar Login com Google

1. Acesse http://localhost:5173/login
2. Clique no botão "Entrar com Google"
3. Você será redirecionado para tela de consentimento do Google
4. Após autorizar, será redirecionado de volta para o Orbees logado

---

## Deploy em Produção

### Opção 1: Deploy com Docker Compose (VPS/Servidor)

#### Pré-requisitos

- Servidor Linux (Ubuntu 22.04 LTS recomendado)
- Docker e Docker Compose instalados
- Domínio configurado apontando para o IP do servidor
- Certificado SSL (Let's Encrypt recomendado)

#### Passos

**1. Clonar repositório no servidor:**

```bash
ssh user@seu-servidor.com
git clone https://github.com/TheRermz/orbees.git
cd orbees
```

**2. Configurar variáveis de ambiente:**

Edite `orbees-api/.env` com valores de produção:

```bash
DB_HOST=db
DB_PORT=5432
DB_USER=postgres_prod
DB_PASSWORD=SenhaForte123!
DB_NAME=orbees_prod

POSTGRES_USER=postgres_prod
POSTGRES_PASSWORD=SenhaForte123!
POSTGRES_DB=orbees_prod

API_PORT=5210
FRONTEND_URL=https://seu-dominio.com

JWT_SECRET_KEY=chave-super-secreta-minimo-32-caracteres-aleatoria
JWT_ISSUER=orbees-api
JWT_AUDIENCE=orbees-frontend

GOOGLE_CLIENT_ID=seu-client-id-google
GOOGLE_CLIENT_SECRET=seu-client-secret-google

# SMTP de produção (ex: SendGrid, AWS SES, Gmail SMTP)
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USER=apikey
MAIL_PASSWORD=SG.xxx
MAIL_FROM=noreply@seu-dominio.com

SEED_DB=false
```

Edite `orbees-frontend/.env`:

```bash
VITE_API_BASE_URL=https://api.seu-dominio.com/api
```

**3. Configurar Nginx como Reverse Proxy:**

Instale Nginx:

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

Crie configuração Nginx (`/etc/nginx/sites-available/orbees`):

```nginx
# Frontend
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# API
server {
    listen 80;
    server_name api.seu-dominio.com;

    location / {
        proxy_pass http://localhost:5210;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar configuração:

```bash
sudo ln -s /etc/nginx/sites-available/orbees /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**4. Obter certificado SSL:**

```bash
sudo certbot --nginx -d seu-dominio.com -d api.seu-dominio.com
```

**5. Subir aplicação:**

```bash
docker compose -f docker-compose.production.yml up -d
```

**6. Verificar status:**

```bash
docker compose -f docker-compose.production.yml ps
docker compose -f docker-compose.production.yml logs -f
```

**7. Configurar backup automático do banco:**

Crie script `/opt/orbees-backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/orbees"
mkdir -p $BACKUP_DIR

docker exec orbees-db pg_dump -U postgres_prod orbees_prod > $BACKUP_DIR/orbees_$DATE.sql
gzip $BACKUP_DIR/orbees_$DATE.sql

# Manter apenas últimos 30 dias
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

Adicionar ao crontab:

```bash
chmod +x /opt/orbees-backup.sh
crontab -e
```

Adicione linha:

```
0 2 * * * /opt/orbees-backup.sh
```

### Opção 2: Deploy em Cloud (AWS/Azure/GCP)

**AWS (exemplo com Elastic Beanstalk + RDS):**

1. Criar RDS PostgreSQL
2. Criar Elastic Beanstalk com Docker
3. Configurar variáveis de ambiente
4. Deploy via CLI ou console

**Azure (exemplo com App Service):**

1. Criar Azure Database for PostgreSQL
2. Criar App Service com Docker
3. Configurar variáveis de ambiente
4. Deploy via GitHub Actions ou CLI

**GCP (exemplo com Cloud Run):**

1. Criar Cloud SQL PostgreSQL
2. Criar Cloud Run service
3. Configurar variáveis de ambiente
4. Deploy via gcloud CLI

### Checklist de Produção

- [ ] Variáveis de ambiente configuradas corretamente
- [ ] `JWT_SECRET_KEY` forte e aleatória (mínimo 64 caracteres)
- [ ] `SEED_DB=false` (não popular dados de teste em produção)
- [ ] Banco de dados em servidor separado ou serviço gerenciado
- [ ] SMTP configurado com serviço confiável (não Mailpit)
- [ ] HTTPS habilitado com certificado válido
- [ ] CORS configurado com domínio específico (não `*`)
- [ ] Backup automático do banco configurado
- [ ] Monitoramento e logs configurados
- [ ] Firewall configurado (apenas portas 80, 443, 22)
- [ ] Senhas fortes em todas as contas
- [ ] OAuth Google configurado com domínio de produção
- [ ] Rate limiting habilitado
- [ ] Testes de carga realizados
