# Documentação Técnica — Frontend (orbees-frontend)

SPA (Single Page Application) construída com **React 19 + TypeScript**, utilizando **Vite** como build tool, **Styled Components** para estilização e **Axios** para comunicação com a API.

---

## Índice

- [Stack e Dependências](#stack-e-dependências)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Entry Point](#entry-point)
- [Design System — Theme](#design-system--theme)
- [Roteamento](#roteamento)
- [Contexto de Autenticação](#contexto-de-autenticação)
- [Camada de Serviços (API Layer)](#camada-de-serviços-api-layer)
- [Interfaces TypeScript](#interfaces-typescript)
- [Hooks Customizados](#hooks-customizados)
- [Componentes UI](#componentes-ui)
- [Layouts](#layouts)
- [Páginas](#páginas)
- [Helpers](#helpers)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts e Configuração de Build](#scripts-e-configuração-de-build)

---

## Stack e Dependências

### Produção

| Pacote | Versão | Função |
|--------|--------|--------|
| react | 19.2.0 | Biblioteca UI |
| react-dom | 19.2.0 | Renderização no DOM |
| react-router-dom | 7.15.1 | Roteamento client-side |
| styled-components | 6.4.2 | Estilização CSS-in-JS |
| axios | 1.16.1 | Cliente HTTP |
| react-hook-form | 7.76.0 | Gerenciamento de formulários |
| recharts | 3.8.1 | Gráficos e visualizações |

### Desenvolvimento

| Pacote | Versão | Função |
|--------|--------|--------|
| typescript | 5.9.3 | Tipagem estática |
| vite | 7.3.1 | Build tool e dev server |
| @vitejs/plugin-react | 5.1.1 | Plugin React para Vite |
| eslint | 9.39.1 | Linter |
| eslint-plugin-react-hooks | 7.0.1 | Regras de hooks para ESLint |
| eslint-plugin-react-refresh | 0.4.24 | Fast refresh para ESLint |
| typescript-eslint | 8.48.0 | TypeScript + ESLint |

---

## Estrutura de Diretórios

```
orbees-frontend/
├── public/
│   └── vite.svg
│
├── src/
│   ├── main.tsx                        # Entry point: ReactDOM.createRoot
│   │
│   ├── assets/                         # Imagens estáticas
│   │   ├── logo-orbees.png
│   │   ├── orbees-branco.png
│   │   └── orbees-logo-full.png
│   │
│   ├── components/
│   │   ├── Layouts/
│   │   │   ├── index.ts                # Re-exports dos layouts
│   │   │   └── AuthLayout/
│   │   │       ├── AuthLayout.tsx
│   │   │       ├── AuthLayout.styles.ts
│   │   │       └── AuthCard.styles.ts
│   │   └── ui/
│   │       ├── index.ts                # Re-exports de todos os componentes UI
│   │       ├── Button/
│   │       │   ├── Button.tsx
│   │       │   └── Button.styles.ts
│   │       ├── Card/
│   │       │   ├── Card.tsx
│   │       │   └── Card.styles.ts
│   │       ├── Divider/
│   │       │   ├── Divider.tsx
│   │       │   └── Divider.styles.ts
│   │       ├── ErrorMessage/
│   │       │   ├── ErrorMessage.tsx
│   │       │   └── ErrorMessage.styles.ts
│   │       ├── Input/
│   │       │   ├── Input.tsx
│   │       │   └── Input.styles.ts
│   │       ├── Modal/
│   │       │   ├── Modal.tsx
│   │       │   └── Modal.styles.ts
│   │       ├── PageContainer/
│   │       │   ├── PageContainer.tsx
│   │       │   └── PageContainer.styles.ts
│   │       └── SuccessMessage/
│   │           ├── SuccessMessage.tsx
│   │           └── SuccessMessage.styles.ts
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── AuthContext.types.ts
│   │   ├── AuthProvider.tsx
│   │   └── useAuthContext.ts
│   │
│   ├── helpers/
│   │   ├── date.ts
│   │   ├── download.ts
│   │   ├── error.ts
│   │   ├── formatters.ts
│   │   ├── storage.ts
│   │   └── validators.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCategories.ts
│   │   ├── useDashboard.ts
│   │   ├── useGroups.ts
│   │   ├── useTransaction.ts
│   │   └── useUser.ts
│   │
│   ├── interfaces/
│   │   ├── auth.ts
│   │   ├── category.ts
│   │   ├── dashboard.ts
│   │   ├── enums.ts
│   │   ├── group.ts
│   │   ├── transaction.ts
│   │   └── user.ts
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── ConfirmEmail.tsx
│   │   │   ├── ConfirmEmail.styles.ts
│   │   │   └── GoogleCallback.tsx
│   │   ├── Login/
│   │   │   ├── Login.tsx
│   │   │   └── Login.styles.ts
│   │   └── Register/
│   │       └── Register.tsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── PublicRoute.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── categoryService.ts
│   │   ├── dashboardService.ts
│   │   ├── groupService.ts
│   │   ├── transactionService.ts
│   │   └── userService.ts
│   │
│   └── styles/
│       └── theme.ts
│
├── .env                                # Variáveis de ambiente (não commitado)
├── .env.example
├── .gitignore
├── Dockerfile.dev
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Entry Point

**Arquivo**: `src/main.tsx`

Inicializa a aplicação React com `ReactDOM.createRoot`, envolvendo a árvore com `AuthProvider` e `AppRoutes`.

---

## Design System — Theme

**Arquivo**: `src/styles/theme.ts`

Design tokens centralizados e consumidos via Styled Components em toda a aplicação. Exportados como `const` para tipagem automática via `as const`.

```typescript
export const theme = {
  colors: {
    primary: "#F5A623",           // Laranja Orbees — cor principal
    primaryHover: "#E09500",      // Hover do laranja
    background: "#ffffff",        // Fundo claro
    backgroundDark: "#1a1a1a",    // Fundo escuro
    backgroundCard: "#ffffff",
    backgroundDarkCard: "#1e1e1e",
    backgroundInput: "#ffffff",
    backgroundDarkInput: "#333333",
    border: "#dddddd",
    borderDark: "#444444",
    text: "#1a1a1a",
    textLight: "#555555",
    textMuted: "#aaaaaa",
    textWhite: "#ffffff",
    textDark: "#d0d0d0",
    error: "#ef4444",
    errorBackground: "#2d1515",
    success: "#22c55e",
  },
  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    xxl: "60px",
  },
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.85rem",    // ~13.6px
    md: "0.95rem",    // ~15.2px
    lg: "1rem",       // 16px
    xl: "1.4rem",     // ~22.4px
    xxl: "2rem",      // 32px
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
} as const;
```

**Convenção de uso** nos componentes estilizados:

```typescript
import { theme } from "../../styles/theme";

const StyledButton = styled.button`
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSize.md};
`;
```

---

## Roteamento

**Diretório**: `src/routes/`

### AppRoutes.tsx

Usa `BrowserRouter`, `Routes` e `Route` do `react-router-dom`. A rota raiz `/` redireciona com base no estado de autenticação:

```
/ → isAuthenticated ? /dashboard : /login
```

**Mapa de rotas:**

#### Rotas Públicas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Redirect | Redireciona para `/individual/dashboard` (autenticado) ou `/login` (não autenticado) |
| `/login` | `LoginPage` | Página de login |
| `/register` | `RegisterPage` | Página de registro |
| `/auth/confirm-email` | `ConfirmEmailPage` | Confirmação de email via token |
| `/auth/callback` | `GoogleCallbackPage` | Callback do OAuth Google |
| `/forgot-password` | `ForgotPasswordPage` | Solicitação de reset de senha |
| `/reset-password` | `ResetPasswordPage` | Reset de senha via token |
| `/not-found` | `NotFoundPage` | Página 404 |
| `*` | Redirect | Redireciona para `/not-found` |

#### Rotas Privadas — Individual

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/individual/dashboard` | `DashboardPage` | Dashboard pessoal |
| `/individual/transactions` | `TransactionsPage` | Gerenciar transações pessoais |
| `/individual/categories` | `CategoriesPage` | Gerenciar categorias pessoais |
| `/individual/import` | `ImportPage` | Importar extratos (OFX/CSV) |

#### Rotas Privadas — Grupos

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/group` | `GroupRedirect` | Redireciona para dashboard do primeiro grupo |
| `/group/:groupId` | Redirect | Redireciona para `/group/:groupId/dashboard` |
| `/group/:groupId/dashboard` | `GroupDashboardPage` | Dashboard do grupo |
| `/group/:groupId/transactions` | `GroupTransactionsPage` | Transações do grupo |
| `/group/:groupId/categories` | `GroupCategoriesPage` | Categorias do grupo |
| `/group/:groupId/members` | `GroupMembersPage` | Membros do grupo |

#### Rotas Privadas — Educação Financeira

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/education/home` | `EducationHomePage` | Homepage com trilha de aprendizado |
| `/education/fundamentals` | `EducationFundamentalsPage` | Fundamentos de educação financeira |
| `/education/law` | `EducationLawPage` | Direitos trabalhistas e tributos |
| `/education/calculators` | `EducationCalculatorsPage` | 7 calculadoras financeiras |

#### Rotas Privadas — Configurações

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/settings` | `SettingsPage` | Configurações (perfil, grupos, segurança) |

### PublicRoute.tsx

Envolve páginas públicas. Se o usuário **já está autenticado**, redireciona para `/dashboard`.

```typescript
// Comportamento:
isAuthenticated → <Navigate to="/dashboard" replace />
não autenticado → renderiza children
```

### PrivateRoute.tsx

Envolve páginas privadas. Se o usuário **não está autenticado**, redireciona para `/login`.

```typescript
// Comportamento:
não autenticado → <Navigate to="/login" replace />
autenticado → renderiza children
```

---

## Contexto de Autenticação

**Diretório**: `src/contexts/`

Implementa o padrão **Context + Provider** do React para gerenciar o estado global de autenticação.

### AuthContext.types.ts

Define a interface do contexto:

```typescript
export interface AuthContextData {
  user: UserReadDto | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (dto: LoginDto) => Promise<boolean>;
  register: (dto: RegisterDto) => Promise<boolean>;
  logout: () => void;
}
```

### AuthContext.tsx

Cria o contexto React com `createContext<AuthContextData>`.

### AuthProvider.tsx

Provider que gerencia o estado e expõe as ações:

- **Estado**: `user`, `loading`, `error`, `isAuthenticated`
- **`login(dto)`**: chama `authService.login`; salva token no `localStorage` via `tokenStorage`; busca perfil via `userService.getProfile`; retorna `boolean`
- **`register(dto)`**: chama `authService.register`; retorna `boolean`
- **`logout()`**: remove token do `localStorage` (`tokenStorage.remove()`); limpa estado do usuário
- **Inicialização**: ao montar, verifica se há token salvo e carrega o perfil automaticamente

### useAuthContext.ts

Hook para consumir o contexto em qualquer componente:

```typescript
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext deve ser usado dentro do AuthProvider");
  return context;
};
```

---

## Camada de Serviços (API Layer)

**Diretório**: `src/services/`

### api.ts — Instância Axios

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5210/api",
  headers: { "Content-Type": "application/json" },
});

// Interceptor de request: anexa token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de response: redireciona para /login em caso de 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

### authService.ts

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `login(dto)` | `POST /auth/login` | Retorna `{ token }` |
| `register(dto)` | `POST /auth/register` | Cria usuário; retorna `UserReadDto` |
| `confirmEmail(token)` | `GET /auth/confirm-email?token=` | Confirma email |
| `forgotPassword(email)` | `POST /auth/forgot-password` | Solicita reset |
| `resetPassword(token, newPassword)` | `POST /auth/reset-password` | Redefine senha |
| `googleLogin()` | Redirect para `{API}/auth/google` | Inicia OAuth |

---

### userService.ts

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getProfile()` | `GET /user/me` | Perfil do usuário autenticado |
| `getAllUsers()` | `GET /user/` | Lista usuários (admin) |
| `updateProfile(dto)` | `PUT /user/me` | Atualiza nome e username |
| `updatePassword(dto)` | `PUT /user/me/password` | Altera senha |
| `deleteAccount()` | `DELETE /user/me` | Desativa conta |
| `updateProfilePicture(file)` | `PUT /user/me/picture` | Upload de foto (`multipart/form-data`) |
| `deleteProfilePicture()` | `DELETE /user/me/picture/delete` | Remove foto |

---

### categoryService.ts

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getAll(groupId?)` | `GET /categories?groupId=` | Lista categorias |
| `getById(id)` | `GET /categories/{id}` | Categoria por id |
| `create(dto)` | `POST /categories` | Cria categoria |
| `update(id, dto)` | `PUT /categories/{id}` | Atualiza |
| `delete(id)` | `DELETE /categories/{id}` | Remove |

---

### groupService.ts

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getAll()` | `GET /groups` | Meus grupos |
| `getById(groupId)` | `GET /groups/{id}` | Grupo por id |
| `getMembers(groupId)` | `GET /groups/{id}/members` | Membros |
| `getRoles()` | `GET /groups/roles` | Roles disponíveis |
| `create(dto)` | `POST /groups` | Cria grupo |
| `update(groupId, dto)` | `PUT /groups/{id}` | Atualiza |
| `delete(groupId)` | `DELETE /groups/{id}` | Remove |
| `addMember(groupId, dto)` | `POST /groups/{id}/members` | Adiciona membro |
| `updateMemberRole(groupId, memberId, dto)` | `PUT /groups/{id}/members/{mid}/role` | Altera role |
| `removeMember(groupId, memberId)` | `DELETE /groups/{id}/members/{mid}` | Remove membro |
| `leaveGroup(groupId)` | `DELETE /groups/{id}/leave` | Sai do grupo |

---

### transactionService.ts

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getMyTransactions(from?, to?)` | `GET /transactions` | Minhas transações |
| `getGroupTransactions(groupId, from?, to?)` | `GET /transactions/group/{id}` | Transações do grupo |
| `getById(id)` | `GET /transactions/{id}` | Por id |
| `create(dto)` | `POST /transactions` | Cria manual |
| `createBulk(dto)` | `POST /transactions/bulk` | Cria em lote |
| `previewOFX(file)` | `POST /transactions/preview/ofx` | Preview OFX |
| `previewCSV(file, bankId)` | `POST /transactions/preview/csv/{bankId}` | Preview CSV |
| `import(dto)` | `POST /transactions/import` | Importa lote |
| `update(id, dto)` | `PUT /transactions/{id}` | Atualiza |
| `delete(id)` | `DELETE /transactions/{id}` | Remove |
| `exportDirect(format, from?, to?)` | `GET /transactions/export` | Exporta / enfileira job |
| `getExportStatus(jobId)` | `GET /transactions/export/{id}/status` | Status do job |
| `downloadExport(jobId)` | `GET /transactions/export/{id}/download` | Download do arquivo |

---

### dashboardService.ts

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getSelfDashboard(from?, to?)` | `GET /dashboard/self` | Dashboard completo do período |
| `getLastTransactions()` | `GET /dashboard/self/last-transactions` | Últimas 5 transações |

---

## Interfaces TypeScript

**Diretório**: `src/interfaces/`

### auth.ts

```typescript
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
```

### enums.ts

```typescript
export enum TransactionType {
  Receita = "Receita",
  Despesa = "Despesa",
}

export enum TransactionOrigin {
  Manual = "Manual",
  OFX = "OFX",
  CSV = "CSV",
}
```

### transaction.ts

```typescript
export interface TransactionReadDto {
  id: string;
  title: string;
  originalDescription?: string;
  description?: string;
  amount: number;                      // Sempre positivo
  transactionDate: string;             // ISO 8601
  type: TransactionType;
  transactionOrigin: TransactionOrigin;
  merchantDocument?: string;
  categoryId?: string;
  categoryName?: string;
  categoryColor?: string;
  categoryIcon?: string;
  groupCategoryId?: string;
  groupCategoryName?: string;
  groupId?: string;
  groupName?: string;
  groupLinkActive: boolean;
  bankAccountId?: string;
  bankAccountName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TransactionCreateDto {
  title: string;
  description?: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  merchantDocument?: string;
  bankAccountId?: string;
  categoryId?: string;
  groupId?: string;
  groupCategoryId?: string;
}

export interface TransactionUpdateDto {
  title?: string;
  description?: string;
  categoryId?: string;
  groupCategoryId?: string;
  groupId?: string;
}

export interface TransactionPreviewDto {
  title: string;
  originalDescription?: string;
  amount: number;
  transactionDate: string;
  type: TransactionType;
  merchantDocument?: string;
  suggestedCategoryId?: string;
  suggestedCategoryName?: string;
  categoryId?: string;
  groupId?: string;
  groupCategoryId?: string;
}

export interface TransactionImportDto {
  bankAccountId?: string;
  transactions: TransactionPreviewDto[];
}

export interface TransactionBulkCreateDto {
  transactions: TransactionCreateDto[];
}
```

---

## Hooks Customizados

**Diretório**: `src/hooks/`

Hooks encapsulam estado e lógica de interação com os serviços, mantendo os componentes limpos.

### useAuth.ts

Encapsula operações de autenticação consumindo `useAuthContext` e/ou chamando `authService` diretamente.

**Responsabilidades:**
- Login com email/senha
- Registro de novo usuário
- Logout
- Confirmação de email
- Recuperação/reset de senha

---

### useUser.ts

**Responsabilidades:**
- Buscar e atualizar perfil
- Alterar senha
- Upload e remoção de foto de perfil
- Soft delete da conta

---

### useCategories.ts

**Responsabilidades:**
- Listar categorias (pessoais, de grupo, do sistema)
- CRUD de categorias
- Estado de loading e erro

---

### useGroups.ts

**Responsabilidades:**
- Listar grupos do usuário
- CRUD de grupos
- Gerenciar membros (adicionar, remover, alterar role)
- Sair de um grupo

---

### useTransaction.ts

**Responsabilidades:**
- Listar transações pessoais e de grupo com filtros de período
- CRUD de transações
- Preview e importação de OFX/CSV
- Exportação (síncrona + polling assíncrono)

---

### useDashboard.ts

**Responsabilidades:**
- Buscar dados completos do dashboard (`DashboardResponseDto`)
- Buscar últimas transações
- Formatar dados para exibição nos componentes de gráfico (Recharts)

---

## Componentes UI

**Diretório**: `src/components/ui/`

Todos os componentes são exportados pelo barrel `src/components/ui/index.ts`.

Cada componente é composto por dois arquivos:
- `Componente.tsx` — lógica e JSX
- `Componente.styles.ts` — Styled Components

### Button

Botão genérico com suporte a variantes e estados.

**Props esperadas:**
- `children`: conteúdo
- `onClick?`: handler
- `type?`: `"button" | "submit" | "reset"`
- `disabled?`: boolean
- `loading?`: exibe spinner ou desabilita durante loading
- `variant?`: ex. `"primary" | "secondary" | "outline"`

---

### Card

Container com fundo branco/escuro, sombra e bordas arredondadas. Utilizado como wrapper de conteúdo.

---

### Divider

Separador horizontal. Pode exibir um texto centralizado no meio da linha (ex: "ou").

---

### ErrorMessage

Exibe mensagem de erro com fundo avermelhado (`errorBackground`). Recebe `message: string`.

---

### Input

Campo de entrada estilizado. Props comuns:
- `label`: texto da label
- `type`: `"text" | "email" | "password"` etc.
- `placeholder`
- Compatível com `react-hook-form` via `register`

---

### Modal

Dialog modal com overlay. Props:
- `isOpen`: boolean
- `onClose`: handler para fechar
- `children`: conteúdo do modal

---

### PageContainer

Container de página com padding padrão e largura máxima centralizada. Usado pelas páginas privadas como wrapper principal.

---

### SuccessMessage

Exibe mensagem de sucesso com fundo verde. Recebe `message: string`.

---

### SearchInput

Campo de busca com ícone de lupa. Props:
- `value`: valor atual
- `onChange`: handler de mudança
- `placeholder`: texto de placeholder
- Debounce automático de 300ms para otimizar performance

---

### TypeFilter

Filtro de seleção de tipo de transação. Props:
- `value`: tipo selecionado (`"Receita" | "Despesa" | "Todas"`)
- `onChange`: handler de seleção
- Estilizado com cores: verde (Receita), vermelho (Despesa), cinza (Todas)

---

### Pagination

Controles de paginação com botões anterior/próximo e informação de página. Props:
- `currentPage`: página atual (1-indexed)
- `totalPages`: total de páginas
- `onPageChange`: handler de mudança de página
- `itemsPerPage`: itens por página
- `totalItems`: total de itens

---

### PeriodSelector

Seletor de período com opções pré-definidas e personalizado. Props:
- `from`: data inicial (Date ou ISO string)
- `to`: data final (Date ou ISO string)
- `onChange`: handler recebe `{ from, to }`
- **Opções pré-definidas**:
  - Mês atual
  - Mês anterior
  - Últimos 3 meses
  - Últimos 6 meses
  - Ano atual
  - Personalizado (date pickers)

---

### SummaryCard

Card de resumo financeiro com título, valor e variação percentual. Props:
- `title`: título do card (ex: "Saldo Total")
- `value`: valor principal (formatado como moeda)
- `variation`: variação percentual (ex: "+12%")
- `icon`: ícone opcional (Lucide React)
- Cor da variação: verde (+), vermelha (-)

---

### InsightItem

Item de insight/dica financeira. Props:
- `icon`: ícone (Lucide React)
- `text`: texto do insight
- Estilizado com fundo claro e bordas arredondadas

---

### CategoryChip

Chip visual de categoria com cor e ícone. Props:
- `name`: nome da categoria
- `color`: cor em hex (ex: "#FF6B6B")
- `icon`: emoji ou código de ícone
- `onClick`: handler opcional para clique
- Usado em listas e seletores de categoria

---

### ColorPicker

Seletor de cor usando `react-colorful`. Props:
- `color`: cor atual em hex
- `onChange`: handler recebe nova cor em hex
- Exibe preview da cor selecionada
- Paleta de cores pré-definidas para seleção rápida

---

### IconPicker

Seletor de ícone emoji. Props:
- `icon`: emoji atual
- `onChange`: handler recebe novo emoji
- Grid de emojis categorizados:
  - Financeiro: 💰 💵 💳 💸
  - Alimentação: 🍕 🍔 🍟 🍜
  - Transporte: 🚗 🚕 🚌 🚇
  - Lazer: 🎬 🎮 🎨 🎵
  - Saúde: 💊 🏥 🩺
  - Outros: 🏠 📱 👕 ⚡

---

### TopBar

Barra superior de navegação (MainLayout). Componentes:
- Logo da Orbees (clicável, redireciona para dashboard)
- Menu de navegação principal
- Avatar do usuário com dropdown
- Notificações (badge de contador)

**Menu principal:**
- Dashboard
- Transações
- Grupos
- Educação Financeira

**Dropdown do usuário:**
- Perfil
- Configurações
- Sair

---

### AddTransactionModal

Modal para adicionar nova transação manual. Campos:
- Título (obrigatório)
- Descrição (opcional)
- Valor (obrigatório, number)
- Data (obrigatório, date picker)
- Tipo (Receita/Despesa, radio buttons)
- Categoria (dropdown)
- Conta bancária (dropdown, opcional)
- Grupo (dropdown, opcional)
- Categoria do grupo (dropdown, obrigatório se grupo selecionado)

Usa `react-hook-form` para validação e `transactionService` para criar.

---

### TransactionEditModal

Modal para editar transação existente. Permite editar:
- Título
- Descrição
- Categoria pessoal
- Grupo (apenas se atualmente `null`)
- Categoria do grupo (apenas se `groupLinkActive === true`)

**Campos não editáveis:**
- Valor (`amount`)
- Data (`transactionDate`)
- Tipo (`type`)
- Origem (`origin`)

---

### TransactionRow

Linha da tabela de transações. Exibe:
- Data (formatada dd/MM/yyyy)
- Título
- Categoria (chip com cor e ícone)
- Tipo (badge colorido)
- Valor (formatado como moeda, verde para receita, vermelho para despesa)
- Ações (botões editar e deletar)

Props:
- `transaction`: objeto `TransactionReadDto`
- `onEdit`: handler de edição
- `onDelete`: handler de deleção

---

### TransactionItem

Item de transação para lista compacta (usada no dashboard). Exibe:
- Ícone da categoria
- Título e data
- Valor colorido

Props:
- `transaction`: objeto simplificado
- `onClick`: handler opcional para clique

---

## Layouts

**Diretório**: `src/components/Layouts/`

### AuthLayout

Compartilhado pelas páginas de autenticação (Login, Registro, Confirmação de Email).

**Estrutura visual:**
- Fundo escuro (`backgroundDark`)
- Logo da Orbees centralizado no topo
- Card branco centralizado (`AuthCard`) contendo o formulário
- Responsivo

**Arquivos:**
- `AuthLayout.tsx` — componente que recebe `children` e renderiza o layout
- `AuthLayout.styles.ts` — container externo, wrapper do logo
- `AuthCard.styles.ts` — card interno com padding, sombra e border-radius

**Uso:**
```tsx
<AuthLayout>
  <LoginForm />
</AuthLayout>
```

---

## Páginas

**Diretório**: `src/pages/`

### Login (`/login`)

**Arquivo**: `pages/Login/Login.tsx`

- Usa `AuthLayout` como wrapper
- Formulário com campos `email` e `password` via `react-hook-form`
- Submit chama `useAuthContext().login(dto)`
- Exibe `ErrorMessage` em caso de falha
- Links para `/register` e `/forgot-password`
- Botão de login com Google (redireciona para `{API}/auth/google`)

---

### Register (`/register`)

**Arquivo**: `pages/Register/Register.tsx`

- Usa `AuthLayout` como wrapper
- Formulário com `email`, `fullname`, `username`, `password` via `react-hook-form`
- Submit chama `useAuthContext().register(dto)`
- Exibe `SuccessMessage` após registro bem-sucedido (instrução para confirmar email)
- Link para `/login`

---

### ConfirmEmail (`/auth/confirm-email`)

**Arquivo**: `pages/Auth/ConfirmEmail.tsx`

- Lê `?token=` da query string
- Chama `authService.confirmEmail(token)` ao montar
- Exibe:
  - Loading durante a confirmação
  - `SuccessMessage` se confirmado
  - `ErrorMessage` se token inválido ou expirado
- Link para ir ao Login

---

### GoogleCallback (`/auth/callback`)

**Arquivo**: `pages/Auth/GoogleCallback.tsx`

- Lê `?token=` da query string (retornado pelo backend após OAuth)
- Salva o token via `tokenStorage.set(token)`
- Redireciona para `/dashboard`
- Exibe loading enquanto processa

---

### DashboardPage (`/individual/dashboard`)

**Arquivo**: `pages/Individual/Dashboard/DashboardPage.tsx`

- Dashboard pessoal do usuário com dados financeiros do período
- Usa `useDashboard` hook para buscar dados da API
- **Componentes principais**:
  - `SummaryCard`: Cards de resumo (Saldo, Receitas, Despesas, Top Categoria)
  - `CategoryPieChart`: Gráfico de pizza de despesas por categoria (Recharts)
  - `RevenueExpenseChart`: Gráfico de linha/barra de receitas vs despesas ao longo do tempo
  - `PeriodSelector`: Seletor de período (mês atual, mês anterior, personalizado)
  - `TransactionItem`: Lista das últimas transações
- **Estados**:
  - `loading`: carregando dados
  - `error`: erro ao buscar dados
  - `period`: período selecionado (`from`, `to`)
- **Insights**: Lista de insights automáticos gerados pelo backend

---

### TransactionsPage (`/individual/transactions`)

**Arquivo**: `pages/Individual/Transactions/TransactionsPage.tsx`

- Lista todas as transações do usuário com filtros
- **Funcionalidades**:
  - Filtro por período (date range)
  - Filtro por tipo (Receita/Despesa/Todas)
  - Busca por título/descrição
  - Paginação
  - Adicionar nova transação (modal)
  - Editar transação (modal)
  - Deletar transação
  - Importar de OFX/CSV
  - Exportar para CSV/Excel/PDF
- **Componentes**:
  - `AddTransactionModal`: Modal para criar transação manual
  - `TransactionEditModal`: Modal para editar transação existente
  - `TransactionRow`: Linha da tabela de transações
  - `SearchInput`: Campo de busca
  - `TypeFilter`: Filtro de tipo (Receita/Despesa/Todas)
  - `Pagination`: Controles de paginação

---

### CategoriesPage (`/individual/categories`)

**Arquivo**: `pages/Individual/Categories/CategoriesPage.tsx`

- Gerenciamento de categorias pessoais
- **Funcionalidades**:
  - Listar categorias (pessoais + sistema)
  - Criar nova categoria (modal)
  - Editar categoria (modal)
  - Deletar categoria (com confirmação)
  - Color picker para escolher cor
  - Icon picker para escolher ícone (emoji)
- **Componentes**:
  - `CategoryChip`: Chip visual da categoria com cor e ícone
  - `ColorPicker`: Seletor de cor (react-colorful)
  - `IconPicker`: Seletor de ícone emoji

---

### ImportPage (`/individual/import`)

**Arquivo**: `pages/Individual/Import/ImportPage.tsx`

- Importação de extratos bancários (OFX/CSV)
- **Fluxo**:
  1. Selecionar banco (para CSV)
  2. Upload do arquivo
  3. Preview das transações com sugestão de categoria
  4. Ajustar categorias individualmente
  5. Confirmar importação
- **Componentes**:
  - `FileUploadArea`: Área de drag-and-drop para upload
  - `TransactionPreviewTable`: Tabela de preview com edição de categorias
  - `CategorySelector`: Dropdown para selecionar/alterar categoria

---

### GroupDashboardPage (`/group/:groupId/dashboard`)

**Arquivo**: `pages/Group/Dashboard/GroupDashboardPage.tsx`

- Dashboard do grupo com dados consolidados
- Similar ao dashboard pessoal, mas com dados do grupo
- **Componentes adicionais**:
  - `MemberExpensesBarChart`: Gráfico de barras de despesas por membro
  - `MemberExpensesLineChart`: Gráfico de linha de evolução de despesas por membro
- **Insights específicos de grupo**:
  - Membro que mais contribuiu
  - Média de gasto por membro
  - Categorias mais frequentes do grupo

---

### GroupTransactionsPage (`/group/:groupId/transactions`)

**Arquivo**: `pages/Group/Transactions/GroupTransactionsPage.tsx`

- Lista transações do grupo
- Similar a `TransactionsPage`, mas filtra por `groupId`
- Exibe nome do membro que criou cada transação

---

### GroupCategoriesPage (`/group/:groupId/categories`)

**Arquivo**: `pages/Group/Categories/GroupCategoriesPage.tsx`

- Gerenciamento de categorias compartilhadas do grupo
- Apenas Admins do grupo podem criar/editar/deletar

---

### GroupMembersPage (`/group/:groupId/members`)

**Arquivo**: `pages/Group/Members/GroupMembersPage.tsx`

- Lista membros do grupo
- **Funcionalidades** (apenas Admin):
  - Adicionar novo membro (buscar por email)
  - Promover/rebaixar membro (Admin ↔ Member)
  - Remover membro (com confirmação)
- **Funcionalidades** (todos):
  - Sair do grupo (com confirmação)
- **Componentes**:
  - `MemberCard`: Card de cada membro com avatar, nome, role e ações
  - `AddMemberModal`: Modal para buscar e adicionar usuário por email

---

### SettingsPage (`/settings`)

**Arquivo**: `pages/Settings/SettingsPage.tsx`

- Configurações do usuário em abas
- **Abas**:
  1. **Perfil**: Editar nome, username, foto de perfil
  2. **Grupos**: Listar grupos, criar novo grupo
  3. **Segurança**: Alterar senha, deletar conta
- **Componentes**:
  - `ProfileTab`: Upload de foto, edição de dados pessoais
  - `GroupsTab`: Lista de grupos com link para dashboard de cada um
  - `SecurityTab`: Formulário de alteração de senha, botão de deletar conta

---

### EducationHomePage (`/education/home`)

**Arquivo**: `pages/Education/Home/EducationHomePage.tsx`

- Página inicial do módulo de Educação Financeira
- **Conteúdo**:
  - Hero banner com chamada para ação
  - Stat cards com estatísticas motivacionais
  - Trail de aprendizado (4 etapas):
    1. Fundamentos
    2. Direitos e Tributos
    3. Calculadoras
    4. (Futuro) Investimentos
  - "Por que aprender?" com 4 cards de benefícios
- **Componentes**:
  - `EducationHeroBanner`: Banner principal
  - `EducationStatCard`: Cards de estatísticas
  - `EducationTrailStep`: Steps da trilha de aprendizado
  - `EducationWhyCard`: Cards de benefícios

---

### EducationFundamentalsPage (`/education/fundamentals`)

**Arquivo**: `pages/Education/Fundamentals/FundamentalsPage.tsx`

- Ensina fundamentos de educação financeira
- **Conteúdo**:
  - 4 Pilares da Educação Financeira (cards)
  - Regra 50-30-20 (ilustração interativa)
  - Juros Simples vs Compostos (com calculadora interativa)
  - Orçamento Pessoal (accordion com dicas)
- **Componentes**:
  - `PillarCard`: Card de cada pilar
  - `Rule502030`: Visualização da regra 50-30-20
  - `CompoundInterestCalculator`: Calculadora de juros compostos
  - `FundamentalsAccordion`: Accordion com conteúdo expandível

---

### EducationLawPage (`/education/law`)

**Arquivo**: `pages/Education/Law/LawPage.tsx`

- Educação sobre direitos trabalhistas e tributários
- **Conteúdo**:
  - CLT (Consolidação das Leis do Trabalho)
  - IRPF (Imposto de Renda Pessoa Física) com tabelas atualizadas
  - Como ler o holerite
- **Componentes**:
  - `CltContent`: Conteúdo sobre CLT
  - `IrpfContent`: Tabelas e explicações sobre IRPF
  - `HoleriteContent`: Explicação de cada campo do holerite
  - `LawCalloutBox`: Caixas de destaque com dicas
  - `LawAccordionContent`: Accordion para cada tópico

---

### EducationCalculatorsPage (`/education/calculators`)

**Arquivo**: `pages/Education/Calculators/CalculatorsPage.tsx`

- Hub de 7 calculadoras financeiras interativas
- **Calculadoras disponíveis**:
  1. **Juros Simples**: Calcula juros simples dados capital, taxa e período
  2. **Juros Compostos**: Calcula montante com juros compostos e mostra evolução
  3. **Férias CLT**: Calcula valor de férias com 1/3 constitucional
  4. **Custo de Parcelamento**: Compara custo de parcelar vs pagar à vista
  5. **Metas de Poupança**: Calcula quanto poupar por mês para atingir meta
  6. **Quitação de Dívidas**: Calcula estratégias de pagamento (bola de neve vs avalanche)
  7. **Simulador de IRPF**: Simula imposto de renda com base na renda mensal
- Cada calculadora é um componente separado com formulário e resultado visual
- **Componentes**:
  - `JurosSimplesCalculator`
  - `JurosCompostosCalculator`
  - `FeriasCltCalculator`
  - `CustoParcelamentoCalculator`
  - `MetasPoupancaCalculator`
  - `QuitacaoDividasCalculator`
  - `SimuladorIrpfCalculator`

---

### NotFoundPage (`*`)

**Arquivo**: `pages/NotFound/NotFoundPage.tsx`

- Página 404 personalizada
- Exibe mensagem amigável e link para voltar ao dashboard
- Usa ilustração ou ícone de "página não encontrada"

---

## Helpers

**Diretório**: `src/helpers/`

### storage.ts

Abstração do `localStorage`:

```typescript
export const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};

// Atalho para o token JWT:
export const tokenStorage = {
  get: () => storage.get("token"),
  set: (token) => storage.set("token", token),
  remove: () => storage.remove("token"),
};
```

---

### error.ts

Normaliza mensagens de erro vindas da API:

- Extrai `error.response.data.message` quando disponível
- Retorna mensagem genérica como fallback
- Trata erros de rede (sem `response`)

---

### formatters.ts

Formatação de valores para exibição:

- Valores monetários em BRL (`Intl.NumberFormat`)
- Percentuais
- Nomes/labels de tipos e origens de transação

---

### date.ts

Utilitários de data:

- Formatação de datas para `dd/MM/yyyy`
- Conversão de strings ISO 8601
- Cálculo de período (início/fim do mês)
- Labels de meses para os gráficos

---

### download.ts

Trigger de download de arquivos no browser:

```typescript
// Cria um <a> temporário, seta href e aciona o clique
export function downloadFile(blob: Blob, filename: string): void;
export function downloadFromUrl(url: string, filename: string): void;
```

Usado pelo fluxo de exportação de transações.

---

### validators.ts

Funções de validação de formulários:

- Email válido
- Senha com mínimo de 8 caracteres
- Campos obrigatórios
- Confirmação de senha

---

## Variáveis de Ambiente

Definidas no arquivo `orbees-frontend/.env` (usar `orbees-frontend/.env.example` como base).

| Variável | Obrigatório | Descrição | Padrão |
|----------|-------------|-----------|--------|
| `VITE_API_BASE_URL` | Sim | URL base da API REST | `http://localhost:5210/api` |

> Todas as variáveis expostas ao browser **devem** começar com `VITE_` (convenção do Vite).

---

## Scripts e Configuração de Build

### package.json scripts

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `vite` | Dev server com HMR em `http://localhost:5173` |
| `build` | `tsc -b && vite build` | Compila TypeScript + gera bundle otimizado em `dist/` |
| `preview` | `vite preview` | Serve o build de produção localmente |
| `lint` | `eslint .` | Executa o linter em todo o projeto |

### vite.config.ts

Configurado com `@vitejs/plugin-react` para suporte a Fast Refresh e JSX automático.

### TypeScript

- `tsconfig.json`: configuração raiz
- `tsconfig.app.json`: configuração da aplicação (`src/`)
- `tsconfig.node.json`: configuração para arquivos de config do Vite

**Strict mode habilitado** em toda a aplicação.

### Dockerfile.dev

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

O flag `--host` expõe o dev server para fora do container (necessário para o Docker Compose).
