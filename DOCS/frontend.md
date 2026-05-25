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

| Rota | Componente | Guard | Status |
|------|------------|-------|--------|
| `/login` | `LoginPage` | PublicRoute | Implementada |
| `/register` | `RegisterPage` | PublicRoute | Implementada |
| `/auth/confirm-email` | `ConfirmEmailPage` | PublicRoute | Implementada |
| `/auth/callback` | `GoogleCallbackPage` | Nenhum | Implementada |
| `/forgot-password` | `<h1>` placeholder | PublicRoute | Placeholder |
| `/reset-password` | `<h1>` placeholder | PublicRoute | Placeholder |
| `/dashboard` | `<h1>` placeholder | PrivateRoute | Em desenvolvimento |
| `/transactions` | `<h1>` placeholder | PrivateRoute | Em desenvolvimento |
| `/categories` | `<h1>` placeholder | PrivateRoute | Em desenvolvimento |
| `/groups` | `<h1>` placeholder | PrivateRoute | Em desenvolvimento |
| `/profile` | `<h1>` placeholder | PrivateRoute | Em desenvolvimento |
| `/not-found` | `<h1>` placeholder | PublicRoute | Placeholder |
| `*` | Redirect para `/not-found` | — | — |

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
