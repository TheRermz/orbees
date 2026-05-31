# Documentação Técnica — Backend (orbees-api)

API REST construída com **ASP.NET Core 8** e **C# 12**, seguindo arquitetura em camadas com Repository Pattern, Service Layer e Injeção de Dependências nativa.

---

## Índice

- [Stack e Dependências](#stack-e-dependências)
- [Arquitetura](#arquitetura)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Entry Point — Program.cs](#entry-point--programcs)
- [Banco de Dados](#banco-de-dados)
- [Modelos de Dados](#modelos-de-dados)
- [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)
- [Repositórios](#repositórios)
- [Services](#services)
- [Controllers e Endpoints](#controllers-e-endpoints)
- [Validações (FluentValidation)](#validações-fluentvalidation)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Middlewares](#middlewares)
- [Injeção de Dependências](#injeção-de-dependências)
- [Sistema de Exportação](#sistema-de-exportação)
- [Importação de Extratos](#importação-de-extratos)
- [Sistema de Email](#sistema-de-email)
- [Logging (Serilog)](#logging-serilog)
- [Seeds](#seeds)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Stack e Dependências

| Pacote | Versão | Função |
|--------|--------|--------|
| ASP.NET Core | 8.0 | Framework web |
| Entity Framework Core | 8.0.5 | ORM |
| Npgsql.EFCore.PostgreSQL | 8.0.4 | Driver PostgreSQL |
| BCrypt.Net-Next | 4.1.0 | Hash de senhas |
| Microsoft.AspNetCore.Authentication.JwtBearer | 8.0.5 | Autenticação JWT |
| Microsoft.AspNetCore.Authentication.Google | 8.0.5 | OAuth Google |
| System.IdentityModel.Tokens.Jwt | 8.16.0 | Geração de tokens JWT |
| FluentValidation.AspNetCore | 11.3.1 | Validação de DTOs |
| MailKit | 4.15.1 | Envio de emails via SMTP |
| Serilog.AspNetCore | 8.0.3 | Logging estruturado |
| Swashbuckle.AspNetCore | 6.6.2 | Swagger / OpenAPI |
| QuestPDF | 2026.2.3 | Geração de PDFs |
| ClosedXML | 0.105.0 | Geração de Excel (.xlsx) |
| CsvHelper | 33.1.0 | Leitura e escrita de CSV |
| DotNetEnv | 3.1.1 | Leitura de arquivo `.env` |

---

## Arquitetura

O projeto segue uma **arquitetura em camadas** com responsabilidades bem definidas:

```
HTTP Request
     │
     ▼
┌─────────────────────────┐
│      Controllers        │  Recebe requisição, extrai claims, valida, delega
└─────────────────────────┘
             │
             ▼
┌─────────────────────────┐
│    FluentValidation     │  Valida DTOs antes de chegar ao Service
└─────────────────────────┘
             │
             ▼
┌─────────────────────────┐
│       Services          │  Lógica de negócio, orquestração
└─────────────────────────┘
             │
             ▼
┌─────────────────────────┐
│      Repositories       │  Acesso a dados, queries EF Core
└─────────────────────────┘
             │
             ▼
┌─────────────────────────┐
│   DbContext (EF Core)   │  Gerenciamento de entidades, migrations
└─────────────────────────┘
             │
             ▼
       PostgreSQL
```

**Princípios aplicados:**
- Controllers **finos**: sem lógica de negócio
- Services **isolados**: sem dependência direta do DbContext
- Repositórios **por entidade**: sem queries espalhadas
- Interfaces para **todas** as camadas (facilita testes e inversão de dependência)

---

## Estrutura de Diretórios

```
orbees-api/
├── Controllers/
│   ├── Auth/AuthController.cs
│   ├── Bank/BankController.cs
│   ├── BankAccount/BankAccountController.cs
│   ├── Category/CategoryController.cs
│   ├── Dashboard/DashboardController.cs
│   ├── ExportJob/ExportController.cs
│   ├── Group/GroupController.cs
│   ├── Transaction/TransactionController.cs
│   └── User/UserController.cs
│
├── Data/
│   ├── ApiDbContext.cs                  # DbContext principal
│   ├── Configurations/                  # Fluent API — mapeamento de entidades
│   │   ├── BankConfiguration.cs
│   │   ├── BankAccountConfiguration.cs
│   │   ├── CategoryConfiguration.cs
│   │   ├── ExportJobConfiguration.cs
│   │   ├── GroupConfiguration.cs
│   │   ├── GroupMemberConfiguration.cs
│   │   ├── GroupRoleConfiguration.cs
│   │   ├── RoleConfiguration.cs
│   │   ├── TransactionConfiguration.cs
│   │   ├── UserConfiguration.cs
│   │   └── UserRoleConfiguration.cs
│   └── Seeds/
│       ├── DefaultSeeder.cs             # Orquestrador de seeds
│       ├── AdminSeeder.cs
│       ├── BankSeeder.cs
│       ├── CategorySeeder.cs
│       ├── DebugUserSeedder.cs
│       ├── GroupRoleSeeder.cs
│       └── RoleSeeder.cs
│
├── Dtos/                                # Data Transfer Objects
│   ├── AuthDtos/
│   ├── Bank/
│   ├── BankAccount/
│   ├── Category/
│   ├── Dashboard/
│   ├── ExportJob/
│   ├── Group/
│   ├── GroupMember/
│   ├── GroupRole/
│   ├── Transaction/
│   └── UserDtos/
│
├── Extensions/
│   ├── DependencyInjection/
│   │   ├── RepositoryExtensions.cs
│   │   ├── ServiceExtensions.cs
│   │   └── ValidatorsExtensions.cs
│   └── MiddlewareExtensions/
│       └── MiddlewareExtensions.cs
│
├── Middlewares/
│   └── ExceptionErrorMiddleware.cs
│
├── Migrations/                          # Histórico de schema (11 migrations)
│
├── Models/
│   ├── Common/AuditableEntity.cs
│   ├── Enums/
│   │   ├── ExportFormat.cs
│   │   ├── ExportJobStatus.cs
│   │   ├── TransactionOrigin.cs
│   │   └── TransactionType.cs
│   ├── Bank.cs
│   ├── BankAccount.cs
│   ├── Category.cs
│   ├── ExportJob.cs
│   ├── Group.cs
│   ├── GroupMember.cs
│   ├── GroupRole.cs
│   ├── Role.cs
│   ├── Transaction.cs
│   ├── User.cs
│   └── UserRole.cs
│
├── Repositories/
│   ├── Interfaces/                      # Contratos
│   └── [Implementações]
│
├── Services/
│   ├── Interfaces/                      # Contratos
│   └── [Implementações por domínio]
│
├── Validators/                          # FluentValidation
│
├── uploads/                             # Fotos de perfil (servidas como static files)
├── logs/                                # Logs diários do Serilog
├── .env                                 # Variáveis de ambiente (não commitado)
├── .env.example                         # Template do .env
├── appsettings.json
├── appsettings.Development.json
├── Dockerfile.dev
├── global.json
└── Program.cs
```

---

## Entry Point — Program.cs

O `Program.cs` configura toda a pipeline da aplicação na seguinte ordem:

1. **Leitura do `.env`** via `DotNetEnv`
2. **Connection string** montada a partir das variáveis de ambiente
3. **Logger** (Serilog): console + arquivo diário em `logs/orbees{data}.log`
4. **Controllers** registrados
5. **Swagger** com suporte a Bearer Token no header
6. **JWT + Cookie + Google OAuth** configurados
7. **Authorization** habilitada
8. **DI**: `AddRepositories()`, `AddApplicationServices()`, `AddApplicationValidators()`
9. **CORS** policy `"Dev"` com origem configurável via `FRONTEND_URL`
10. **DbContext** com Npgsql
11. **BackgroundService** de exportação: `ExportBackgroundService`
12. **Migrations automáticas** + Seeds no startup
13. **Pipeline**: Swagger → StaticFiles (`/uploads`) → ExceptionHandler → CORS → HTTPS → Auth → Controllers

---

## Banco de Dados

### DbContext — ApiDbContext

**Localização**: `Data/ApiDbContext.cs`

```csharp
public DbSet<User> Users { get; set; }
public DbSet<Bank> Banks { get; set; }
public DbSet<BankAccount> BankAccounts { get; set; }
public DbSet<Role> Roles { get; set; }
public DbSet<UserRole> UserRoles { get; set; }
public DbSet<Category> Categories { get; set; }
public DbSet<Group> Groups { get; set; }
public DbSet<GroupRole> GroupRoles { get; set; }
public DbSet<GroupMember> GroupMembers { get; set; }
public DbSet<Transaction> Transactions { get; set; }
public DbSet<ExportJob> ExportJobs { get; set; }
```

**Auditoria automática**: `SaveChangesAsync` percorre entidades `AuditableEntity` e seta `CreatedAt` (Added) e `UpdatedAt` (Modified) automaticamente.

**Configurações**: Aplicadas via `modelBuilder.ApplyConfigurationsFromAssembly(...)` — todas as classes em `Data/Configurations/` são carregadas automaticamente.

### Migrations

| # | Nome | Data | O que adicionou |
|---|------|------|-----------------|
| 1 | `InitialCreate` | 2026-03-26 | Users, Roles, UserRoles |
| 2 | `AddProfilePicture` | 2026-03-26 | `ProfilePicturePath` em User |
| 3 | `AddCategoriasBancoseContas` | 2026-03-27 | Banks, BankAccounts, Categories |
| 4 | `RolesandSeed` | 2026-03-27 | Seed de Roles |
| 5 | `PadronizaCampos` | 2026-03-27 | Padronização de nomes de colunas |
| 6 | `AjustaCampoEAdicionaSeed` | 2026-03-27 | Ajustes e seed de bancos |
| 7 | `AddGroups` | 2026-04-04 | Groups, GroupMembers, GroupRoles |
| 8 | `AdicionaPromotedAtGroupMember` | 2026-04-07 | `PromotedAt` em GroupMember |
| 9 | `AdicionaCampoGroupId` | 2026-04-07 | `GroupId` em Category |
| 10 | `AddTransactions` | 2026-04-21 | Transactions + enums Type/Origin |
| 11 | `AddExportJobs` | 2026-05-22 | ExportJobs + enums Format/Status |

Migrations são aplicadas automaticamente no startup:
```csharp
await db.Database.MigrateAsync();
```

---

## Modelos de Dados

### AuditableEntity (base)

```csharp
public abstract class AuditableEntity
{
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
```

Todas as entidades principais herdam desta classe.

---

### User

```csharp
public class User : AuditableEntity
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string? PasswordHash { get; set; }           // null para usuários OAuth
    public bool EmailConfirmed { get; set; }
    public string? EmailConfirmationToken { get; set; }
    public DateTime? EmailConfirmationExpiresAt { get; set; }
    public string? PwdResetToken { get; set; }
    public DateTime? PwdResetExpiresAt { get; set; }
    public string? OAuthProvider { get; set; }          // ex: "Google"
    public string? OAuthProviderId { get; set; }
    public bool IsActive { get; set; }
    public string? ProfilePicturePath { get; set; }

    // Navegação
    public ICollection<BankAccount> BankAccounts { get; set; }
    public ICollection<Category> Categories { get; set; }
    public ICollection<UserRole> UserRoles { get; set; }
    public ICollection<GroupMember> GroupMembers { get; set; }
}
```

---

### Bank

```csharp
public class Bank
{
    public int Id { get; set; }
    public string BankName { get; set; }
    public string BankCode { get; set; }           // Código COMPE (ex: "341" = Itaú)
    public string Ispb { get; set; }               // Código ISPB do Banco Central
    public string? CsvHeaderSignature { get; set; } // Assinatura do cabeçalho CSV
    public bool IsActive { get; set; }

    public ICollection<BankAccount> BankAccounts { get; set; }
}
```

---

### BankAccount

```csharp
public class BankAccount : AuditableEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Agency { get; set; }
    public string AccountNumber { get; set; }
    public Guid UserId { get; set; }
    public int BankId { get; set; }
    public bool IsActive { get; set; }

    public User User { get; set; }
    public Bank Bank { get; set; }
}
```

---

### Category

```csharp
public class Category : AuditableEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Icon { get; set; }
    public string Color { get; set; }
    public Guid? UserId { get; set; }      // null = categoria do sistema
    public Guid? GroupId { get; set; }     // null = categoria pessoal
    public bool IsActive { get; set; }

    public User? User { get; set; }
    public Group? Group { get; set; }
}
```

**Tipos de categoria** (por combinação de campos):
- `UserId != null, GroupId == null` → pessoal
- `GroupId != null` → de grupo
- `UserId == null, GroupId == null` → do sistema (padrão, seed)

---

### Group

```csharp
public class Group : AuditableEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }

    public ICollection<GroupMember> Members { get; set; }
    public ICollection<Category> Categories { get; set; }
}
```

---

### GroupMember

```csharp
public class GroupMember : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GroupId { get; set; }
    public Guid UserId { get; set; }
    public int GroupRoleId { get; set; }   // 1 = Admin, 2 = Member
    public bool IsActive { get; set; }
    public DateTime? LeftAt { get; set; }
    public DateTime? PromotedAt { get; set; }

    public Group Group { get; set; }
    public User User { get; set; }
    public GroupRole GroupRole { get; set; }
}
```

---

### Transaction

```csharp
public class Transaction : AuditableEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? OriginalDescription { get; set; }  // Descrição original do OFX/CSV
    public string? Description { get; set; }          // Descrição editável pelo usuário
    public decimal Amount { get; set; }               // Sempre positivo
    public DateTime TransactionDate { get; set; }
    public TransactionType Type { get; set; }         // Receita | Despesa
    public TransactionOrigin Origin { get; set; }     // Manual | OFX | CSV
    public string? MerchantDocument { get; set; }
    public bool IsActive { get; set; } = true;
    public bool GroupLinkActive { get; set; } = true; // Controla edição do GroupCategoryId

    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid? BankAccountId { get; set; }
    public BankAccount? BankAccount { get; set; }

    public Guid? CategoryId { get; set; }            // Categoria pessoal do usuário
    public Category? Category { get; set; }

    public Guid? GroupCategoryId { get; set; }       // Categoria do grupo
    public Category? GroupCategory { get; set; }

    public Guid? GroupId { get; set; }
    public Group? Group { get; set; }
}
```

---

### ExportJob

```csharp
public class ExportJob : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public ExportFormat Format { get; set; }         // CSV | Excel | PDF
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public ExportJobStatus Status { get; set; }      // Pending | Processing | Completed | Failed
    public string? FilePath { get; set; }            // Caminho do arquivo gerado
    public string? ErrorMessage { get; set; }

    public User User { get; set; }
}
```

---

### Enums

```csharp
public enum TransactionType   { Receita, Despesa }
public enum TransactionOrigin { Manual, OFX, CSV }
public enum ExportFormat      { CSV, Excel, PDF }
public enum ExportJobStatus   { Pending, Processing, Completed, Failed }
```

---

## Data Transfer Objects (DTOs)

DTOs separam os modelos de banco dos dados expostos na API.

### Auth DTOs

| DTO | Campos |
|-----|--------|
| `LoginDto` | `Email`, `Password` |
| `ForgotPasswordDto` | `Email` |
| `ResetPasswordDto` | `Token`, `NewPassword` |

### User DTOs

| DTO | Campos |
|-----|--------|
| `UserCreateDto` | `Email`, `Fullname`, `Username`, `Password` |
| `UserReadDto` | `Id`, `Email`, `Fullname`, `Username`, `ProfilePictureUrl`, `EmailConfirmed`, `CreatedAt` |
| `UserUpdateDto` | `Fullname`, `Username` |
| `UserUpdatePasswordDto` | `CurrentPassword`, `NewPassword` |
| `UserListDto` | Versão resumida para listagens |

### Transaction DTOs

| DTO | Campos relevantes |
|-----|-------------------|
| `TransactionCreateDto` | `Title`, `Description?`, `Amount`, `TransactionDate`, `Type`, `MerchantDocument?`, `BankAccountId?`, `CategoryId?`, `GroupId?`, `GroupCategoryId?` |
| `TransactionReadDto` | Todos os campos + nomes de categoria/conta/grupo via JOIN |
| `TransactionUpdateDto` | `Title?`, `Description?`, `CategoryId?`, `GroupCategoryId?`, `GroupId?` |
| `TransactionBulkCreateDto` | `Transactions: List<TransactionCreateDto>` (máx 100) |
| `TransactionPreviewDto` | Como `CreateDto` + `SuggestedCategoryId`, `SuggestedCategoryName`, `OriginalDescription` |
| `TransactionImportDto` | `BankAccountId?`, `Transactions: List<TransactionPreviewDto>` (máx 500) |

### Dashboard DTOs

| DTO | Conteúdo |
|-----|----------|
| `DashboardResponseDto` | `Summary`, `Insights`, `RevenueVsExpensesChart`, `ExpensesByCategoryChart`, `AvailableMonths`, `PeriodStart`, `PeriodEnd` |
| `DashboardSummaryDto` | `Balance`, `TotalIncome`, `TotalExpenses`, variações `%`, `TopCategory` |
| `ChartDataDto` | `Label`, `Income`, `Expenses` (receita vs despesa) ou `Label`, `Value`, `Percentage` (por categoria) |
| `LastTransactionDto` | `Id`, `Title`, `Amount` (sinal invertido para despesas), `Type`, `TransactionDate`, `CategoryName` |

### ExportJob DTOs

| DTO | Campos |
|-----|--------|
| `ExportJobStatusDto` | `JobId`, `Status`, `DownloadUrl?`, `ErrorMessage?`, `CreatedAt` |

---

## Repositórios

### Interface genérica

```csharp
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}
```

### Repositórios específicos

#### IUserRepository / UserRepository

| Método | Descrição |
|--------|-----------|
| `GetByEmailAsync(email)` | Busca por email |
| `GetByUsernameAsync(username)` | Busca por username |
| `GetByOAuthProviderAsync(provider, providerId)` | Busca por provedor OAuth |
| `GetByEmailConfirmationTokenAsync(token)` | Busca por token de confirmação |
| `GetByPasswordResetTokenAsync(token)` | Busca por token de reset |

#### ICategoryRepository / CategoryRepository

| Método | Descrição |
|--------|-----------|
| `GetAllByUserIdAsync(userId)` | Categorias pessoais + sistema |
| `GetAllByGroupIdAsync(groupId)` | Categorias de um grupo |
| `GetByNameAsync(name, userId?, groupId?)` | Busca por nome (para evitar duplicatas) |

#### IGroupRepository / GroupRepository

| Método | Descrição |
|--------|-----------|
| `GetGroupsByUserIdAsync(userId)` | Grupos onde o usuário é membro ativo |
| `GetGroupWithMembersAsync(groupId)` | Grupo com navegação de membros |

#### IGroupMemberRepository / GroupMemberRepository

| Método | Descrição |
|--------|-----------|
| `GetByGroupAndUserAsync(groupId, userId)` | Membership específica |
| `GetMembersByGroupIdAsync(groupId)` | Todos os membros de um grupo |
| `IsUserMemberAsync(groupId, userId)` | Verifica membership ativa |
| `GetUserRoleInGroupAsync(groupId, userId)` | Role do usuário no grupo |

#### ITransactionRepository / TransactionRepository

| Método | Descrição |
|--------|-----------|
| `GetByUserIdAsync(userId, from?, to?)` | Transações do usuário no período |
| `GetByGroupAsync(groupId, from?, to?)` | Transações do grupo no período |
| `GetByIdAsync(id, userId)` | Transação por id (escopo do usuário) |
| `AddAsync(transaction)` | Adiciona uma transação |
| `AddRangeAsync(transactions)` | Adiciona múltiplas transações |
| `UpdateAsync(transaction)` | Atualiza |
| `DeleteAsync(transaction)` | Remove |
| `GetSimilarByDescriptionAsync(userId, description, take)` | Transações similares para sugestão de categoria |

#### IExportJobRepository / ExportJobRepository

| Método | Descrição |
|--------|-----------|
| `AddAsync(job)` | Cria novo job |
| `GetByIdAndUserIdAsync(jobId, userId)` | Job por id e usuário |
| `GetPendingAsync()` | Jobs com `Status = Pending` (para o BackgroundService) |
| `UpdateAsync(job)` | Atualiza status/filePath |
| `SaveChangesAsync()` | Persiste alterações |

---

## Services

### Auth Services

A autenticação é dividida em serviços especializados, orquestrados por `AuthService` (Facade Pattern).

#### ITokenService / TokenService

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `GenerateJwtToken(user)` | `string` | JWT com claims: `sub` (UserId), `email`, `role` |
| `GenerateEmailConfirmationToken()` | `string` | GUID aleatório para confirmar email |
| `GeneratePasswordResetToken()` | `string` | GUID aleatório para reset de senha |

**Claims do JWT:**
- `JwtRegisteredClaimNames.Sub` = `user.Id`
- `JwtRegisteredClaimNames.Email` = `user.Email`
- `ClaimTypes.Role` = roles do usuário

#### IAuthRegisterService / AuthRegisterService

1. Verifica se email já existe → lança `InvalidOperationException`
2. Gera hash da senha via BCrypt
3. Gera token de confirmação de email com expiração
4. Persiste o usuário
5. Envia email de confirmação via `IEmailService`
6. Retorna `UserReadDto`

#### IAuthLoginService / AuthLoginService

1. Busca usuário por email → 404 se não encontrado
2. Verifica `IsActive` → 401 se inativo
3. Verifica `EmailConfirmed` → 401 se não confirmado
4. Valida senha com `BCrypt.Verify` → 401 se inválida
5. Retorna JWT via `ITokenService.GenerateJwtToken`

#### IAuthEmailConfirmService / AuthEmailConfirmService

1. Busca usuário pelo token de confirmação → 404 se não encontrado
2. Verifica expiração do token → `InvalidOperationException` se expirado
3. Seta `EmailConfirmed = true`, limpa token e expira
4. Persiste

#### IAuthPasswordService / AuthPasswordService

**ForgotPassword:**
1. Busca usuário por email (silencioso — não revela se email existe)
2. Gera token de reset com expiração de 1 hora
3. Envia email com link de reset

**ResetPassword:**
1. Busca por token de reset → 404 se não encontrado
2. Verifica expiração → `InvalidOperationException`
3. Atualiza hash da senha via BCrypt
4. Limpa token de reset

#### IAuthOAuthService / AuthOAuthService

1. Busca usuário por `OAuthProvider = "Google"` e `OAuthProviderId`
2. Se não existe: busca por email; se o email existe mas sem OAuth → lança conflito
3. Se nenhum existe: cria novo usuário sem senha, `EmailConfirmed = true`
4. Retorna JWT

#### IAuthService / AuthService (Facade)

Delega para os serviços especializados. Centraliza a interface de autenticação para o Controller.

---

### IUserService / UserService

| Método | Descrição |
|--------|-----------|
| `GetProfileAsync(userId)` | Retorna perfil; 404 se não encontrado |
| `GetAllUsersAsync()` | Lista todos os usuários ativos |
| `UpdateProfileAsync(userId, dto)` | Atualiza `Fullname` e `Username`; valida duplicata de username |
| `UpdatePasswordAsync(userId, dto)` | Verifica senha atual; atualiza hash |
| `DeleteAccountAsync(userId)` | Soft delete: `IsActive = false` |
| `UpdateProfilePictureAsync(userId, file)` | Salva imagem em `uploads/profilePictures/{username}/`; remove anterior |
| `DeleteProfilePictureAsync(userId)` | Remove arquivo e limpa `ProfilePicturePath` |

---

### ICategoryService / CategoryService

| Método | Descrição |
|--------|-----------|
| `GetAllAsync(userId, groupId?)` | Lista categorias do usuário (pessoais + sistema + grupo se `groupId` fornecido) |
| `GetByIdAsync(id, userId)` | Verifica propriedade |
| `CreateAsync(dto, userId)` | Valida duplicata de nome; cria categoria |
| `UpdateAsync(id, dto, userId)` | Verifica propriedade e duplicata de nome |
| `DeleteAsync(id, userId)` | Soft delete; verifica propriedade |

**Regras:**
- Categorias do sistema (`UserId == null`) não podem ser editadas ou deletadas
- Não permite nomes duplicados no mesmo escopo (usuário ou grupo)

---

### IGroupService / GroupsService

| Método | Descrição |
|--------|-----------|
| `GetAllAsync(userId)` | Grupos onde usuário é membro ativo |
| `GetByIdAsync(groupId, userId)` | Verifica membership |
| `GetMembersAsync(groupId, userId)` | Lista membros; exige membership |
| `GetRolesAsync()` | Lista roles disponíveis (Admin, Member) |
| `CreateAsync(dto, userId)` | Cria grupo e adiciona criador como Admin |
| `UpdateAsync(groupId, dto, userId)` | Exige role Admin |
| `DeleteAsync(groupId, userId)` | Soft delete; exige role Admin |
| `AddMemberAsync(groupId, dto, userId)` | Exige role Admin; verifica se já é membro |
| `UpdateMemberRoleAsync(groupId, memberId, dto, userId)` | Exige Admin; impede rebaixar último Admin |
| `RemoveMemberAsync(groupId, memberId, userId)` | Exige Admin; impede remover último Admin |
| `LeaveGroupAsync(groupId, userId)` | Usuário sai voluntariamente; impede se único Admin |

---

### IBankAccountService / BankAccountService

| Método | Descrição |
|--------|-----------|
| `GetAllAsync(userId)` | Contas ativas do usuário |
| `GetByIdAsync(id, userId)` | Verifica propriedade |
| `CreateAsync(dto, userId)` | Valida existência do banco; cria conta |
| `UpdateAsync(id, dto, userId)` | Verifica propriedade |
| `DeleteAsync(id, userId)` | Soft delete |

---

### IBankService / BankService

| Método | Descrição |
|--------|-----------|
| `GetAllAsync()` | Lista bancos ativos com código COMPE e ISPB |

---

### ITransactionService / TransactionService

| Método | Descrição |
|--------|-----------|
| `GetMyTransactionsAsync(userId, from?, to?)` | Transações do usuário no período |
| `GetGroupTransactionsAsync(userId, groupId, from?, to?)` | Exige membership ativa no grupo |
| `GetByIdAsync(userId, id)` | Transação do usuário por id |
| `CreateAsync(userId, dto)` | `Origin = Manual`; valida conta bancária; valida `GroupCategoryId` se `GroupId` informado |
| `CreateBulkAsync(userId, dto)` | Até 100 transações; aplica mesmas regras de criação |
| `PreviewFromOFXAsync(userId, file)` | Delega ao `IExtractReaderService`; adiciona sugestão de categoria |
| `PreviewFromCSVAsync(userId, file, bankId)` | Busca banco por id; delega ao leitor CSV |
| `ImportAsync(userId, dto)` | Persiste até 500 transações; `Origin = OFX` |
| `UpdateAsync(userId, id, dto)` | Patch parcial; valida regras de `GroupId`/`GroupCategoryId`/`GroupLinkActive` |
| `DeleteAsync(userId, id)` | Verifica propriedade; remove |

**Sugestão de categoria (`SuggestCategoryAsync`):**
Busca até 5 transações com título similar (via `GetSimilarByDescriptionAsync`), elege a categoria mais frequente entre elas e retorna `suggestedCategoryId` e `suggestedCategoryName` no preview.

**Regras de negócio de transação:**
- `BankAccountId` deve pertencer ao usuário
- `GroupId` exige `GroupCategoryId` no mesmo request
- Em `UpdateAsync`, `GroupId` só pode ser definido se atualmente `null` e usuário for membro do grupo
- `GroupCategoryId` não pode ser alterado quando `GroupLinkActive == false`

---

### IDashboardService / DashboardService

| Método | Descrição |
|--------|-----------|
| `GetSelfDashboardAsync(userId, from, to)` | Retorna `DashboardResponseDto` completo |
| `GetLastTransactionsAsync(userId)` | Últimas 5 transações (Amount negativo para despesas) |

**Cálculos realizados:**

- **Variação %**: compara com período anterior de mesmo tamanho (`prevTo = from - 1 dia`, `prevFrom = prevTo - duração`)
- **Top categoria**: maior despesa por valor; em empate, maior por contagem
- **Insights**: média diária; top 3 categorias de despesa por frequência; alerta se nenhuma transação nos últimos 7 dias
- **Gráfico receita vs despesa**: agrupamento semanal (`Dias N-M`) se período ≤ 1 mês; agrupamento mensal (`MMM yy`) caso contrário
- **Gráfico por categoria**: top 10 despesas, inclui fatia "Sem categoria"
- **Percentuais** arredondados para `int`

---

### IExportService / ExportService

| Método | Descrição |
|--------|-----------|
| `ExportDirectAsync(userId, format, from, to)` | Gera arquivo em memória se ≤ 100 transações; retorna `null` se exceder |
| `EnqueueExportAsync(userId, format, from, to)` | Cria `ExportJob` com `Status = Pending`; retorna `jobId` |
| `GetJobStatusAsync(userId, jobId)` | Retorna status + `downloadUrl` quando `Completed` |
| `GetJobFileAsync(userId, jobId)` | Retorna entidade `ExportJob` (para o controller ler `FilePath`) |

**Geradores:**

| Gerador | Biblioteca | Colunas | Arquivo |
|---------|------------|---------|---------|
| `GenerateCSV` | CsvHelper, delimitador `;`, cultura pt-BR | Data, Título, Tipo, Valor, Categoria, Conta, Origem | `transacoes.csv` |
| `GenerateExcel` | ClosedXML, planilha "Transações" | Idem CSV + `AdjustToContents()` | `transacoes.xlsx` |
| `GeneratePDF` | QuestPDF, A4, margem 30 | Data, Título, Tipo, Valor, Categoria | `transacoes.pdf` |

**Limiar**: `BackgroundThreshold = 100` transações.

---

### IExtractReaderService / ExtractReaderService

**OFX:**
- Parseia o arquivo texto linha a linha via `OFXParser`
- Lê blocos `<STMTTRN>...</STMTTRN>`
- Normaliza vírgula → ponto em `TRNAMT`
- Parseia `DTPOSTED` como `yyyyMMdd`
- `MEMO` ou `NAME` como título
- Valor negativo → `Despesa`; positivo → `Receita`
- `Amount` sempre absoluto

**CSV:**
- Faz `switch` pelo `BankCode` do banco
- **Nubank (260)**: funcional
- **Itaú (341)**: implementado mas não habilitado no switch
- Bradesco (237), BB (001), Santander (033), Inter (077): lançam `NotImplementedException`
- Caixa (104): não implementado
- Banco desconhecido: `InvalidOperationException`

#### Formatos CSV Suportados

**Nubank (BankCode: 260) — IMPLEMENTADO ✓**

- **Delimitador**: `,` (vírgula)
- **Codificação**: UTF-8 com BOM
- **Cabeçalho**: `Data,Descrição,Valor`
- **Formato de data**: `dd/MM/yyyy`
- **Formato de valor**: Decimal com vírgula (ex: `1.234,56`)
- **Sinal**: Negativo para despesas, positivo para receitas

**Exemplo:**
```csv
Data,Descrição,Valor
01/05/2026,Supermercado Extra,-125,50
05/05/2026,Transfer\u00eancia recebida,5000,00
10/05/2026,IFOOD*PEDIDO,-42,90
```

**Itaú (BankCode: 341) — IMPLEMENTADO MAS NÃO HABILITADO**

- **Delimitador**: `;` (ponto e vírgula)
- **Codificação**: UTF-8 ou ISO-8859-1
- **Cabeçalho**: `Data;Histórico;Crédito(R$);Débito(R$);Saldo(R$)`
- **Formato de data**: `dd/MM/yyyy`
- **Formato de valor**: Decimal com vírgula e separador de milhar com ponto (ex: `1.234,56`)
- **Colunas separadas**: Crédito e Débito em colunas diferentes

**Exemplo:**
```csv
Data;Histórico;Crédito(R$);Débito(R$);Saldo(R$)
01/05/2026;COMPRA DEBITO SUPERMERCADO;;125,50;8.874,50
05/05/2026;DEPOSITO EM CONTA;5.000,00;;13.874,50
```

**Bradesco (BankCode: 237) — NÃO IMPLEMENTADO ✗**

Formato esperado (não validado):
- Delimitador: `;`
- Colunas: `Data;Histórico;Documento;Valor;Saldo`

**Banco do Brasil (BankCode: 001) — NÃO IMPLEMENTADO ✗**

Formato esperado (não validado):
- Delimitador: `;`
- Colunas: `Data;Historico;Numero_do_Documento;Valor;Saldo`

**Santander (BankCode: 033) — NÃO IMPLEMENTADO ✗**

Formato esperado (não validado):
- Delimitador: `;`
- Similar ao Itaú

**Inter (BankCode: 077) — NÃO IMPLEMENTADO ✗**

Formato esperado (não validado):
- Delimitador: `,`
- Similar ao Nubank

**Caixa (BankCode: 104) — NÃO IMPLEMENTADO ✗**

Formato não documentado.

#### Como Adicionar Suporte a Novo Banco CSV

1. Obter exemplo de CSV real do banco
2. Identificar delimitador, codificação e formato de colunas
3. Implementar método `private static async Task<List<TransactionPreviewDto>> Read{Banco}CSVAsync(StreamReader reader)` em `ExtractReaderService.cs`
4. Adicionar case no switch da linha 42-52:
```csharp
"237" => await ReadBradescoCSVAsync(reader),
```
5. Usar `CsvHelper` com configuração adequada (`CsvConfiguration`)
6. Testar com múltiplos arquivos reais

---

### IEmailService / EmailService

Usa **MailKit** para envio via SMTP configurável por `.env`:

| Método | Descrição |
|--------|-----------|
| `SendEmailAsync(to, subject, htmlBody)` | Envia email HTML via SMTP |

**Templates utilizados:**
- Confirmação de email: link `{FRONTEND_URL}/auth/confirm-email?token={token}`
- Reset de senha: link `{FRONTEND_URL}/reset-password?token={token}`

---

### IFileService / FileService

| Método | Descrição |
|--------|-----------|
| `SaveFileAsync(file, path)` | Salva `IFormFile` em disco |
| `DeleteFileAsync(path)` | Remove arquivo do disco |

Arquivos de perfil salvos em: `uploads/profilePictures/{username}/{guid}.{ext}`
Servidos como static files em: `/uploads/profilePictures/...`

---

## Controllers e Endpoints

Todos os controllers usam **Primary Constructor** (C# 12), sem campos privados manuais.

### AuthController — `/api/auth`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/register` | Não | Registra usuário; retorna 201 com `UserReadDto` |
| POST | `/login` | Não | Retorna `{ token }` |
| GET | `/confirm-email?token=` | Não | Confirma email; retorna 200 |
| POST | `/forgot-password` | Não | Envia email de recuperação; resposta genérica |
| POST | `/reset-password` | Não | Redefine senha |
| GET | `/google` | Não | Inicia fluxo OAuth Google (redirect) |
| GET | `/google/callback` | Não | Callback OAuth; redireciona para frontend com token |

---

### UserController — `/api/user`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/me` | Sim | Perfil do usuário autenticado |
| GET | `/` | Sim (Admin) | Lista todos os usuários |
| PUT | `/me` | Sim | Atualiza `Fullname` e `Username` |
| PUT | `/me/password` | Sim | Altera senha |
| DELETE | `/me` | Sim | Desativa conta (soft delete) |
| PUT | `/me/picture` | Sim | Upload de foto (`multipart/form-data`) |
| DELETE | `/me/picture/delete` | Sim | Remove foto de perfil |

---

### CategoryController — `/api/categories`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/?groupId=` | Sim | Lista categorias (pessoais + sistema + grupo opcional) |
| GET | `/{id}` | Sim | Categoria por id |
| POST | `/` | Sim | Cria categoria |
| PUT | `/{id}` | Sim | Atualiza categoria |
| DELETE | `/{id}` | Sim | Deleta categoria |

---

### GroupController — `/api/groups`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/` | Sim | Meus grupos |
| GET | `/{groupId}` | Sim | Grupo por id |
| GET | `/{groupId}/members` | Sim | Membros do grupo |
| GET | `/roles` | Sim | Roles disponíveis |
| POST | `/` | Sim | Cria grupo |
| PUT | `/{groupId}` | Sim (Admin do grupo) | Atualiza grupo |
| DELETE | `/{groupId}` | Sim (Admin do grupo) | Deleta grupo |
| POST | `/{groupId}/members` | Sim (Admin do grupo) | Adiciona membro |
| PUT | `/{groupId}/members/{id}/role` | Sim (Admin do grupo) | Altera role do membro |
| DELETE | `/{groupId}/members/{id}` | Sim (Admin do grupo) | Remove membro |
| DELETE | `/{groupId}/leave` | Sim | Sai do grupo |

---

### BankAccountController — `/api/bank-accounts`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/` | Sim | Minhas contas bancárias |
| GET | `/{id}` | Sim | Conta por id |
| POST | `/` | Sim | Cria conta |
| PUT | `/{id}` | Sim | Atualiza conta |
| DELETE | `/{id}` | Sim | Deleta conta |

---

### BankController — `/api/banks`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/` | Não | Lista bancos disponíveis |

---

### TransactionController — `/api/transactions`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/?from&to` | Sim | Minhas transações no período |
| GET | `/group/{groupId}?from&to` | Sim | Transações do grupo |
| GET | `/{id}` | Sim | Transação por id |
| POST | `/` | Sim | Cria transação manual |
| POST | `/bulk` | Sim | Cria até 100 transações |
| POST | `/preview/ofx` | Sim | Preview de OFX (`multipart/form-data`) |
| POST | `/preview/csv/{bankId}` | Sim | Preview de CSV por banco |
| POST | `/import` | Sim | Importa lote do preview (máx 500) |
| PUT | `/{id}` | Sim | Atualiza transação |
| DELETE | `/{id}` | Sim | Remove transação |

---

### DashboardController — `/api/dashboard`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/self?from&to` | Sim | Dashboard do período (default = mês corrente) |
| GET | `/self/last-transactions` | Sim | Últimas 5 transações |

---

### ExportController — `/api/transactions/export`

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/?format&from&to` | Sim | Exporta diretamente (≤100) ou enfileira job (202) |
| GET | `/{jobId}/status` | Sim | Status do job de exportação |
| GET | `/{jobId}/download` | Sim | Download do arquivo gerado |

---

## Validações (FluentValidation)

Validadores são registrados via assembly scan em `ValidatorsExtensions.cs` e executados automaticamente pelo ASP.NET antes de chamar o action.

### UserCreateDtoValidator

| Campo | Regras |
|-------|--------|
| `Email` | Obrigatório, formato de email válido |
| `Password` | Obrigatório, mínimo 8 caracteres |
| `Fullname` | Obrigatório, máximo 100 caracteres |
| `Username` | Obrigatório, máximo 50 caracteres |

### TransactionCreateDtoValidator

| Campo | Regras |
|-------|--------|
| `Title` | 2–256 caracteres |
| `Description` | Máximo 512 caracteres |
| `Amount` | Não nulo, maior que zero |
| `TransactionDate` | Obrigatória, não futura |
| `Type` | Enum válido |
| `MerchantDocument` | Máximo 18 caracteres |
| `GroupCategoryId` | Obrigatório quando `GroupId != null` |

### TransactionBulkCreateDtoValidator

- Lista não vazia
- Máximo **100** itens
- Cada item validado pelo `TransactionCreateDtoValidator`

### TransactionImportDtoValidator

- Lista não vazia
- Máximo **500** itens
- `Title` obrigatório/≤ 256, `Amount` ≠ 0, `TransactionDate` obrigatória
- `GroupCategoryId` obrigatório se `GroupId != null`

### TransactionUpdateDtoValidator

- `Title` (2–256) quando informado
- `Description` (≤ 512) quando informado
- `GroupCategoryId` obrigatório quando `GroupId != null`

---

## Autenticação e Autorização

### JWT

**Configuração** (`Program.cs`):

```csharp
ValidateIssuer = true
ValidateAudience = true
ValidateLifetime = true
ValidateIssuerSigningKey = true
ValidIssuer = JWT_ISSUER       // "orbees-api"
ValidAudience = JWT_AUDIENCE   // "orbees-frontend"
IssuerSigningKey = SymmetricSecurityKey(UTF8.GetBytes(JWT_SECRET_KEY))
```

**Fluxo de autenticação tradicional:**
1. `POST /api/auth/login` → valida credenciais → retorna `{ token }`
2. Cliente armazena token no `localStorage`
3. Requisições seguintes: header `Authorization: Bearer {token}`
4. Ao expirar: cliente recebe 401 e deve fazer novo login

**Claims do token:**
- `sub` → `UserId` (Guid)
- `email` → Email do usuário
- `role` → Role(s) do usuário

**Resposta 401 customizada** (via `JwtBearerEvents.OnChallenge`):
```json
{ "message": "Acesso não autorizado" }
```

### OAuth Google

**Fluxo:**
1. `GET /api/auth/google` → desafio para o esquema Google → redirect para Google
2. Usuário autentica no Google
3. `GET /api/auth/google/callback` → extrai `email`, `name`, `providerId` das claims
4. `AuthOAuthService.HandleGoogleCallbackAsync` → cria ou recupera usuário → gera JWT
5. Redirect para `{FRONTEND_URL}/auth/callback?token={jwt}`

### Autorização por Role

```csharp
[Authorize(Roles = "Admin")]   // Apenas admins do sistema
[Authorize]                    // Qualquer usuário autenticado
[AllowAnonymous]               // Sem autenticação
```

---

## Middlewares

### ExceptionHandlerMiddleware

**Localização**: `Middlewares/ExceptionErrorMiddleware.cs`

Intercepta exceções não tratadas e retorna respostas HTTP padronizadas:

| Exceção | HTTP Status | Uso |
|---------|-------------|-----|
| `InvalidOperationException` | 409 Conflict | Email duplicado, operação inválida de grupo |
| `UnauthorizedAccessException` | 401 Unauthorized | Acesso sem permissão |
| `KeyNotFoundException` | 404 Not Found | Recurso não encontrado |
| `Exception` (genérica) | 500 Internal Server Error | Erros inesperados |

Todas as respostas seguem o formato:
```json
{ "message": "Descrição do erro" }
```

**Registro** (via extension method):
```csharp
app.UseGlobalExceptionHandler();
```

---

## Injeção de Dependências

### RepositoryExtensions.cs

Todos os repositórios registrados com **Scoped** (uma instância por requisição HTTP):

```csharp
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IBankRepository, BankRepository>();
services.AddScoped<IBankAccountRepository, BankAccountRepository>();
services.AddScoped<IGroupRepository, GroupRepository>();
services.AddScoped<IGroupMemberRepository, GroupMemberRepository>();
services.AddScoped<IGroupRoleRepository, GroupRoleRepository>();
services.AddScoped<ICategoryRepository, CategoryRepository>();
services.AddScoped<ITransactionRepository, TransactionRepository>();
services.AddScoped<IExportJobRepository, ExportJobRepository>();
```

### ServiceExtensions.cs

Todos os serviços registrados com **Scoped**:

```csharp
// Auth
services.AddScoped<ITokenService, TokenService>();
services.AddScoped<IAuthRegisterService, AuthRegisterService>();
services.AddScoped<IAuthLoginService, AuthLoginService>();
services.AddScoped<IAuthEmailConfirmService, AuthEmailConfirmService>();
services.AddScoped<IAuthPasswordService, AuthPasswordService>();
services.AddScoped<IAuthOAuthService, AuthOAuthService>();
services.AddScoped<IAuthService, AuthService>();
services.AddScoped<IEmailService, EmailService>();

// Domínios
services.AddScoped<IUserService, UserService>();
services.AddScoped<IFileService, FileService>();
services.AddScoped<IBankService, BankService>();
services.AddScoped<IBankAccountService, BankAccountService>();
services.AddScoped<IGroupService, GroupService>();
services.AddScoped<ICategoryService, CategoryService>();
services.AddScoped<ITransactionService, TransactionService>();
services.AddScoped<IExtractReaderService, ExtractReaderService>();
services.AddScoped<IDashboardService, DashboardService>();
services.AddScoped<IExportService, ExportService>();
```

**BackgroundService** registrado separadamente (Singleton gerenciado pelo host):
```csharp
builder.Services.AddHostedService<ExportBackgroundService>();
```

---

## Background Services

### ExportBackgroundService

**Arquivo**: `Services/ExportBackgroundService.cs`

Serviço background que processa jobs de exportação assíncronos quando há mais de 100 transações.

**Fluxo de execução:**

1. Roda a cada 10 segundos (configurável via `Timer`)
2. Busca todos os jobs com `Status = Pending` no banco
3. Para cada job:
   - Marca `Status = Processing`
   - Busca as transações do usuário/grupo no período especificado
   - Gera o arquivo (CSV/Excel/PDF) via `ExportService`
   - Salva em `exports/{userId}/{jobId}_{filename}.{ext}`
   - Atualiza `FilePath` e `Status = Completed`
   - Em caso de erro: `Status = Failed` + `ErrorMessage`

**Implementação do ciclo:**

```csharp
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        await ProcessPendingJobsAsync();
        await Task.Delay(10000, stoppingToken); // 10 segundos
    }
}
```

**Gerenciamento de escopo:**

Como é um Singleton, o service cria escopos manualmente para acessar serviços Scoped (DbContext, repositórios):

```csharp
using var scope = serviceScopeFactory.CreateScope();
var exportJobRepository = scope.ServiceProvider.GetRequiredService<IExportJobRepository>();
var transactionRepository = scope.ServiceProvider.GetRequiredService<ITransactionRepository>();
```

**Diretório de saída:**
- Desenvolvimento: `orbees-api/exports/`
- Docker: Volume mapeado em `/app/exports`

---

## Sistema de Exportação

### Fluxo Síncrono (≤ 100 transações)

```
GET /api/transactions/export?format=CSV
        │
        ▼
ExportController.Export()
        │
        ▼
ExportService.ExportDirectAsync()
        │ transactions.Count <= 100?
        ▼
GenerateCSV() / GenerateExcel() / GeneratePDF()
        │
        ▼
File(bytes, contentType, fileName)   → HTTP 200
```

### Fluxo Assíncrono (> 100 transações)

```
GET /api/transactions/export?format=PDF
        │
        ▼
ExportService.ExportDirectAsync() → null
        │
        ▼
ExportService.EnqueueExportAsync()
        │  Cria ExportJob { Status = Pending }
        ▼
HTTP 202 Accepted { message, jobId }

        ... em background (a cada 10s) ...

ExportBackgroundService
        │  GetPendingAsync()
        ▼
Marca Status = Processing
        │
        ▼
Gera arquivo → salva em exports/{userId}/{jobId}_{fileName}
        │
        ▼
Atualiza FilePath, Status = Completed
        (ou Status = Failed + ErrorMessage em caso de erro)

Polling do cliente:
GET /api/transactions/export/{jobId}/status
GET /api/transactions/export/{jobId}/download
```

---

## Importação de Extratos

### Fluxo OFX

```
POST /api/transactions/preview/ofx  (multipart: file)
        │
        ▼
ExtractReaderService.ReadOFXAsync()
        │  OFXParser.Parse() — lê STMTTRN blocks
        ▼
TransactionService.PreviewFromOFXAsync()
        │  SuggestCategoryAsync() para cada transação
        ▼
List<TransactionPreviewDto>  → HTTP 200

POST /api/transactions/import
        │  body: { bankAccountId?, transactions: [...] }
        ▼
TransactionService.ImportAsync()
        │  Origin = OFX, máx 500 itens
        ▼
AddRangeAsync()  → HTTP 200
```

### Fluxo CSV

```
POST /api/transactions/preview/csv/{bankId}  (multipart: file)
        │
        ▼
BankService.GetByIdAsync(bankId)
        │
        ▼
ExtractReaderService.ReadCSVAsync(file, bankCode)
        │  switch(bankCode):
        │    "260" (Nubank) → NubankCsvReader
        │    outros → NotImplementedException
        ▼
List<TransactionPreviewDto>  → HTTP 200
```

---

## Sistema de Email

Configurado via variáveis de ambiente (`MAIL_*`). Em desenvolvimento usa **Mailpit** como servidor SMTP fake.

**Templates de email:**
- **Confirmação de email**: enviado no registro; link com validade definida no `AuthRegisterService`
- **Reset de senha**: enviado no `ForgotPassword`; link com validade de 1 hora

---

## Logging (Serilog)

Configurado no `Program.cs`:

```csharp
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/orbees.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();
```

- **Console**: saída em tempo real durante desenvolvimento
- **Arquivo**: `logs/orbees{yyyyMMdd}.log`, um arquivo por dia
- Integrado ao pipeline do ASP.NET via `builder.Host.UseSerilog()`

---

## Seeds

Executados automaticamente no startup via `DefaultSeeder.SeedAsync(db)`:

| Seeder | O que cria |
|--------|------------|
| `RoleSeeder` | Roles globais: `Admin`, `User` |
| `GroupRoleSeeder` | Roles de grupo: `Admin`, `Member` |
| `BankSeeder` | Bancos brasileiros principais (Itaú, Bradesco, BB, Nubank, etc.) |
| `CategorySeeder` | Categorias padrão do sistema (Alimentação, Transporte, Saúde, etc.) |
| `AdminSeeder` | Usuário admin padrão (credenciais via `.env`) |
| `DebugUserSeeder` | 20 usuários e dados de teste (só se `SEED_DB=true`) |

Seeds são **idempotentes**: verificam existência antes de inserir.

---

## Variáveis de Ambiente

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `DB_HOST` | Sim | Host do PostgreSQL |
| `DB_PORT` | Sim | Porta do PostgreSQL (5432) |
| `DB_USER` | Sim | Usuário do banco |
| `DB_PASSWORD` | Sim | Senha do banco |
| `DB_NAME` | Sim | Nome do banco de dados |
| `POSTGRES_USER` | Docker | Usuário do container PostgreSQL |
| `POSTGRES_PASSWORD` | Docker | Senha do container PostgreSQL |
| `POSTGRES_DB` | Docker | Database do container PostgreSQL |
| `API_PORT` | Sim | Porta da API (5210) |
| `FRONTEND_URL` | Sim | URL do frontend (para CORS e links de email) |
| `JWT_SECRET_KEY` | Sim | Chave de assinatura do JWT (mín. 32 chars) |
| `JWT_ISSUER` | Sim | Emissor do JWT (`orbees-api`) |
| `JWT_AUDIENCE` | Sim | Audiência do JWT (`orbees-frontend`) |
| `GOOGLE_CLIENT_ID` | OAuth | Client ID do Google Cloud |
| `GOOGLE_CLIENT_SECRET` | OAuth | Client Secret do Google Cloud |
| `MAIL_HOST` | Sim | Host SMTP (`mailpit` no Docker, `localhost` local) |
| `MAIL_PORT` | Sim | Porta SMTP (1025 no Mailpit) |
| `MAIL_USER` | Sim | Usuário SMTP |
| `MAIL_PASSWORD` | Sim | Senha SMTP |
| `MAIL_FROM` | Sim | Email remetente |
| `SEED_DB` | Não | `true` para seed de dados de teste (padrão: `false`) |

---

## Segurança e Boas Práticas

### Proteções Implementadas

#### 1. Autenticação e Autorização

**JWT com assinatura HMACSHA256:**
- Tokens assinados com chave secreta de mínimo 32 caracteres
- Validação de emissor (`issuer`), audiência (`audience`) e expiração
- Claims incluem: `sub` (userId), `email`, `role`

**OAuth 2.0 Google:**
- Fluxo authorization code
- Validação de tokens via Google APIs
- Criação/login automático de usuários OAuth

**Proteção de rotas:**
- `[Authorize]` em todos os endpoints privados
- `[Authorize(Roles = "Admin")]` para endpoints administrativos
- Validação de propriedade de recursos (ex: transação pertence ao usuário)

#### 2. Proteção de Senhas

**BCrypt.Net** com salt automático:
- Custo de hash: padrão BCrypt (10 rounds)
- Senhas nunca armazenadas em texto plano
- Suporte a usuários OAuth sem senha

#### 3. Validação de Entrada

**FluentValidation** em todos os DTOs:
- Email em formato válido
- Senhas com mínimo 8 caracteres
- Títulos e descrições com tamanhos máximos
- Valores numéricos positivos
- Datas não futuras para transações
- Validação de regras de negócio (ex: `GroupCategoryId` obrigatório quando `GroupId` presente)

#### 4. Proteção contra Ataques Comuns

**SQL Injection:**
- **Proteção**: EF Core usa queries parametrizadas por padrão
- **Sem concatenação de strings** em queries raw
- Todas as queries via LINQ ou Fluent API

**XSS (Cross-Site Scripting):**
- **Backend**: Não renderiza HTML; retorna apenas JSON
- **Frontend**: React escapa automaticamente valores no JSX
- **Sem uso de `dangerouslySetInnerHTML`**

**CSRF (Cross-Site Request Forgery):**
- **Proteção**: Autenticação stateless via JWT (não usa cookies de sessão)
- CORS configurado com origem específica via `FRONTEND_URL`

**Mass Assignment:**
- **Proteção**: DTOs específicos para create/update (não aceita modelos de domínio diretamente)
- FluentValidation limita campos aceitos

#### 5. Controle de Acesso

**Validação de propriedade:**
- Transações: verificação de `UserId` antes de retornar/atualizar/deletar
- Categorias: verificação de `UserId` ou `GroupId`
- Grupos: verificação de membership ativa
- Contas bancárias: verificação de `UserId`

**Validação de permissões de grupo:**
- Admin: pode adicionar/remover membros, alterar roles, deletar grupo
- Member: pode apenas visualizar e criar transações
- Verificação de role antes de operações administrativas
- Proteção: não permite remover o último Admin do grupo

#### 6. Rate Limiting

> **Status**: Não implementado
>
> **Recomendação para produção:**
> - Implementar `AspNetCoreRateLimit` ou middleware customizado
> - Limitar requisições por IP e por usuário autenticado
> - Ex: 100 req/min por IP, 1000 req/min por usuário autenticado

#### 7. HTTPS e CORS

**HTTPS:**
- Redireciona HTTP → HTTPS via `app.UseHttpsRedirection()`
- Em produção: usar certificado SSL válido (Let's Encrypt, etc.)

**CORS:**
- Policy `Dev` configurada com origem específica via `FRONTEND_URL`
- Não permite `AllowAnyOrigin()` em produção
- Headers permitidos: `Authorization`, `Content-Type`

#### 8. Logging e Auditoria

**Serilog:**
- Logs estruturados em arquivo diário (`logs/orbees{yyyyMMdd}.log`)
- Não loga dados sensíveis (senhas, tokens)
- Loga exceções com stack trace

**Auditoria automática:**
- Timestamps `CreatedAt` e `UpdatedAt` em todas as entidades
- Soft delete: preserva histórico de dados
- Campos de auditoria em `GroupMembers`: `JoinedAt`, `LeftAt`, `PromotedAt`

#### 9. Proteção de Arquivos

**Upload de fotos de perfil:**
- Validação de extensão: apenas `.jpg`, `.jpeg`, `.png`
- Tamanho máximo: 5MB (configurável)
- Nomes de arquivo com GUID para evitar path traversal
- Salvos em diretório dedicado: `uploads/profilePictures/{username}/`

**Arquivos de exportação:**
- Gerados em diretório temporário: `exports/{userId}/`
- Acesso restrito: apenas o usuário dono do job pode fazer download
- Validação de `jobId` e `userId` antes de servir o arquivo

#### 10. Tokens de Email

**Email confirmation e Password reset:**
- Tokens únicos (GUID) com expiração
- Validação de expiração antes de aceitar
- Limpeza após uso (token definido como `null`)
- Expiração padrão: 24h (confirmação), 1h (reset)

### Recomendações Adicionais para Produção

1. **Implementar HSTS** (HTTP Strict Transport Security)
2. **Adicionar helmet headers** (X-Frame-Options, X-Content-Type-Options, etc.)
3. **Implementar rate limiting** por endpoint sensível
4. **Adicionar 2FA** (Two-Factor Authentication) para usuários
5. **Rotação de chaves JWT** periodicamente
6. **Monitoramento de segurança** (ex: Sentry, Application Insights)
7. **Backup automático do banco de dados**
8. **Testes de penetração** e análise de vulnerabilidades
9. **Implementar CAPTCHA** em endpoints de registro e login
10. **Adicionar IP whitelisting** para endpoints administrativos
