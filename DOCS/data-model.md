# Modelo de Dados — Orbees

Banco de dados relacional **PostgreSQL 14**, gerenciado via **Entity Framework Core 8** com Migrations e Fluent API.

---

## Índice

- [Diagrama ERD](#diagrama-erd)
- [Tabelas](#tabelas)
  - [users](#users)
  - [roles](#roles)
  - [user_roles](#user_roles)
  - [banks](#banks)
  - [bank_accounts](#bank_accounts)
  - [categories](#categories)
  - [groups](#groups)
  - [group_roles](#group_roles)
  - [group_members](#group_members)
  - [transactions](#transactions)
  - [export_jobs](#export_jobs)
- [Enums](#enums)
- [Relacionamentos](#relacionamentos)
- [Índices](#índices)
- [Convenções](#convenções)

---

## Diagrama ERD

```
┌─────────────┐       ┌──────────────┐
│    roles    │       │  group_roles │
│─────────────│       │──────────────│
│ id (PK)     │       │ id (PK)      │
│ name        │       │ name         │
└──────┬──────┘       └──────┬───────┘
       │ 1                   │ 1
       │ N                   │ N
┌──────┴──────┐       ┌──────┴───────┐
│ user_roles  │       │ group_members│
│─────────────│       │──────────────│
│ id (PK)     │       │ id (PK)      │
│ user_id(FK)─┼─┐     │ group_id(FK)─┼─┐
│ role_id(FK) │ │     │ user_id (FK)─┼─┼─┐
└─────────────┘ │     │ group_role_id│ │ │
                │     │ is_active    │ │ │
                │     │ left_at      │ │ │
                │     │ promoted_at  │ │ │
                │     └─────────────┘ │ │
                │                     │ │
       ┌────────┘─────────────────────┘ │
       │         ┌───────────────────────┘
       ▼         ▼
┌─────────────────────────────────────────────────────────────┐
│                           users                             │
│─────────────────────────────────────────────────────────────│
│ id (PK)                                                     │
│ email (UNIQUE)                                              │
│ fullname                                                    │
│ username (UNIQUE)                                           │
│ password (nullable — null para OAuth)                       │
│ email_confirmed                                             │
│ email_confirmation_token                                    │
│ email_confirmation_expires_at                               │
│ pwd_reset_token                                             │
│ pwd_reset_expires_at                                        │
│ oauth_provider                                              │
│ oauth_provider_id                                           │
│ is_active                                                   │
│ profile_picture_path                                        │
│ created_at                                                  │
│ updated_at                                                  │
└──┬──────────────────────────────────────┬──────────────────┘
   │ 1                                    │ 1
   │ N                                    │ N
┌──┴──────────────┐             ┌─────────┴──────────────┐
│  bank_accounts  │             │       categories        │
│─────────────────│             │────────────────────────│
│ id (PK)         │             │ id (PK)                 │
│ name            │             │ name                    │
│ agency          │   ┌─────────┤ user_id (FK, nullable)  │
│ account_number  │   │         │ group_id (FK, nullable) ├──────┐
│ user_id (FK)    │   │         │ icon                    │      │
│ bank_id (FK)────┼───┘         │ color                   │      │
│ is_active       │             │ is_active               │      │
│ created_at      │             │ created_at              │      │
│ updated_at      │             │ updated_at              │      │
└──┬──────────────┘             └─────────────────────────┘      │
   │                                                             │
┌──┴──────────────┐             ┌─────────────────────────┐      │
│     banks       │             │         groups          │◄─────┘
│─────────────────│             │─────────────────────────│
│ id (PK)         │             │ id (PK)                 │
│ bank_name       │             │ name                    │
│ bank_code       │             │ description             │
│ ispb            │             │ is_active               │
│ csv_header_sig  │             │ created_at              │
│ is_active       │             │ updated_at              │
└─────────────────┘             └─────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                              transactions                                    │
│──────────────────────────────────────────────────────────────────────────────│
│ id (PK)                                                                      │
│ title                             user_id (FK) ──────────► users             │
│ original_description              bank_account_id (FK) ──► bank_accounts     │
│ description                       category_id (FK) ──────► categories        │
│ amount (decimal 18,2)             group_category_id (FK) ► categories        │
│ transaction_date                  group_id (FK) ─────────► groups            │
│ type (enum: Receita|Despesa)                                                 │
│ origin (enum: Manual|OFX|CSV)                                                │
│ merchant_document                                                            │
│ is_active                                                                    │
│ group_link_active                                                            │
│ created_at                                                                   │
│ updated_at                                                                   │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                              export_jobs                                     │
│──────────────────────────────────────────────────────────────────────────────│
│ id (PK)                                                                      │
│ user_id (FK) ────────────────────────────────────────────► users             │
│ format (enum: CSV|Excel|PDF)                                                 │
│ from (nullable)                                                              │
│ to (nullable)                                                                │
│ status (enum: Pending|Processing|Completed|Failed)                           │
│ file_path (nullable)                                                         │
│ error_message (nullable)                                                     │
│ created_at                                                                   │
│ updated_at                                                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Tabelas

### `users`

Armazena os usuários da plataforma. Suporta autenticação tradicional (email/senha) e OAuth.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador único |
| `email` | varchar(256) | NOT NULL | UNIQUE (`ux_user_email`) | Email do usuário |
| `fullname` | varchar(256) | NOT NULL | | Nome completo |
| `username` | varchar(50) | NOT NULL | UNIQUE (`ux_user_username`) | Nome de usuário |
| `password` | varchar(256) | NULL | | Hash BCrypt (null = usuário OAuth) |
| `email_confirmed` | boolean | NOT NULL | DEFAULT false | Se o email foi confirmado |
| `email_confirmation_token` | text | NULL | | Token de confirmação de email |
| `email_confirmation_expires_at` | timestamptz | NULL | | Expiração do token de confirmação |
| `pwd_reset_token` | text | NULL | | Token de reset de senha |
| `pwd_reset_expires_at` | timestamptz | NULL | | Expiração do token de reset |
| `oauth_provider` | text | NULL | | Nome do provedor OAuth (ex: "Google") |
| `oauth_provider_id` | text | NULL | | ID do usuário no provedor OAuth |
| `is_active` | boolean | NOT NULL | DEFAULT true | Soft delete |
| `profile_picture_path` | text | NULL | | Caminho relativo da foto de perfil |
| `created_at` | timestamptz | NOT NULL | | Criação automática (AuditableEntity) |
| `updated_at` | timestamptz | NULL | | Atualização automática (AuditableEntity) |

---

### `roles`

Roles globais do sistema.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | int | NOT NULL | PK | Identificador |
| `name` | varchar | NOT NULL | | Nome da role |

**Valores** (populados via seed):
| id | name |
|----|------|
| 1 | Admin |
| 2 | User |

---

### `user_roles`

Tabela de junção entre usuários e roles globais (N:N).

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `user_id` | uuid | NOT NULL | FK → users | Usuário |
| `role_id` | int | NOT NULL | FK → roles | Role |
| `created_at` | timestamptz | NOT NULL | | Auditoria |
| `updated_at` | timestamptz | NULL | | Auditoria |

---

### `banks`

Catálogo de bancos brasileiros, utilizado para validar contas e parsear CSVs.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | int | NOT NULL | PK (identity) | Identificador |
| `bank_name` | varchar | NOT NULL | | Nome do banco |
| `bank_code` | varchar | NOT NULL | | Código COMPE (ex: "260") |
| `ispb` | varchar | NOT NULL | | Código ISPB do Banco Central |
| `csv_header_signature` | text | NULL | | Primeira linha esperada do CSV do banco |
| `is_active` | boolean | NOT NULL | DEFAULT true | Se o banco está disponível |

**Bancos no seed** (amostra):
| code | name |
|------|------|
| 001 | Banco do Brasil |
| 033 | Santander |
| 104 | Caixa Econômica Federal |
| 237 | Bradesco |
| 260 | Nubank |
| 341 | Itaú Unibanco |
| 077 | Banco Inter |

---

### `bank_accounts`

Contas bancárias cadastradas pelos usuários.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `name` | varchar | NOT NULL | | Nome da conta (ex: "Conta Corrente") |
| `agency` | varchar | NULL | | Agência |
| `account_number` | varchar | NULL | | Número da conta |
| `user_id` | uuid | NOT NULL | FK → users (CASCADE) | Dono da conta |
| `bank_id` | int | NOT NULL | FK → banks (RESTRICT) | Banco associado |
| `is_active` | boolean | NOT NULL | DEFAULT true | Soft delete |
| `created_at` | timestamptz | NOT NULL | | Auditoria |
| `updated_at` | timestamptz | NULL | | Auditoria |

---

### `categories`

Categorias para classificação de transações. Podem ser do sistema, pessoais ou de grupo.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `name` | varchar | NOT NULL | | Nome da categoria |
| `icon` | varchar | NULL | | Emoji ou código de ícone |
| `color` | varchar | NULL | | Cor em hex (ex: "#FF6B6B") |
| `user_id` | uuid | NULL | FK → users (CASCADE) | null = sistema ou grupo |
| `group_id` | uuid | NULL | FK → groups (CASCADE) | null = pessoal ou sistema |
| `is_active` | boolean | NOT NULL | DEFAULT true | Soft delete |
| `created_at` | timestamptz | NOT NULL | | Auditoria |
| `updated_at` | timestamptz | NULL | | Auditoria |

**Tipos por combinação de campos**:

| `user_id` | `group_id` | Tipo |
|-----------|-----------|------|
| NOT NULL | NULL | Categoria pessoal |
| NULL | NOT NULL | Categoria de grupo |
| NULL | NULL | Categoria do sistema (seed) |

---

### `groups`

Grupos de controle financeiro compartilhado.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `name` | varchar | NOT NULL | | Nome do grupo |
| `description` | text | NULL | | Descrição opcional |
| `is_active` | boolean | NOT NULL | DEFAULT true | Soft delete |
| `created_at` | timestamptz | NOT NULL | | Auditoria |
| `updated_at` | timestamptz | NULL | | Auditoria |

---

### `group_roles`

Roles específicas de grupo (Admin e Member).

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | int | NOT NULL | PK | Identificador |
| `name` | varchar | NOT NULL | | Nome da role |

**Valores** (seed):
| id | name |
|----|------|
| 1 | Admin |
| 2 | Member |

---

### `group_members`

Membros de cada grupo. Registra histórico de entradas, saídas e promoções.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `group_id` | uuid | NOT NULL | FK → groups (CASCADE) | Grupo |
| `user_id` | uuid | NOT NULL | FK → users (CASCADE) | Usuário membro |
| `group_role_id` | int | NOT NULL | FK → group_roles (RESTRICT) | Role no grupo |
| `is_active` | boolean | NOT NULL | DEFAULT true | Membro ativo ou saiu |
| `left_at` | timestamptz | NULL | | Data de saída do grupo |
| `promoted_at` | timestamptz | NULL | | Data da última promoção |
| `created_at` | timestamptz | NOT NULL | | Data de entrada |
| `updated_at` | timestamptz | NULL | | Auditoria |

**Índices**: `user_id`, `group_id`

---

### `transactions`

Transações financeiras dos usuários. Núcleo do sistema.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `title` | varchar(256) | NOT NULL | | Título da transação |
| `original_description` | varchar(512) | NULL | | Descrição original do OFX/CSV |
| `description` | varchar(512) | NULL | | Descrição editável pelo usuário |
| `amount` | decimal(18,2) | NOT NULL | | Valor (sempre positivo) |
| `transaction_date` | timestamptz | NOT NULL | | Data da transação |
| `type` | varchar | NOT NULL | ENUM string | `Receita` ou `Despesa` |
| `origin` | varchar | NOT NULL | ENUM string | `Manual`, `OFX` ou `CSV` |
| `merchant_document` | varchar(18) | NULL | | CPF (14) ou CNPJ (18) do estabelecimento |
| `is_active` | boolean | NOT NULL | DEFAULT true | Soft delete |
| `group_link_active` | boolean | NOT NULL | DEFAULT true | Bloqueia edição do `group_category_id` |
| `user_id` | uuid | NOT NULL | FK → users (CASCADE) | Proprietário |
| `bank_account_id` | uuid | NULL | FK → bank_accounts (SET NULL) | Conta bancária |
| `category_id` | uuid | NULL | FK → categories (SET NULL) | Categoria pessoal |
| `group_category_id` | uuid | NULL | FK → categories (SET NULL) | Categoria do grupo |
| `group_id` | uuid | NULL | FK → groups (SET NULL) | Grupo vinculado |
| `created_at` | timestamptz | NOT NULL | | Auditoria |
| `updated_at` | timestamptz | NULL | | Auditoria |

**Índices**: `user_id`, `group_id`, `transaction_date`, `original_description`

> A coluna `original_description` é indexada para viabilizar a busca de transações similares usada na **sugestão automática de categoria**.

---

### `export_jobs`

Jobs de exportação assíncrona de transações.

| Coluna | Tipo | Null | Restrição | Descrição |
|--------|------|------|-----------|-----------|
| `id` | uuid | NOT NULL | PK | Identificador |
| `user_id` | uuid | NOT NULL | FK → users (CASCADE) | Solicitante |
| `format` | varchar | NOT NULL | ENUM string | `CSV`, `Excel` ou `PDF` |
| `from` | timestamptz | NULL | | Início do período exportado |
| `to` | timestamptz | NULL | | Fim do período exportado |
| `status` | varchar | NOT NULL | ENUM string | `Pending`, `Processing`, `Completed` ou `Failed` |
| `file_path` | text | NULL | | Caminho do arquivo gerado (após `Completed`) |
| `error_message` | text | NULL | | Mensagem de erro (se `Failed`) |
| `created_at` | timestamptz | NOT NULL | | Auditoria |
| `updated_at` | timestamptz | NULL | | Auditoria |

**Caminho dos arquivos**: `exports/{userId}/{jobId}_{filename}.{ext}`

---

## Enums

Armazenados como `varchar` no banco (via `.HasConversion<string>()`):

### `TransactionType`
| Valor | Descrição |
|-------|-----------|
| `Receita` | Entrada de dinheiro |
| `Despesa` | Saída de dinheiro |

### `TransactionOrigin`
| Valor | Descrição |
|-------|-----------|
| `Manual` | Criada pelo usuário via formulário |
| `OFX` | Importada de arquivo OFX |
| `CSV` | Importada de arquivo CSV |

### `ExportFormat`
| Valor | Content-Type | Extensão |
|-------|-------------|---------|
| `CSV` | `text/csv` | `.csv` |
| `Excel` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | `.xlsx` |
| `PDF` | `application/pdf` | `.pdf` |

### `ExportJobStatus`
| Valor | Descrição |
|-------|-----------|
| `Pending` | Aguardando processamento |
| `Processing` | Em geração pelo BackgroundService |
| `Completed` | Arquivo disponível para download |
| `Failed` | Erro durante a geração |

---

## Relacionamentos

| Tabela Origem | Coluna | Tabela Destino | Cardinalidade | On Delete |
|---------------|--------|----------------|---------------|-----------|
| `user_roles` | `user_id` | `users` | N:1 | CASCADE |
| `user_roles` | `role_id` | `roles` | N:1 | RESTRICT |
| `bank_accounts` | `user_id` | `users` | N:1 | CASCADE |
| `bank_accounts` | `bank_id` | `banks` | N:1 | RESTRICT |
| `categories` | `user_id` | `users` | N:1 | CASCADE |
| `categories` | `group_id` | `groups` | N:1 | CASCADE |
| `group_members` | `group_id` | `groups` | N:1 | CASCADE |
| `group_members` | `user_id` | `users` | N:1 | CASCADE |
| `group_members` | `group_role_id` | `group_roles` | N:1 | RESTRICT |
| `transactions` | `user_id` | `users` | N:1 | CASCADE |
| `transactions` | `bank_account_id` | `bank_accounts` | N:1 | SET NULL |
| `transactions` | `category_id` | `categories` | N:1 | SET NULL |
| `transactions` | `group_category_id` | `categories` | N:1 | SET NULL |
| `transactions` | `group_id` | `groups` | N:1 | SET NULL |
| `export_jobs` | `user_id` | `users` | N:1 | CASCADE |

**Comportamento dos ON DELETE:**
- **CASCADE**: ao deletar o pai, os filhos são deletados em cascata (ex: deletar usuário remove suas transações)
- **SET NULL**: ao deletar o pai, a FK do filho vira NULL (ex: deletar conta bancária não remove transações, apenas desvincula)
- **RESTRICT**: não permite deletar o pai enquanto houver filhos referenciando (ex: não é possível deletar uma role enquanto houver usuários com ela)

---

## Índices

| Tabela | Índice | Colunas | Tipo |
|--------|--------|---------|------|
| `users` | `ux_user_email` | `email` | UNIQUE |
| `users` | `ux_user_username` | `username` | UNIQUE |
| `group_members` | — | `user_id` | INDEX |
| `group_members` | — | `group_id` | INDEX |
| `transactions` | — | `user_id` | INDEX |
| `transactions` | — | `group_id` | INDEX |
| `transactions` | — | `transaction_date` | INDEX |
| `transactions` | — | `original_description` | INDEX |

---

## Convenções

### Nomenclatura

- **Tabelas**: `snake_case`, plural (ex: `bank_accounts`, `group_members`)
- **Colunas**: `snake_case` (ex: `created_at`, `is_active`, `bank_account_id`)
- **PKs**: sempre `id` (UUID para entidades de domínio, int para tabelas de lookup)
- **FKs**: `{entidade_referenciada}_id` (ex: `user_id`, `bank_id`)

### UUIDs vs Integers

- **UUID**: entidades de domínio (`users`, `bank_accounts`, `categories`, `groups`, `group_members`, `transactions`, `export_jobs`)
- **Integer**: tabelas de lookup com conjunto fixo (`roles`, `group_roles`, `banks`)

### Soft Delete

As entidades principais não são deletadas fisicamente do banco. A coluna `is_active = false` marca o registro como inativo. Queries de listagem sempre filtram por `is_active = true`.

Tabelas com soft delete: `users`, `bank_accounts`, `categories`, `groups`, `group_members`, `transactions`

### Auditoria Automática

Todas as tabelas que herdam de `AuditableEntity` têm `created_at` e `updated_at` preenchidos automaticamente pelo `ApiDbContext.SaveChangesAsync()`:

```csharp
// EntityState.Added → seta created_at = UtcNow
// EntityState.Modified → seta updated_at = UtcNow
```

Exceções (sem auditoria): `roles`, `group_roles`, `banks` (tabelas de lookup imutáveis)

### Fuso Horário

Todas as colunas de data/hora usam `timestamptz` (timestamp with time zone). Valores armazenados e retornados em **UTC**.
