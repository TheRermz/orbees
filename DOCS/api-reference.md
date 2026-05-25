# API Reference — Orbees

**Base URL**: `http://localhost:5210/api`

Todos os endpoints protegidos exigem o header:
```
Authorization: Bearer {jwt_token}
```

Respostas de erro seguem o padrão:
```json
{ "message": "Descrição do erro" }
```

---

## Índice

- [Autenticação](#autenticação--apiauth)
- [Usuário](#usuário--apiuser)
- [Bancos](#bancos--apibanks)
- [Contas Bancárias](#contas-bancárias--apibank-accounts)
- [Categorias](#categorias--apicategories)
- [Grupos](#grupos--apigroups)
- [Transações](#transações--apitransactions)
- [Dashboard](#dashboard--apidashboard)
- [Exportação](#exportação--apitransactionsexport)
- [Códigos de Erro](#códigos-de-erro)

---

## Autenticação — `/api/auth`

### POST `/api/auth/register`

Registra novo usuário. Envia email de confirmação automaticamente.

**Auth**: Não

**Request Body**:
```json
{
  "email": "joao@example.com",
  "fullname": "João Silva",
  "username": "joaosilva",
  "password": "MinhaS3nha!"
}
```

**Response 201**:
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "joao@example.com",
  "username": "joaosilva",
  "fullname": "João Silva",
  "profilePicturePath": null
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 400 | Dados inválidos (email, senha curta, campos obrigatórios) |
| 409 | Email ou username já cadastrado |

---

### POST `/api/auth/login`

Autentica com email e senha. Retorna JWT.

**Auth**: Não

**Request Body**:
```json
{
  "email": "joao@example.com",
  "password": "MinhaS3nha!"
}
```

**Response 200**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 401 | Credenciais inválidas, email não confirmado ou conta inativa |
| 404 | Email não encontrado |

---

### GET `/api/auth/confirm-email`

Confirma o email do usuário via token enviado por email.

**Auth**: Não

**Query Params**:
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `token` | string | Sim | Token de confirmação recebido por email |

**Exemplo**: `GET /api/auth/confirm-email?token=abc123...`

**Response 200**:
```json
{
  "message": "Email confirmado com sucesso"
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Token inválido |
| 409 | Token expirado |

---

### POST `/api/auth/forgot-password`

Solicita reset de senha. Envia email com link de recuperação.

**Auth**: Não

> A resposta é sempre genérica, independente de o email existir.

**Request Body**:
```json
{
  "email": "joao@example.com"
}
```

**Response 200**:
```json
{
  "message": "Se o email existir, você receberá as instruções em breve."
}
```

---

### POST `/api/auth/reset-password`

Redefine a senha usando token recebido por email.

**Auth**: Não

**Request Body**:
```json
{
  "token": "abc123-def456-...",
  "newPassword": "NovaSenha123!"
}
```

**Response 200**:
```json
{
  "message": "Senha redefinida com sucesso."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Token inválido |
| 409 | Token expirado |

---

### GET `/api/auth/google`

Inicia o fluxo OAuth com Google. Redireciona o navegador para a página de autenticação do Google.

**Auth**: Não

**Response**: `302 Redirect` → Google OAuth

---

### GET `/api/auth/google/callback`

Callback do Google OAuth. Ao concluir, redireciona para o frontend com o JWT na query string.

**Auth**: Não

**Response**: `302 Redirect` → `{FRONTEND_URL}/auth/callback?token={jwt}`

---

## Usuário — `/api/user`

### GET `/api/user/me`

Retorna o perfil do usuário autenticado.

**Auth**: Sim

**Response 200**:
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "joao@example.com",
  "username": "joaosilva",
  "fullname": "João Silva",
  "profilePicturePath": "/uploads/profilePictures/joaosilva/foto.jpeg"
}
```

---

### PUT `/api/user/me`

Atualiza nome completo e username do usuário autenticado.

**Auth**: Sim

**Request Body**:
```json
{
  "fullname": "João da Silva",
  "username": "joaodasilva"
}
```

**Response 200**: `UserReadDto` atualizado

**Erros**:
| Status | Situação |
|--------|----------|
| 409 | Username já em uso |

---

### PUT `/api/user/me/password`

Altera a senha do usuário autenticado.

**Auth**: Sim

**Request Body**:
```json
{
  "currentPassword": "MinhaS3nha!",
  "newPassword": "NovaSenha456!"
}
```

**Response 200**:
```json
{
  "message": "Senha atualizada com sucesso."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 401 | Senha atual incorreta |

---

### DELETE `/api/user/me`

Desativa a conta do usuário (soft delete). O usuário não conseguirá mais fazer login.

**Auth**: Sim

**Response 200**:
```json
{
  "message": "Conta desativada com sucesso."
}
```

---

### PUT `/api/user/me/picture`

Faz upload de foto de perfil.

**Auth**: Sim

**Content-Type**: `multipart/form-data`

**Form Fields**:
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `file` | File | Imagem (JPEG, PNG) |

**Response 200**: `UserReadDto` com `profilePicturePath` atualizado

---

### DELETE `/api/user/me/picture/delete`

Remove a foto de perfil do usuário.

**Auth**: Sim

**Response 200**:
```json
{
  "message": "Foto de perfil removida com sucesso."
}
```

---

## Bancos — `/api/banks`

### GET `/api/banks`

Lista todos os bancos brasileiros cadastrados.

**Auth**: Sim

**Response 200**:
```json
[
  {
    "id": 1,
    "name": "Itaú Unibanco",
    "code": "341"
  },
  {
    "id": 2,
    "name": "Nubank",
    "code": "260"
  }
]
```

---

### GET `/api/banks/{id}`

Retorna um banco por ID.

**Auth**: Sim

**Response 200**:
```json
{
  "id": 2,
  "name": "Nubank",
  "code": "260"
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Banco não encontrado |

---

## Contas Bancárias — `/api/bank-accounts`

### GET `/api/bank-accounts`

Lista as contas bancárias ativas do usuário autenticado.

**Auth**: Sim

**Response 200**:
```json
[
  {
    "id": "b1c2d3e4-...",
    "name": "Conta Principal",
    "agency": "0001",
    "accountNumber": "12345-6",
    "bankName": "Nubank",
    "bankCode": "260"
  }
]
```

---

### GET `/api/bank-accounts/{id}`

Retorna uma conta bancária por ID.

**Auth**: Sim

**Response 200**: `BankAccountReadDto`

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Conta não encontrada ou não pertence ao usuário |

---

### POST `/api/bank-accounts`

Cria uma nova conta bancária.

**Auth**: Sim

**Request Body**:
```json
{
  "name": "Conta Corrente Nubank",
  "agency": "0001",
  "accountNumber": "12345-6",
  "bankId": 2
}
```

**Response 201**: `BankAccountReadDto` criado

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Banco (`bankId`) não encontrado |

---

### PUT `/api/bank-accounts/{id}`

Atualiza uma conta bancária.

**Auth**: Sim

**Request Body**:
```json
{
  "name": "Conta Corrente",
  "agency": "0001",
  "accountNumber": "99999-0"
}
```

**Response 200**: `BankAccountReadDto` atualizado

---

### DELETE `/api/bank-accounts/{id}`

Remove uma conta bancária (soft delete).

**Auth**: Sim

**Response 200**:
```json
{
  "message": "Conta bancária removida com sucesso."
}
```

---

## Categorias — `/api/categories`

### GET `/api/categories`

Lista categorias do usuário: pessoais + do sistema. Se `groupId` fornecido, inclui categorias do grupo.

**Auth**: Sim

**Query Params**:
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `groupId` | uuid | Não | Filtra categorias de um grupo específico |

**Response 200**:
```json
[
  {
    "id": "c1d2e3f4-...",
    "name": "Alimentação",
    "icon": "🍕",
    "color": "#FF6B6B",
    "isSystemCategory": true,
    "groupId": null,
    "groupName": null
  },
  {
    "id": "d2e3f4g5-...",
    "name": "Streaming",
    "icon": "📺",
    "color": "#4ECDC4",
    "isSystemCategory": false,
    "groupId": null,
    "groupName": null
  }
]
```

---

### GET `/api/categories/{id}`

Retorna uma categoria por ID.

**Auth**: Sim

**Response 200**: `CategoryReadDto`

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Categoria não encontrada |

---

### POST `/api/categories`

Cria uma nova categoria. Se `groupId` for fornecido, cria categoria de grupo.

**Auth**: Sim

**Request Body**:
```json
{
  "name": "Streaming",
  "icon": "📺",
  "color": "#4ECDC4",
  "groupId": null
}
```

**Response 201**: `CategoryReadDto` criado

**Erros**:
| Status | Situação |
|--------|----------|
| 409 | Categoria com esse nome já existe no escopo (usuário ou grupo) |

---

### PUT `/api/categories/{id}`

Atualiza uma categoria.

**Auth**: Sim

**Request Body**:
```json
{
  "name": "Entretenimento",
  "icon": "🎬",
  "color": "#6C5CE7"
}
```

**Response 200**: `CategoryReadDto` atualizado

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Categoria não encontrada |
| 409 | Nome duplicado no mesmo escopo |

---

### DELETE `/api/categories/{id}`

Remove uma categoria (soft delete).

**Auth**: Sim

**Response 200**:
```json
{
  "message": "Categoria removida com sucesso."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Categoria não encontrada |
| 409 | Tentativa de deletar categoria do sistema |

---

## Grupos — `/api/groups`

### GET `/api/groups`

Lista todos os grupos dos quais o usuário autenticado é membro ativo.

**Auth**: Sim

**Response 200**:
```json
[
  {
    "id": "g1h2i3j4-...",
    "name": "Família",
    "description": "Gastos da família",
    "memberCount": 4,
    "createdAt": "2026-04-04T00:00:00Z"
  }
]
```

---

### GET `/api/groups/{groupId}`

Retorna um grupo por ID.

**Auth**: Sim (deve ser membro)

**Response 200**: `GroupReadDto`

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Grupo não encontrado ou usuário não é membro |

---

### GET `/api/groups/{groupId}/members`

Lista os membros de um grupo.

**Auth**: Sim (deve ser membro)

**Response 200**:
```json
[
  {
    "id": "m1n2o3p4-...",
    "userId": "a1b2c3d4-...",
    "username": "joaosilva",
    "fullname": "João Silva",
    "role": "Admin",
    "joinedAt": "2026-04-04T10:30:00Z"
  },
  {
    "id": "m2n3o4p5-...",
    "userId": "b2c3d4e5-...",
    "username": "maria",
    "fullname": "Maria Oliveira",
    "role": "Member",
    "joinedAt": "2026-04-05T08:00:00Z"
  }
]
```

---

### GET `/api/groups/roles`

Lista as roles disponíveis para membros de grupo.

**Auth**: Sim

**Response 200**:
```json
[
  { "id": 1, "name": "Admin" },
  { "id": 2, "name": "Member" }
]
```

---

### POST `/api/groups`

Cria um novo grupo. O criador é adicionado automaticamente como Admin.

**Auth**: Sim

**Request Body**:
```json
{
  "name": "Família",
  "description": "Controle de gastos da família"
}
```

**Response 201**: `GroupReadDto` criado

---

### PUT `/api/groups/{groupId}`

Atualiza nome e descrição do grupo.

**Auth**: Sim (Admin do grupo)

**Request Body**:
```json
{
  "name": "Família Silva",
  "description": "Gastos da família Silva"
}
```

**Response 200**: `GroupReadDto` atualizado

**Erros**:
| Status | Situação |
|--------|----------|
| 401 | Usuário não é Admin do grupo |

---

### DELETE `/api/groups/{groupId}`

Remove o grupo (soft delete).

**Auth**: Sim (Admin do grupo)

**Response 200**:
```json
{
  "message": "Grupo deletado com sucesso."
}
```

---

### POST `/api/groups/{groupId}/members`

Adiciona um usuário ao grupo.

**Auth**: Sim (Admin do grupo)

**Request Body**:
```json
{
  "userId": "b2c3d4e5-f6g7-8901-bcde-f12345678901"
}
```

**Response 201**: `GroupMemberReadDto` criado

**Erros**:
| Status | Situação |
|--------|----------|
| 409 | Usuário já é membro do grupo |

---

### PUT `/api/groups/{groupId}/members/{memberId}/role`

Altera a role de um membro (promover para Admin ou rebaixar para Member).

**Auth**: Sim (Admin do grupo)

**Request Body**:
```json
{
  "groupRoleId": "1"
}
```

> `groupRoleId`: `1` = Admin, `2` = Member

**Response 200**:
```json
{
  "message": "Função do membro alterada com sucesso."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 409 | Tentativa de rebaixar o único Admin do grupo |

---

### DELETE `/api/groups/{groupId}/members/{memberId}`

Remove um membro do grupo.

**Auth**: Sim (Admin do grupo)

**Response 200**:
```json
{
  "message": "Membro removido com sucesso."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 409 | Tentativa de remover o único Admin do grupo |

---

### DELETE `/api/groups/{groupId}/leave`

O usuário autenticado sai voluntariamente do grupo.

**Auth**: Sim (deve ser membro)

**Response 200**:
```json
{
  "message": "Você saiu do grupo."
}
```

**Erros**:
| Status | Situação |
|--------|----------|
| 409 | Único Admin tentando sair sem transferir a role |

---

## Transações — `/api/transactions`

### GET `/api/transactions`

Lista as transações do usuário autenticado, com filtro opcional por período.

**Auth**: Sim

**Query Params**:
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `from` | datetime (ISO 8601) | Não | Início do período |
| `to` | datetime (ISO 8601) | Não | Fim do período |

**Exemplo**: `GET /api/transactions?from=2026-05-01&to=2026-05-31`

**Response 200**:
```json
[
  {
    "id": "t1u2v3w4-...",
    "title": "Mercado Extra",
    "originalDescription": "COMPRA DEBITO - MERCADO EXTRA",
    "description": null,
    "amount": 350.75,
    "transactionDate": "2026-05-10T00:00:00Z",
    "type": "Despesa",
    "transactionOrigin": "OFX",
    "merchantDocument": null,
    "categoryId": "c1d2e3f4-...",
    "categoryName": "Alimentação",
    "categoryColor": "#FF6B6B",
    "categoryIcon": "🍕",
    "groupCategoryId": null,
    "groupCategoryName": null,
    "groupId": null,
    "groupName": null,
    "groupLinkActive": true,
    "bankAccountId": "b1c2d3e4-...",
    "bankAccountName": "Conta Nubank",
    "createdAt": "2026-05-11T14:00:00Z",
    "updatedAt": null
  }
]
```

---

### GET `/api/transactions/group/{groupId}`

Lista as transações vinculadas a um grupo. Exige membership ativa.

**Auth**: Sim (membro do grupo)

**Query Params**: igual ao `GET /api/transactions`

**Response 200**: `List<TransactionReadDto>`

---

### GET `/api/transactions/{id}`

Retorna uma transação por ID (no escopo do usuário autenticado).

**Auth**: Sim

**Response 200**: `TransactionReadDto`

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Transação não encontrada |

---

### POST `/api/transactions`

Cria uma transação manual.

**Auth**: Sim

**Request Body**:
```json
{
  "title": "Supermercado",
  "description": "Compras da semana",
  "amount": 250.00,
  "transactionDate": "2026-05-20T00:00:00Z",
  "type": "Despesa",
  "merchantDocument": "12.345.678/0001-90",
  "bankAccountId": "b1c2d3e4-...",
  "categoryId": "c1d2e3f4-...",
  "groupId": null,
  "groupCategoryId": null
}
```

> Se `groupId` for fornecido, `groupCategoryId` é obrigatório.

**Response 201**: `TransactionReadDto` criado

**Erros**:
| Status | Situação |
|--------|----------|
| 400 | `groupCategoryId` ausente quando `groupId` informado |
| 404 | `bankAccountId` ou `categoryId` não encontrados |

---

### POST `/api/transactions/bulk`

Cria múltiplas transações de uma vez (máximo 100).

**Auth**: Sim

**Request Body**:
```json
{
  "transactions": [
    {
      "title": "Aluguel",
      "amount": 1500.00,
      "transactionDate": "2026-05-01T00:00:00Z",
      "type": "Despesa"
    },
    {
      "title": "Salário",
      "amount": 5000.00,
      "transactionDate": "2026-05-05T00:00:00Z",
      "type": "Receita"
    }
  ]
}
```

**Response 200**: `List<TransactionReadDto>` criados

**Erros**:
| Status | Situação |
|--------|----------|
| 400 | Lista vazia ou acima de 100 itens |

---

### POST `/api/transactions/preview/ofx`

Faz o parse de um arquivo OFX e retorna preview das transações com sugestão de categoria.

**Auth**: Sim

**Content-Type**: `multipart/form-data`

**Form Fields**:
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `file` | File | Arquivo `.ofx` |

**Response 200**:
```json
[
  {
    "title": "IFOOD*PEDIDO",
    "originalDescription": "COMPRA DEBITO IFOOD*PEDIDO 001",
    "amount": 42.90,
    "transactionDate": "2026-05-15T00:00:00Z",
    "type": "Despesa",
    "merchantDocument": null,
    "suggestedCategoryId": "c1d2e3f4-...",
    "suggestedCategoryName": "Alimentação",
    "categoryId": null,
    "groupId": null,
    "groupCategoryId": null
  }
]
```

---

### POST `/api/transactions/preview/csv/{bankId}`

Faz o parse de um arquivo CSV de um banco específico e retorna preview.

**Auth**: Sim

**Path Params**:
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `bankId` | int | ID do banco (obtido via `GET /api/banks`) |

**Content-Type**: `multipart/form-data`

**Form Fields**:
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `file` | File | Arquivo `.csv` do banco |

> **Atenção**: Apenas Nubank (`bankId` correspondente ao code `260`) está funcional. Os demais bancos retornam erro.

**Response 200**: `List<TransactionPreviewDto>`

**Erros**:
| Status | Situação |
|--------|----------|
| 404 | Banco não encontrado |
| 409 | Banco sem leitor CSV implementado |

---

### POST `/api/transactions/import`

Persiste as transações do preview (OFX ou CSV). Máximo 500 por requisição.

**Auth**: Sim

**Request Body**:
```json
{
  "bankAccountId": "b1c2d3e4-...",
  "transactions": [
    {
      "title": "IFOOD*PEDIDO",
      "originalDescription": "COMPRA DEBITO IFOOD*PEDIDO 001",
      "amount": 42.90,
      "transactionDate": "2026-05-15T00:00:00Z",
      "type": "Despesa",
      "categoryId": "c1d2e3f4-...",
      "groupId": null,
      "groupCategoryId": null
    }
  ]
}
```

**Response 200**: `List<TransactionReadDto>` importados

**Erros**:
| Status | Situação |
|--------|----------|
| 400 | Lista vazia ou acima de 500 itens |

---

### PUT `/api/transactions/{id}`

Atualiza campos editáveis de uma transação.

**Auth**: Sim

**Request Body** (todos os campos são opcionais):
```json
{
  "title": "Mercado Extra — Ajuste",
  "description": "Compra corrigida",
  "categoryId": "c2d3e4f5-...",
  "groupId": "g1h2i3j4-...",
  "groupCategoryId": "c3d4e5f6-..."
}
```

**Regras de negócio**:
- `groupId` só pode ser definido se atualmente `null` e o usuário for membro do grupo
- `groupCategoryId` não pode ser alterado quando `groupLinkActive == false`
- Se `groupId` for informado, `groupCategoryId` é obrigatório

**Response 200**: `TransactionReadDto` atualizado

---

### DELETE `/api/transactions/{id}`

Remove uma transação do usuário.

**Auth**: Sim

**Response 200**:
```json
{
  "message": "Transação removida com sucesso."
}
```

---

## Dashboard — `/api/dashboard`

### GET `/api/dashboard/self`

Retorna o dashboard completo do usuário para o período informado. Por padrão, usa o mês corrente.

**Auth**: Sim

**Query Params**:
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `from` | datetime (ISO 8601) | Não | Início do período (padrão: 1º do mês atual) |
| `to` | datetime (ISO 8601) | Não | Fim do período (padrão: agora) |

**Exemplo**: `GET /api/dashboard/self?from=2026-05-01&to=2026-05-31`

**Response 200**:
```json
{
  "summary": {
    "balance": 2340.50,
    "balanceVariation": "+12%",
    "totalIncome": 5000.00,
    "incomeVariation": "0%",
    "totalExpenses": 2659.50,
    "expensesVariation": "-8%",
    "topCategory": {
      "name": "Alimentação",
      "amount": 820.00,
      "percentage": 31
    }
  },
  "insights": [
    "Sua média diária de gastos é de R$ 85,80.",
    "Suas 3 categorias de maior frequência são: Alimentação, Transporte, Lazer.",
    "Você não registrou transações nos últimos 7 dias."
  ],
  "revenueVsExpensesChart": [
    { "label": "Dias 1-7", "income": 5000.00, "expenses": 620.00 },
    { "label": "Dias 8-14", "income": 0.00, "expenses": 890.50 },
    { "label": "Dias 15-21", "income": 0.00, "expenses": 750.00 },
    { "label": "Dias 22-31", "income": 0.00, "expenses": 399.00 }
  ],
  "expensesByCategoryChart": [
    {
      "categoryId": "c1d2e3f4-...",
      "categoryName": "Alimentação",
      "amount": 820.00,
      "transactionCount": 12,
      "percentage": 31
    },
    {
      "categoryId": null,
      "categoryName": "Sem categoria",
      "amount": 310.00,
      "transactionCount": 3,
      "percentage": 12
    }
  ],
  "availableMonths": ["2026-03", "2026-04", "2026-05"],
  "periodStart": "2026-05-01T00:00:00Z",
  "periodEnd": "2026-05-31T23:59:59Z"
}
```

---

### GET `/api/dashboard/self/last-transactions`

Retorna as últimas 5 transações do usuário. Despesas têm `amount` com sinal negativo.

**Auth**: Sim

**Response 200**:
```json
[
  {
    "id": "t1u2v3w4-...",
    "title": "Supermercado",
    "categoryName": "Alimentação",
    "categoryColor": "#FF6B6B",
    "transactionDate": "2026-05-20T00:00:00Z",
    "amount": -350.75,
    "type": "Despesa"
  },
  {
    "id": "t2u3v4w5-...",
    "title": "Salário",
    "categoryName": null,
    "categoryColor": null,
    "transactionDate": "2026-05-05T00:00:00Z",
    "amount": 5000.00,
    "type": "Receita"
  }
]
```

---

## Exportação — `/api/transactions/export`

### GET `/api/transactions/export`

Exporta transações do período no formato solicitado.

- Se o número de transações for **≤ 100**: retorna o arquivo diretamente (200).
- Se for **> 100**: enfileira um job assíncrono e retorna 202 com `jobId`.

**Auth**: Sim

**Query Params**:
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `format` | string | Sim | `CSV`, `Excel` ou `PDF` |
| `from` | datetime (ISO 8601) | Não | Início do período |
| `to` | datetime (ISO 8601) | Não | Fim do período |

**Exemplos**:
```
GET /api/transactions/export?format=CSV&from=2026-05-01&to=2026-05-31
GET /api/transactions/export?format=PDF
GET /api/transactions/export?format=Excel&from=2026-01-01
```

**Response 200** (exportação direta — ≤ 100 transações):

Arquivo binário com header `Content-Disposition: attachment; filename="transacoes.csv"`.

| Format | Content-Type |
|--------|-------------|
| CSV | `text/csv` |
| Excel | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| PDF | `application/pdf` |

**Response 202** (job assíncrono — > 100 transações):
```json
{
  "message": "Muitos dados para exportar. Você será notificado quando o arquivo estiver pronto.",
  "jobId": "j1k2l3m4-n5o6-7890-pqrs-t12345678901"
}
```

---

### GET `/api/transactions/export/{jobId}/status`

Consulta o status de um job de exportação assíncrono.

**Auth**: Sim

**Response 200**:

*Job pendente ou em processamento:*
```json
{
  "jobId": "j1k2l3m4-...",
  "status": "Processing",
  "downloadUrl": null,
  "errorMessage": null,
  "createdAt": "2026-05-25T10:00:00Z"
}
```

*Job concluído:*
```json
{
  "jobId": "j1k2l3m4-...",
  "status": "Completed",
  "downloadUrl": "/api/transactions/export/j1k2l3m4-.../download",
  "errorMessage": null,
  "createdAt": "2026-05-25T10:00:00Z"
}
```

*Job com falha:*
```json
{
  "jobId": "j1k2l3m4-...",
  "status": "Failed",
  "downloadUrl": null,
  "errorMessage": "Erro ao gerar o arquivo.",
  "createdAt": "2026-05-25T10:00:00Z"
}
```

**Status possíveis**: `Pending` → `Processing` → `Completed` | `Failed`

---

### GET `/api/transactions/export/{jobId}/download`

Faz o download do arquivo gerado pelo job assíncrono. Só funciona quando `status == "Completed"`.

**Auth**: Sim

**Response 200**: Arquivo binário

**Erros**:
| Status | Situação |
|--------|----------|
| 400 | Job ainda não concluído |
| 404 | Arquivo não encontrado no disco |

---

## Códigos de Erro

| HTTP Status | Significado | Quando ocorre |
|-------------|-------------|---------------|
| 400 Bad Request | Dados inválidos | Falha na validação FluentValidation |
| 401 Unauthorized | Não autenticado | Token ausente, inválido ou expirado; credenciais incorretas |
| 404 Not Found | Recurso não encontrado | ID inválido, recurso de outro usuário |
| 409 Conflict | Conflito de negócio | Email duplicado, token expirado, operação proibida |
| 500 Internal Server Error | Erro interno | Exceção não tratada |

**Formato padrão de erro**:
```json
{
  "message": "Descrição legível do erro"
}
```

**Formato de erro de validação (400)**:
```json
{
  "errors": {
    "Title": ["O título deve ter entre 2 e 256 caracteres."],
    "Amount": ["O valor deve ser maior que zero."]
  }
}
```
