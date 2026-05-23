# ORBEES

**Plataforma web de monitoramento financeiro pessoal e em grupo**

Orbees é uma plataforma de controle financeiro que automatiza a importação e categorização de transações bancárias via extrato OFX/CSV, com módulos de gestão em grupo, controle de categorias personalizadas e autenticação robusta.

> **Projeto de TCC** - Este repositório faz parte de um trabalho de conclusão de curso e não aceita contribuições externas no momento.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Dependency Injection](#dependency-injection)
- [Middlewares](#middlewares)
- [Services](#services)
- [Repositories](#repositories)
- [Controllers](#controllers)
- [Modelos de Dados](#modelos-de-dados)
- [Validações](#validações)
- [Endpoints da API](#endpoints-da-api)
- [Configuração e Instalação](#configuração-e-instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Docker](#docker)
- [Banco de Dados](#banco-de-dados)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Padrões de Projeto](#padrões-de-projeto)
- [Roadmap](#roadmap)

---

## Sobre o Projeto

Orbees é uma solução completa para gerenciamento financeiro que combina:

- **Gestão Pessoal**: Controle individual de finanças com categorias customizadas
- **Gestão em Grupo**: Compartilhamento de despesas e categorias entre membros
- **Importação Automatizada**: Suporte para extratos bancários OFX/CSV
- **Autenticação Robusta**: Login tradicional + OAuth Google
- **Sistema de Permissões**: Roles e autorizações por usuário e grupo

O projeto está estruturado em arquitetura monorepo com backend em ASP.NET Core e frontend em React.

---

## Stack Tecnológica

### Backend (orbees-api)

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| .NET | 8.0 | Framework principal |
| C# | 12 | Linguagem de programação |
| ASP.NET Core | 8.0 | Framework web |
| Entity Framework Core | 8.0.5 | ORM para acesso a dados |
| PostgreSQL | 14 | Banco de dados relacional |
| JWT Bearer | 8.16.0 | Autenticação stateless |
| Google OAuth | 8.0.5 | Autenticação social |
| FluentValidation | 11.3.1 | Validação de DTOs |
| BCrypt.Net | 4.1.0 | Hash de senhas |
| MailKit | 4.15.1 | Envio de emails |
| Serilog | 8.0.3 | Logging estruturado |
| Swagger | 6.6.2 | Documentação da API |
| QuestPDF | 2026.2.3 | Geração de PDFs |
| OFXSharp | 1.0.4002 | Importação de OFX |
| CsvHelper | 33.1.0 | Importação e exportação de CSV |
| ClosedXML | 0.105.0 | Geração de planilhas Excel (`.xlsx`) |
| DotNetEnv | 3.1.1 | Gerenciamento de .env |

### Frontend (orbees-frontend)

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| React | 19.2.0 | Biblioteca UI |
| TypeScript | 5.9.3 | Tipagem estática |
| Vite | 7.3.1 | Build tool |
| ESLint | 9.39.1 | Linter |

### Infraestrutura

- **Docker & Docker Compose**: Containerização
- **Mailpit**: Servidor SMTP de desenvolvimento
- **Git**: Controle de versão

---

## Arquitetura

O projeto segue uma **arquitetura em camadas** com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│         Controllers Layer           │  ← Recebe requisições HTTP
│    (Validação, Autenticação)        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│          Services Layer             │  ← Lógica de negócio
│   (Orquestração, Regras de Negócio) │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│        Repositories Layer           │  ← Acesso a dados
│      (Queries, Persistência)        │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│      Database (PostgreSQL)          │
└─────────────────────────────────────┘
```

### Fluxo de Requisição

1. **Controller** recebe a requisição HTTP
2. **Validator** valida o DTO de entrada (FluentValidation)
3. **Middleware** intercepta exceções globalmente
4. **Service** executa a lógica de negócio
5. **Repository** realiza operações no banco
6. **DbContext** gerencia o estado das entidades
7. **Response** retorna para o cliente

---

## Estrutura do Projeto

```
orbees/
├── orbees-api/                     # Backend ASP.NET Core
│   ├── Controllers/                # Endpoints da API
│   ├── Services/                   # Lógica de negócio
│   │   └── Interfaces/             # Contratos de serviços
│   ├── Repositories/               # Acesso a dados
│   │   └── Interfaces/             # Contratos de repositórios
│   ├── Models/                     # Entidades do banco
│   ├── Dtos/                       # Objetos de transferência
│   ├── Validators/                 # Validações FluentValidation
│   ├── Data/                       # DbContext e configurações
│   │   ├── Configurations/         # Fluent API mappings
│   │   └── Seeds/                  # Dados iniciais
│   ├── Migrations/                 # Histórico do schema
│   ├── Extensions/                 # Extension methods
│   │   ├── DependencyInjection/    # Injeção de dependências
│   │   └── MiddlewareExtensions/   # Extensões de middleware
│   ├── Middlewares/                # Middlewares customizados
│   ├── uploads/                    # Arquivos enviados
│   ├── logs/                       # Logs da aplicação
│   └── Program.cs                  # Entry point
│
├── orbees-frontend/                # Frontend React
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   └── assets/
│   └── public/
│
├── docker-compose.development.yml  # Ambiente de desenvolvimento
├── docker-compose.production.yml   # Ambiente de produção
└── orbees.sln                      # Solução Visual Studio
```

---

## Funcionalidades Implementadas

### Autenticação & Autorização

- [x] Registro de usuários com email/senha
- [x] Login tradicional com JWT
- [x] Autenticação OAuth Google
- [x] Confirmação de email
- [x] Recuperação e reset de senha
- [x] Sistema de roles (Admin, User)
- [x] Autorização baseada em claims JWT
- [x] Cookies para OAuth

### Gerenciamento de Usuários

- [x] Perfil pessoal (CRUD)
- [x] Upload de foto de perfil
- [x] Alteração de senha
- [x] Desativação de conta (soft delete)
- [x] Listagem de usuários

### Categorias

- [x] Categorias pessoais (vinculadas ao usuário)
- [x] Categorias de grupo (compartilhadas)
- [x] Categorias do sistema (padrão)
- [x] Sistema de cores e ícones
- [x] Validação de duplicação de nomes
- [x] CRUD completo

### Grupos

- [x] Criação e gerenciamento de grupos
- [x] Sistema de membros
- [x] Roles específicas de grupo (Admin, Member)
- [x] Adição/remoção de membros
- [x] Promoção/rebaixamento de membros
- [x] Histórico de promoções
- [x] Saída voluntária de grupo
- [x] Categorias compartilhadas

### Contas Bancárias

- [x] CRUD de contas bancárias
- [x] Associação com bancos cadastrados
- [x] Campos de agência e número
- [x] Soft delete

### Sistema de Bancos

- [x] Listagem de bancos brasileiros
- [x] Código COMPE
- [x] ISPB
- [x] Assinatura de cabeçalho CSV
- [x] Seeds com bancos principais

### Transações

- [x] CRUD de transações manuais (controle individual)
- [x] Criação em lote (até 100 por requisição)
- [x] Importação de extrato OFX (preview + import com origem `OFX`)
- [x] Importação de extrato CSV por banco (Nubank funcional; demais a implementar)
- [x] Sugestão automática de categoria com base em histórico (até 5 transações similares)
- [x] Vínculo opcional com grupo e categoria de grupo (preserva categoria pessoal)
- [x] Filtros por período (`from`/`to`)
- [x] Listagem de transações de grupo (apenas membros)
- [x] Tipos: `Receita` / `Despesa`
- [x] Origens: `Manual` / `OFX` / `CSV`

### Dashboard

- [x] Dashboard individual com período customizável (default = mês corrente)
- [x] Totais de receita, despesa e saldo com variação % vs. período anterior
- [x] Top categoria de despesa (nome, valor e % do total)
- [x] Insights automáticos (média diária, top 3 categorias por frequência, alerta de inatividade ≥ 7 dias)
- [x] Gráfico de receita vs. despesa (agrupamento semanal ou mensal conforme intervalo)
- [x] Gráfico de despesas por categoria (top 10, com fatia "Sem categoria")
- [x] Últimas 5 transações (sinal invertido para despesas)
- [x] Lista de meses disponíveis no histórico

### Exportação de Dados

- [x] Exportação de transações em CSV, Excel (`.xlsx`) e PDF
- [x] Geração síncrona quando volume ≤ 100 transações
- [x] Geração assíncrona via `BackgroundService` (acima do limite) com `jobId` retornado em 202
- [x] Polling de status (`Pending` / `Processing` / `Completed` / `Failed`)
- [x] Download do arquivo gerado a partir do disco (`exports/{userId}/{jobId}_{fileName}`)

---

## Dependency Injection

O sistema utiliza **Injeção de Dependências nativa do ASP.NET Core** com extensões customizadas para organização.

### Registro de Dependências

Localizado em `Program.cs` (linha 125-128):

```csharp
builder.Services
  .AddRepositories()
  .AddApplicationServices()
  .AddApplicationValidators();
```

### RepositoryExtensions.cs

**Localização**: `orbees-api/Extensions/DependencyInjection/RepositoryExtensions.cs`

Registra todos os repositórios com **Scoped Lifetime** (uma instância por requisição):

```csharp
public static IServiceCollection AddRepositories(this IServiceCollection services)
{
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IBankRepository, BankRepository>();
    services.AddScoped<IBankAccountRepository, BankAccountRepository>();
    services.AddScoped<IGroupRepository, GroupRepository>();
    services.AddScoped<IGroupMemberRepository, GroupMemberRepository>();
    services.AddScoped<IGroupRoleRepository, GroupRoleRepository>();
    services.AddScoped<ICategoryRepository, CategoryRepository>();
    services.AddScoped<ITransactionRepository, TransactionRepository>();
    services.AddScoped<IExportJobRepository, ExportJobRepository>();
    return services;
}
```

### ServiceExtensions.cs

**Localização**: `orbees-api/Extensions/DependencyInjection/ServiceExtensions.cs`

Registra todos os serviços com **Scoped Lifetime**:

```csharp
public static IServiceCollection AddApplicationServices(this IServiceCollection services)
{
    // AUTH
    services.AddScoped<ITokenService, TokenService>();
    services.AddScoped<IAuthRegisterService, AuthRegisterService>();
    services.AddScoped<IAuthLoginService, AuthLoginService>();
    services.AddScoped<IAuthEmailConfirmService, AuthEmailConfirmService>();
    services.AddScoped<IAuthPasswordService, AuthPasswordService>();
    services.AddScoped<IAuthOAuthService, AuthOAuthService>();
    services.AddScoped<IAuthService, AuthService>();
    services.AddScoped<IEmailService, EmailService>();

    // USER
    services.AddScoped<IUserService, UserService>();

    // FILES
    services.AddScoped<IFileService, FileService>();

    // BANK & BANK ACCOUNT
    services.AddScoped<IBankService, BankService>();
    services.AddScoped<IBankAccountService, BankAccountService>();

    // GROUPS
    services.AddScoped<IGroupService, GroupService>();

    // CATEGORIES
    services.AddScoped<ICategoryService, CategoryService>();

    // TRANSACTIONS & IMPORT
    services.AddScoped<ITransactionService, TransactionService>();
    services.AddScoped<IExtractReaderService, ExtractReaderService>();

    // DASHBOARD
    services.AddScoped<IDashboardService, DashboardService>();

    // EXPORT
    services.AddScoped<IExportService, ExportService>();

    return services;
}
```

> **Nota:** `ExportBackgroundService` é um `BackgroundService` e **não** é registrado em `ServiceExtensions`. Ele é adicionado diretamente em `Program.cs` via `builder.Services.AddHostedService<ExportBackgroundService>();` (linha 147). O loop processa jobs `Pending` com delay de 10s entre ciclos.

### ValidatorsExtensions.cs

**Localização**: `orbees-api/Extensions/DependencyInjection/ValidatorsExtensions.cs`

Registra validadores FluentValidation automaticamente via Assembly Scan.

---

## Middlewares

### ExceptionHandlerMiddleware

**Localização**: `orbees-api/Middlewares/ExceptionErrorMiddleware.cs`

Middleware global para **tratamento centralizado de exceções**. Intercepta todas as exceções não tratadas e retorna respostas HTTP apropriadas.

#### Exceções Tratadas

| Exceção | HTTP Status | Descrição |
|---------|-------------|-----------|
| `InvalidOperationException` | 409 Conflict | Operações inválidas (ex: email duplicado) |
| `UnauthorizedAccessException` | 401 Unauthorized | Acesso não autorizado |
| `KeyNotFoundException` | 404 Not Found | Recurso não encontrado |
| `Exception` (genérica) | 500 Internal Server Error | Erros não mapeados |

#### Implementação

```csharp
public class ExceptionHandlerMiddleware
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (InvalidOperationException ex)
        {
            logger.LogWarning(ex, "Erro de operação inválida.");
            context.Response.StatusCode = 409;
            await context.Response.WriteAsJsonAsync(new { message = ex.Message });
        }
        // ... outros catches
    }
}
```

#### Registro

**Localização**: `orbees-api/Extensions/MiddlewareExtensions/MiddlewareExtensions.cs`

```csharp
public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder app)
{
    return app.UseMiddleware<ExceptionHandlerMiddleware>();
}
```

Utilizado em `Program.cs:167`:

```csharp
app.UseGlobalExceptionHandler();
```

---

## Services

Os **Services** contêm a **lógica de negócio** da aplicação. Cada service é registrado via Dependency Injection e implementa sua respectiva interface.

### Estrutura de Services

```
Services/
├── Interfaces/           # Contratos (abstrações)
│   ├── Auth/
│   ├── UserProfile/
│   ├── Category/
│   ├── Groups/
│   ├── Bank/
│   ├── BankAccount/
│   ├── Email/
│   ├── FileService/
│   ├── Transactions/
│   ├── ExtractReader/
│   ├── Dashboard/
│   └── ExportJob/
└── [Implementações]/
    ├── Auth/
    ├── UserProfile/
    ├── Category/
    ├── Groups/
    ├── Bank/
    ├── BankAccount/
    ├── Email/
    ├── File/
    ├── Transactions/
    ├── ExtractReader/   # OFX/CSV parsers
    ├── Dashboard/
    └── ExportJob/       # ExportService + ExportBackgroundService
```

### Services de Autenticação

#### 1. ITokenService / TokenService

**Responsabilidade**: Geração e validação de tokens JWT

**Métodos**:
- `GenerateJwtToken(User user)`: Gera token JWT com claims do usuário
- `GenerateEmailConfirmationToken()`: Gera token de confirmação de email
- `GeneratePasswordResetToken()`: Gera token de reset de senha

#### 2. IAuthRegisterService / AuthRegisterService

**Responsabilidade**: Registro de novos usuários

**Métodos**:
- `RegisterAsync(UserCreateDto dto)`: Cria novo usuário com hash de senha
- Envia email de confirmação via `IEmailService`
- Gera token de confirmação com expiração

#### 3. IAuthLoginService / AuthLoginService

**Responsabilidade**: Autenticação de usuários

**Métodos**:
- `LoginAsync(LoginDto dto)`: Valida credenciais e retorna JWT
- Verifica se email está confirmado
- Valida senha com BCrypt

#### 4. IAuthEmailConfirmService / AuthEmailConfirmService

**Responsabilidade**: Confirmação de email

**Métodos**:
- `ConfirmEmailAsync(string token)`: Confirma email do usuário
- Valida token e expiração
- Ativa a conta do usuário

#### 5. IAuthPasswordService / AuthPasswordService

**Responsabilidade**: Recuperação e reset de senha

**Métodos**:
- `ForgotPasswordAsync(ForgotPasswordDto dto)`: Envia email de recuperação
- `ResetPasswordAsync(ResetPasswordDto dto)`: Redefine senha
- Valida token de reset

#### 6. IAuthOAuthService / AuthOAuthService

**Responsabilidade**: Autenticação via Google OAuth

**Métodos**:
- `HandleGoogleCallbackAsync(claims)`: Processa retorno do Google
- Cria usuário se não existir
- Retorna JWT

#### 7. IAuthService / AuthService

**Responsabilidade**: Orquestração dos serviços de autenticação

Atua como **facade** para centralizar operações de autenticação.

### Services de Usuário

#### IUserService / UserService

**Responsabilidade**: Gerenciamento de perfis de usuário

**Métodos**:
- `GetProfileAsync(Guid userId)`: Retorna perfil do usuário
- `UpdateProfileAsync(Guid userId, UserUpdateDto dto)`: Atualiza dados
- `UpdatePasswordAsync(Guid userId, UserUpdatePasswordDto dto)`: Altera senha
- `DeleteAccountAsync(Guid userId)`: Desativa conta (soft delete)
- `UpdateProfilePictureAsync(Guid userId, IFormFile file)`: Upload de foto
- `DeleteProfilePictureAsync(Guid userId)`: Remove foto

### Services de Categoria

#### ICategoryService / CategoryService

**Responsabilidade**: Gerenciamento de categorias

**Métodos**:
- `GetAllAsync(Guid userId, Guid? groupId)`: Lista categorias
- `GetByIdAsync(Guid id, Guid userId)`: Obtém categoria específica
- `CreateAsync(CategoryCreateDto dto, Guid userId)`: Cria categoria
- `UpdateAsync(Guid id, CategoryUpdateDto dto, Guid userId)`: Atualiza
- `DeleteAsync(Guid id, Guid userId)`: Deleta categoria

**Regras de Negócio**:
- Categorias podem ser pessoais (userId) ou de grupo (groupId)
- Valida duplicação de nomes
- Verifica permissões antes de operações

### Services de Grupo

#### IGroupService / GroupService

**Responsabilidade**: Gerenciamento de grupos e membros

**Métodos**:
- `GetAllAsync(Guid userId)`: Lista grupos do usuário
- `GetByIdAsync(Guid groupId, Guid userId)`: Obtém grupo específico
- `GetMembersAsync(Guid groupId, Guid userId)`: Lista membros
- `CreateAsync(GroupCreateDto dto, Guid userId)`: Cria grupo
- `UpdateAsync(Guid groupId, GroupUpdateDto dto, Guid userId)`: Atualiza
- `DeleteAsync(Guid groupId, Guid userId)`: Deleta grupo
- `AddMemberAsync(Guid groupId, GroupMemberCreateDto dto, Guid userId)`: Adiciona membro
- `UpdateMemberRoleAsync(...)`: Altera role de membro
- `RemoveMemberAsync(...)`: Remove membro
- `LeaveGroupAsync(Guid groupId, Guid userId)`: Sai do grupo

**Regras de Negócio**:
- Apenas admins podem adicionar/remover membros
- Verifica se usuário é membro antes de operações
- Impede remoção do último admin

### Services de Conta Bancária

#### IBankAccountService / BankAccountService

**Responsabilidade**: Gerenciamento de contas bancárias

**Métodos**:
- `GetAllAsync(Guid userId)`: Lista contas do usuário
- `GetByIdAsync(Guid id, Guid userId)`: Obtém conta específica
- `CreateAsync(BankAccountCreateDto dto, Guid userId)`: Cria conta
- `UpdateAsync(Guid id, BankAccountUpdateDto dto, Guid userId)`: Atualiza
- `DeleteAsync(Guid id, Guid userId)`: Deleta conta

### Services de Banco

#### IBankService / BankService

**Responsabilidade**: Listagem de bancos disponíveis

**Métodos**:
- `GetAllAsync()`: Retorna lista de bancos cadastrados

### Services de Transação

#### ITransactionService / TransactionService

**Responsabilidade**: Gerenciamento de transações financeiras (CRUD, import OFX/CSV, listagens por escopo).

**Métodos**:
- `GetMyTransactionsAsync(userId, from?, to?)`: lista transações do usuário no período.
- `GetGroupTransactionsAsync(userId, groupId, from?, to?)`: lista transações do grupo (exige membership ativa).
- `GetByIdAsync(userId, transactionId)`: busca por id no escopo do usuário.
- `CreateAsync(userId, TransactionCreateDto)`: cria transação manual (`Origin = Manual`).
- `CreateBulkAsync(userId, TransactionBulkCreateDto)`: cria até 100 transações em lote.
- `PreviewFromOFXAsync(userId, IFormFile)`: parseia OFX e retorna preview com sugestão de categoria.
- `PreviewFromCSVAsync(userId, IFormFile, bankId)`: parseia CSV (por banco) e retorna preview.
- `ImportAsync(userId, TransactionImportDto)`: persiste o lote vindo do preview (`Origin = OFX`, máx 500).
- `UpdateAsync(userId, transactionId, TransactionUpdateDto)`: patch parcial (Title, Description, CategoryId, GroupCategoryId, GroupId).
- `DeleteAsync(userId, transactionId)`: remove a transação.

**Regras de Negócio**:
- Conta bancária precisa pertencer ao usuário.
- Quando `GroupId` é informado, `GroupCategoryId` é obrigatório.
- `GroupId` só pode ser definido em `UpdateAsync` se atualmente nulo e usuário for membro.
- `GroupCategoryId` não pode ser alterado quando `GroupLinkActive == false`.
- Sugestão de categoria (`SuggestCategoryAsync`) busca até 5 transações com descrição similar do mesmo usuário e elege a categoria mais frequente.
- `ImportAsync` força `Origin = OFX` mesmo para preview vindo de CSV (não diferencia origem real no momento).

#### IExtractReaderService / ExtractReaderService

**Responsabilidade**: Parsing de extratos bancários em OFX e CSV.

**Métodos**:
- `ReadOFXAsync(IFormFile)`: delega ao `OFXParser.Parse` (lê `STMTTRN`, normaliza vírgula→ponto em `TRNAMT`, parseia `DTPOSTED` como `yyyyMMdd`, usa `MEMO`/`NAME` como título). Valor negativo → `Despesa`; positivo → `Receita`. `Amount` sempre absoluto.
- `ReadCSVAsync(IFormFile, bankId)`: faz switch pelo `BankCode` do banco. Apenas **Nubank (`260`)** está funcional. Bradesco (`237`), BB (`001`), Santander (`033`) e Inter (`077`) lançam `NotImplementedException`. Itaú (`341`) e Caixa (`104`) estão comentados no switch (mesmo havendo implementação privada para Itaú). Banco desconhecido → `InvalidOperationException`.

### Services de Dashboard

#### IDashboardService / DashboardService

**Responsabilidade**: Agregação e cálculo de métricas para o dashboard individual.

**Métodos**:
- `GetSelfDashboardAsync(userId, from, to)`: retorna `DashboardResponseDto` com totais, variações, top categoria, insights, dois gráficos e meses disponíveis.
- `GetLastTransactionsAsync(userId)`: últimas 5 transações (com `Amount` invertido para despesas).

**Regras de Negócio**:
- Variação % calculada contra período anterior de mesmo tamanho (`prevTo = from-1d`, `prevFrom = prevTo - duration`).
- Top categoria considera só despesas; ordena por valor desc, depois por contagem.
- Insights gerados: média diária no período; top 3 categorias de despesa por frequência; alerta se nenhuma transação nos últimos 7 dias.
- Gráfico **receita vs despesa**: agrupa por semana (`Dias N-M`) se intervalo está dentro do mesmo mês; senão agrupa por mês (`MMM yy`).
- Gráfico **despesas por categoria**: top 10, incluindo fatia "Sem categoria".
- Percentuais arredondados para `int`.

### Services de Exportação

#### IExportService / ExportService

**Responsabilidade**: Geração de relatórios de transações em CSV, Excel e PDF, com modo síncrono e assíncrono.

**Métodos**:
- `ExportDirectAsync(userId, format, from, to)`: gera arquivo em memória se `transactions.Count ≤ 100`; caso contrário retorna `null` para o controller enfileirar job.
- `EnqueueExportAsync(userId, format, from, to)`: cria `ExportJob` com `Status = Pending` e retorna o `Id`.
- `GetJobStatusAsync(userId, jobId)`: retorna status + `DownloadUrl` quando `Completed`.
- `GetJobFileAsync(userId, jobId)`: retorna a entidade `ExportJob` (controller usa para acessar `FilePath` e `Format`).

**Geradores internos**:
- `GenerateCSV`: CsvHelper com delimiter `;` e cultura pt-BR; classe `TransactionExportRow` (Data/Título/Tipo/Valor/Categoria/Conta/Origem).
- `GenerateExcel`: ClosedXML, planilha "Transações" com as mesmas colunas.
- `GeneratePDF`: QuestPDF, A4, tabela com 5 colunas (Data/Título/Tipo/Valor/Categoria) e paginação no rodapé.

**Constantes**:
- `BackgroundThreshold = 100`: limite para alternar entre exportação síncrona e assíncrona.

#### ExportBackgroundService

**Responsabilidade**: Processa jobs `Pending` em background.

**Comportamento**:
- Registrado em `Program.cs` via `AddHostedService<ExportBackgroundService>()`.
- Loop infinito com `Task.Delay(10s)` entre ciclos.
- Para cada job `Pending`: marca `Processing` → gera arquivo → grava em `exports/{userId}/{jobId}_{fileName}` → atualiza `FilePath` e `Status = Completed`. Em erro, marca `Failed` com `ErrorMessage`.

### Services Auxiliares

#### IEmailService / EmailService

**Responsabilidade**: Envio de emails

**Métodos**:
- `SendEmailAsync(to, subject, body)`: Envia email via MailKit
- Suporta HTML
- Configurável via variáveis de ambiente

#### IFileService / FileService

**Responsabilidade**: Gerenciamento de arquivos

**Métodos**:
- `SaveFileAsync(IFormFile file, string path)`: Salva arquivo
- `DeleteFileAsync(string path)`: Deleta arquivo
- Validação de tipo e tamanho

---

## Repositories

Os **Repositories** abstraem o acesso a dados e encapsulam queries ao banco de dados.

### Estrutura de Repositories

```
Repositories/
├── Interfaces/
│   ├── IRepository.cs               # Interface genérica
│   ├── IUserRepository.cs
│   ├── ICategoryRepository.cs
│   ├── IGroupRepository.cs
│   ├── IGroupMemberRepository.cs
│   ├── IGroupRoleRepository.cs
│   ├── IBankRepository.cs
│   ├── IBankAccountRepository.cs
│   ├── ITransactionRepository.cs
│   └── IExportJobRepository.cs
└── [Implementações]
```

### IRepository<T>

Interface genérica para operações CRUD padrão:

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

### Repositories Específicos

#### IUserRepository / UserRepository

**Métodos**:
- `GetByEmailAsync(string email)`
- `GetByUsernameAsync(string username)`
- `GetByOAuthProviderAsync(string provider, string providerId)`
- `GetByEmailConfirmationTokenAsync(string token)`
- `GetByPasswordResetTokenAsync(string token)`

#### ICategoryRepository / CategoryRepository

**Métodos**:
- `GetAllByUserIdAsync(Guid userId)`
- `GetAllByGroupIdAsync(Guid groupId)`
- `GetByNameAsync(string name, Guid? userId, Guid? groupId)`

#### IGroupRepository / GroupRepository

**Métodos**:
- `GetGroupsByUserIdAsync(Guid userId)`: Retorna grupos que o usuário é membro
- `GetGroupWithMembersAsync(Guid groupId)`: Inclui navegação de membros

#### IGroupMemberRepository / GroupMemberRepository

**Métodos**:
- `GetByGroupAndUserAsync(Guid groupId, Guid userId)`
- `GetMembersByGroupIdAsync(Guid groupId)`
- `IsUserMemberAsync(Guid groupId, Guid userId)`
- `GetUserRoleInGroupAsync(Guid groupId, Guid userId)`

#### IBankAccountRepository / BankAccountRepository

**Métodos**:
- `GetAllByUserIdAsync(Guid userId)`
- `GetByIdWithBankAsync(Guid id)`: Inclui navegação de banco

#### IBankRepository / BankRepository

**Métodos**:
- `GetByBankCodeAsync(string bankCode)`
- `GetAllActiveAsync()`

#### ITransactionRepository / TransactionRepository

**Métodos**:
- `GetByUserAsync(Guid userId, DateTime? from, DateTime? to)`
- `GetByGroupAsync(Guid groupId, DateTime? from, DateTime? to)`
- `GetByIdAsync(Guid id, Guid userId)`
- `AddAsync(Transaction)`, `AddRangeAsync(IEnumerable<Transaction>)`
- `UpdateAsync(Transaction)`, `DeleteAsync(Transaction)`
- `GetSimilarByDescriptionAsync(Guid userId, string description, int take)` (usado pela sugestão de categoria)

#### IExportJobRepository / ExportJobRepository

**Métodos**:
- `AddAsync(ExportJob)`
- `GetByIdAsync(Guid jobId, Guid userId)`
- `GetPendingAsync()` (consumido pelo `ExportBackgroundService`)
- `UpdateAsync(ExportJob)`

---

## Controllers

Os **Controllers** são responsáveis por receber requisições HTTP, validar entrada e delegar para os Services.

### Estrutura de Controllers

```
Controllers/
├── Auth/
│   └── AuthController.cs
├── User/
│   └── UserController.cs
├── Category/
│   └── CategoryController.cs
├── Group/
│   └── GroupController.cs
├── BankAccount/
│   └── BankAccountController.cs
├── Bank/
│   └── BankController.cs
├── Transaction/
│   └── TransactionController.cs
├── Dashboard/
│   └── DashboardController.cs
└── ExportJob/
    └── ExportController.cs
```

### Padrão de Controllers

Todos os controllers seguem o padrão:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{
    private readonly IExampleService _service;

    public ExampleController(IExampleService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }
}
```

### Autorização

Endpoints protegidos utilizam `[Authorize]`:

```csharp
[Authorize]
[HttpGet("me")]
public async Task<IActionResult> GetProfile()
{
    var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
    var profile = await _service.GetProfileAsync(userId);
    return Ok(profile);
}
```

---

## Modelos de Dados

### User

**Localização**: `orbees-api/Models/User.cs`

```csharp
public class User : AuditableEntity
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Fullname { get; set; }
    public string Username { get; set; }
    public string? PasswordHash { get; set; }           // Nullable para OAuth
    public bool EmailConfirmed { get; set; }
    public string? EmailConfirmationToken { get; set; }
    public DateTime? EmailConfirmationExpiresAt { get; set; }
    public string? PwdResetToken { get; set; }
    public DateTime? PwdResetExpiresAt { get; set; }
    public string? OAuthProvider { get; set; }
    public string? OAuthProviderId { get; set; }
    public bool IsActive { get; set; }
    public string? ProfilePicturePath { get; set; }

    // Relacionamentos
    public ICollection<BankAccount> BankAccounts { get; set; }
    public ICollection<Category> Categories { get; set; }
    public ICollection<UserRole> UserRoles { get; set; }
    public ICollection<GroupMember> GroupMembers { get; set; }
}
```

### Category

```csharp
public class Category : AuditableEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Icon { get; set; }
    public string Color { get; set; }
    public Guid? UserId { get; set; }      // Categoria pessoal
    public Guid? GroupId { get; set; }     // Categoria de grupo
    public bool IsActive { get; set; }

    public User? User { get; set; }
    public Group? Group { get; set; }
}
```

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

### GroupMember

```csharp
public class GroupMember : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid GroupId { get; set; }
    public Guid UserId { get; set; }
    public int GroupRoleId { get; set; }
    public bool IsActive { get; set; }
    public DateTime? LeftAt { get; set; }
    public DateTime? PromotedAt { get; set; }

    public Group Group { get; set; }
    public User User { get; set; }
    public GroupRole GroupRole { get; set; }
}
```

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

### Bank

```csharp
public class Bank
{
    public int Id { get; set; }
    public string BankName { get; set; }
    public string BankCode { get; set; }           // Código COMPE
    public string Ispb { get; set; }
    public string? CsvHeaderSignature { get; set; }
    public bool IsActive { get; set; }

    public ICollection<BankAccount> BankAccounts { get; set; }
}
```

### Transaction

**Localização**: `orbees-api/Models/Transaction.cs`

```csharp
public class Transaction : AuditableEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? OriginalDescription { get; set; }    // Vinda do extrato OFX/CSV
    public string? Description { get; set; }            // Editável pelo usuário
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
    public TransactionType Type { get; set; }           // Receita | Despesa
    public TransactionOrigin Origin { get; set; }       // Manual | OFX | CSV
    public string? MerchantDocument { get; set; }
    public bool IsActive { get; set; } = true;
    public bool GroupLinkActive { get; set; } = true;   // Bloqueia edição de GroupCategoryId

    public Guid UserId { get; set; }
    public User User { get; set; }

    public Guid? BankAccountId { get; set; }
    public BankAccount? BankAccount { get; set; }

    public Guid? CategoryId { get; set; }               // Categoria pessoal
    public Category? Category { get; set; }

    public Guid? GroupCategoryId { get; set; }          // Categoria do grupo
    public Category? GroupCategory { get; set; }

    public Guid? GroupId { get; set; }
    public Group? Group { get; set; }
}
```

### ExportJob

**Localização**: `orbees-api/Models/ExportJob.cs`

```csharp
public class ExportJob : AuditableEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public ExportFormat Format { get; set; }            // CSV | Excel | PDF
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public ExportJobStatus Status { get; set; } = ExportJobStatus.Pending;
    public string? FilePath { get; set; }               // Definido após geração
    public string? ErrorMessage { get; set; }

    public User User { get; set; }
}
```

### Enums

**Localização**: `orbees-api/Models/Enums/`

```csharp
public enum TransactionType    { Receita, Despesa }
public enum TransactionOrigin  { Manual, OFX, CSV }
public enum ExportFormat       { CSV, Excel, PDF }
public enum ExportJobStatus    { Pending, Processing, Completed, Failed }
```

### AuditableEntity

**Localização**: `orbees-api/Models/Common/AuditableEntity.cs`

Classe base para auditoria automática:

```csharp
public abstract class AuditableEntity
{
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
```

Atualizada automaticamente no `ApiDbContext.SaveChangesAsync()` (linhas 24-38).

---

## Validações

O projeto utiliza **FluentValidation** para validação declarativa de DTOs.

### Estrutura de Validators

```
Validators/
├── User/
│   ├── UserCreateDtoValidator.cs
│   ├── UserUpdateDtoValidator.cs
│   └── UserUpdatePasswordDtoValidator.cs
├── Category/
│   ├── CategoryCreateDtoValidator.cs
│   └── CategoryUpdateDtoValidator.cs
├── Group/
│   ├── GroupCreateDtoValidator.cs
│   └── GroupUpdateDtoValidator.cs
├── BankAccount/
│   ├── BankAccountCreateDtoValidator.cs
│   └── BankAccountUpdateDtoValidator.cs
├── GroupMember/
│   ├── GroupMemberCreateDtoValidator.cs
│   └── GroupMemberUpdateDtoValidator.cs
└── Transaction/
    ├── TransactionCreateDtoValidator.cs
    ├── TransactionBulkCreateDtoValidator.cs
    ├── TransactionImportDtoValidator.cs
    └── TransactionUpdateDtoValidator.cs
```

### Regras dos Validators de Transação

| Validator | Regras-chave |
|-----------|--------------|
| `TransactionCreateDtoValidator` | Title (2..256), Description ≤ 512, Amount ≠ 0 e > 0, TransactionDate ≤ UtcNow, Type em enum, MerchantDocument ≤ 18, `GroupCategoryId` obrigatório quando `GroupId != null` |
| `TransactionBulkCreateDtoValidator` | Lista não vazia, máx **100** itens, valida cada item com o validator de criação |
| `TransactionImportDtoValidator` | Lista não vazia, máx **500** itens, Title obrigatório/≤256, Amount ≠ 0, TransactionDate obrigatória, `GroupCategoryId` obrigatório se `GroupId != null` |
| `TransactionUpdateDtoValidator` | Title (2..256) quando informado, Description ≤ 512 quando informado, `GroupCategoryId` obrigatório quando `GroupId != null` |

### Exemplo de Validador

```csharp
public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
{
    public UserCreateDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email é obrigatório")
            .EmailAddress().WithMessage("Email inválido");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Senha é obrigatória")
            .MinimumLength(8).WithMessage("Senha deve ter no mínimo 8 caracteres");

        RuleFor(x => x.Fullname)
            .NotEmpty().WithMessage("Nome completo é obrigatório")
            .MaximumLength(100);
    }
}
```

Validadores são executados automaticamente antes de chamar o controller action.

---

## Endpoints da API

### Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/register` | Registra novo usuário | Não |
| POST | `/login` | Login com email/senha | Não |
| GET | `/confirm-email?token={token}` | Confirma email | Não |
| POST | `/forgot-password` | Solicita recuperação de senha | Não |
| POST | `/reset-password` | Redefine senha | Não |
| GET | `/google` | Inicia OAuth Google | Não |
| GET | `/google/callback` | Callback do Google | Não |

### Perfil (`/api/user`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/me` | Obtém perfil atual | Sim |
| PUT | `/me` | Atualiza perfil | Sim |
| PUT | `/me/password` | Altera senha | Sim |
| DELETE | `/me` | Desativa conta | Sim |
| PUT | `/me/picture` | Upload de foto | Sim |
| DELETE | `/me/picture/delete` | Remove foto | Sim |

### Categorias (`/api/categories`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Lista categorias | Sim |
| GET | `/{id}` | Obtém categoria | Sim |
| POST | `/` | Cria categoria | Sim |
| PUT | `/{id}` | Atualiza categoria | Sim |
| DELETE | `/{id}` | Deleta categoria | Sim |

**Query Params**:
- `groupId` (opcional): Filtra categorias de um grupo específico

### Grupos (`/api/groups`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Lista meus grupos | Sim |
| GET | `/{groupId}` | Obtém grupo específico | Sim |
| GET | `/{groupId}/members` | Lista membros | Sim |
| POST | `/` | Cria grupo | Sim |
| PUT | `/{groupId}` | Atualiza grupo | Sim |
| DELETE | `/{groupId}` | Deleta grupo | Sim |
| POST | `/{groupId}/members` | Adiciona membro | Sim (Admin) |
| PUT | `/{groupId}/members/{id}/role` | Altera role | Sim (Admin) |
| DELETE | `/{groupId}/members/{id}` | Remove membro | Sim (Admin) |
| DELETE | `/{groupId}/leave` | Sai do grupo | Sim |
| GET | `/roles` | Lista roles disponíveis | Sim |

### Contas Bancárias (`/api/bank-accounts`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Lista minhas contas | Sim |
| GET | `/{id}` | Obtém conta | Sim |
| POST | `/` | Cria conta | Sim |
| PUT | `/{id}` | Atualiza conta | Sim |
| DELETE | `/{id}` | Deleta conta | Sim |

### Bancos (`/api/banks`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Lista bancos disponíveis | Não |

### Transações (`/api/transactions`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/?from&to` | Lista transações do usuário no período | Sim |
| GET | `/group/{groupId}?from&to` | Lista transações de um grupo (membership obrigatória) | Sim |
| GET | `/{id}` | Obtém transação por id (escopo do usuário) | Sim |
| POST | `/` | Cria transação manual | Sim |
| POST | `/bulk` | Cria várias transações (máx 100) | Sim |
| POST | `/preview/ofx` | Faz parse de OFX (multipart) e retorna preview com sugestão de categoria | Sim |
| POST | `/preview/csv/{bankId}` | Faz parse de CSV do banco informado e retorna preview | Sim |
| POST | `/import` | Persiste lote vindo do preview (`Origin = OFX`, máx 500) | Sim |
| PUT | `/{id}` | Atualiza Title/Description/CategoryId/GroupCategoryId/GroupId | Sim |
| DELETE | `/{id}` | Remove transação | Sim |

**Query Params** (`GET /` e `GET /group/{groupId}`):
- `from` (opcional): data inicial do período (ISO 8601)
- `to` (opcional): data final do período (ISO 8601)

### Dashboard (`/api/dashboard`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/self?from&to` | Dashboard pessoal do período (default = mês corrente) | Sim |
| GET | `/self/last-transactions` | Últimas 5 transações (Amount invertido para despesas) | Sim |

**Resposta de `/self`** (`DashboardResponseDto`):
- `summary`: totais (Balance, TotalIncome, TotalExpenses) com variações `%` e `topCategory`
- `insights`: lista de mensagens (média diária, top 3 categorias, alerta de inatividade)
- `revenueVsExpensesChart`: série semanal ou mensal conforme intervalo
- `expensesByCategoryChart`: top 10 categorias com `%` (inclui "Sem categoria")
- `availableMonths`: lista `"yyyy-MM"` com meses do histórico
- `periodStart`, `periodEnd`: limites do período usado

### Exportação (`/api/transactions/export`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/?format&from&to` | Exporta direto (≤100 tx) ou retorna 202 com `jobId` (assíncrono) | Sim |
| GET | `/{jobId}/status` | Status do job (Pending/Processing/Completed/Failed) + `downloadUrl` quando pronto | Sim |
| GET | `/{jobId}/download` | Download do arquivo (somente quando `Status == Completed`) | Sim |

**Query Params** (`GET /`):
- `format`: `CSV` | `Excel` | `PDF` (obrigatório)
- `from`, `to`: período (opcional)

**Comportamento**:
- Se `transactions.Count ≤ 100` (`BackgroundThreshold`), o arquivo é gerado em memória e retornado direto (200).
- Acima do limite, um `ExportJob` é enfileirado e o controller responde `202 Accepted` com `{ message, jobId }`. O `ExportBackgroundService` processa em loop a cada 10s e grava o arquivo em `exports/{userId}/{jobId}_{fileName}`.

---

## Configuração e Instalação

### Pré-requisitos

- Docker & Docker Compose
- .NET SDK 8.0 (para desenvolvimento local)
- Node.js 18+ (para frontend)
- PostgreSQL 14+ (se não usar Docker)

### Instalação com Docker (Recomendado)

1. Clone o repositório:

```bash
git clone https://github.com/TheRermz/orbees.git
cd orbees
```

2. Configure as variáveis de ambiente:

```bash
# Backend
cd orbees-api
cp .env.example .env
# Edite o .env com suas configurações

# Frontend
cd ../orbees-frontend
cp .env.example .env
# Edite o .env com a URL da API
```

3. Suba os containers:

```bash
# Retorne à raiz do projeto
cd ..

# Ambiente de desenvolvimento
docker-compose -f docker-compose.development.yml up -d
```

4. Acesse:
- API: `http://localhost:5210`
- Frontend: `http://localhost:5173`
- Swagger: `http://localhost:5210/swagger`
- Mailpit: `http://localhost:8025`

### Instalação Local (Sem Docker)

1. Configure o PostgreSQL localmente

2. Backend:

```bash
cd orbees-api
cp .env.example .env
# Configure a connection string no .env
dotnet restore
dotnet ef database update
dotnet run
```

3. Frontend:

```bash
cd orbees-frontend
npm install
npm run dev
```

---

## Variáveis de Ambiente

### Backend (.env)

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=orbees

# Application
API_PORT=5210
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET_KEY=your-very-secure-secret-key-change-this
JWT_ISSUER=orbees-api
JWT_AUDIENCE=orbees-frontend

# OAuth Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USER=user
MAIL_PASSWORD=password
MAIL_FROM=noreply@orbees.com

# Debug
SEED_DB=false
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:5210
```

---

## Docker

### Serviços

O projeto utiliza 4 serviços principais:

#### 1. PostgreSQL (`db`)
- **Imagem**: `postgres:14`
- **Porta**: `5432`
- **Volume**: `pgdata` (persistente)
- **Variáveis**: Configuradas via `docker-compose`

#### 2. API ASP.NET Core (`api`)
- **Build**: `Dockerfile.dev`
- **Porta**: `5210`
- **Volumes**: Code mounting para hot reload
- **Depende**: `db`

#### 3. React Frontend (`webapp`)
- **Build**: `Dockerfile.dev`
- **Porta**: `5173`
- **Volumes**: Code mounting
- **Depende**: `api`

#### 4. Mailpit (`mailpit`)
- **Imagem**: `axllent/mailpit`
- **Portas**:
  - `1025`: SMTP
  - `8025`: Interface web
- **Finalidade**: Captura emails em desenvolvimento

### Comandos Docker

```bash
# Subir ambiente
docker-compose -f docker-compose.development.yml up -d

# Ver logs
docker-compose -f docker-compose.development.yml logs -f api

# Reconstruir imagens
docker-compose -f docker-compose.development.yml up -d --build

# Parar ambiente
docker-compose -f docker-compose.development.yml down

# Limpar volumes (CUIDADO: apaga dados)
docker-compose -f docker-compose.development.yml down -v
```

---

## Banco de Dados

### Migrations

O projeto possui 11 migrations aplicadas:

| Migration | Data | Descrição |
|-----------|------|-----------|
| `InitialCreate` | 2026-03-26 | Schema inicial |
| `AddProfilePicture` | 2026-03-26 | Foto de perfil |
| `AddCategoriasBancoseContas` | 2026-03-27 | Categorias e bancos |
| `RolesandSeed` | 2026-03-27 | Sistema de roles |
| `PadronizaCampos` | 2026-03-27 | Padronização |
| `AjustaCampoEAdicionaSeed` | 2026-03-27 | Ajustes e seeds |
| `AddGroups` | 2026-04-04 | Sistema de grupos |
| `AdicionaPromotedAtGroupMember` | 2026-04-07 | Campo PromotedAt |
| `AdicionaCampoGroupId` | 2026-04-07 | GroupId em Category |
| `AddTransactions` | 2026-04-21 | Tabela `Transactions` + enums Type/Origin |
| `AddExportJobs` | 2026-05-22 | Tabela `ExportJobs` + enums Format/Status |

### Aplicar Migrations

```bash
# Localmente
dotnet ef database update

# Docker (automático no startup)
# Configurado em Program.cs linhas 147-152
```

### Criar Nova Migration

```bash
dotnet ef migrations add NomeDaMigration
```

### Seeds

**Localização**: `orbees-api/Data/Seeds/`

Seeds executados automaticamente no startup (via `DefaultSeeder.SeedAsync()`):

- **AdminSeeder**: Cria usuário admin padrão
- **RoleSeeder**: Cria roles globais (Admin, User)
- **GroupRoleSeeder**: Cria roles de grupo (Admin, Member)
- **BankSeeder**: Popula bancos brasileiros
- **CategorySeeder**: Categorias padrão
- **DebugUserSeeder**: Usuários e dados de teste (executa apenas se `SEED_DB=true`)

---

## Autenticação e Autorização

### JWT (JSON Web Tokens)

**Configuração**: `Program.cs` linhas 77-121

#### Fluxo de Autenticação

1. Usuário faz login via `/api/auth/login`
2. API valida credenciais
3. `TokenService` gera JWT com claims:
   - `NameIdentifier`: UserId
   - `Email`: Email do usuário
   - `Role`: Roles do usuário
4. Cliente armazena token
5. Requisições subsequentes incluem header:
   ```
   Authorization: Bearer {token}
   ```

#### Configuração JWT

```csharp
ValidateIssuer = true                    // Valida emissor
ValidateAudience = true                  // Valida audiência
ValidateLifetime = true                  // Valida expiração
ValidateIssuerSigningKey = true          // Valida assinatura
ValidIssuer = JWT_ISSUER
ValidAudience = JWT_AUDIENCE
IssuerSigningKey = SymmetricSecurityKey
```

### OAuth Google

**Configuração**: `Program.cs` linhas 113-119

#### Fluxo OAuth

1. Usuário clica em "Login com Google"
2. Redireciona para `/api/auth/google`
3. Google autentica usuário
4. Callback em `/api/auth/google/callback`
5. `AuthOAuthService` processa claims:
   - Se usuário existe: faz login
   - Se não existe: cria conta automaticamente
6. Retorna JWT

### Autorização

Utiliza `[Authorize]` e claims do JWT:

```csharp
[Authorize]  // Requer autenticação
public async Task<IActionResult> GetProfile()
{
    var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
    // ...
}
```

#### Autorização por Role

```csharp
[Authorize(Roles = "Admin")]
public async Task<IActionResult> AdminOnlyEndpoint()
{
    // ...
}
```

---

## Padrões de Projeto

### Repository Pattern

Abstrai acesso a dados, permitindo trocar implementação sem afetar services.

**Benefícios**:
- Testabilidade (mocking fácil)
- Separação de responsabilidades
- Queries centralizadas

### Service Layer Pattern

Centraliza lógica de negócio, mantendo controllers finos.

**Benefícios**:
- Reutilização de lógica
- Facilita testes unitários
- Separação clara de camadas

### Dependency Injection

Inverte controle de dependências, facilitando testes e manutenção.

**Benefícios**:
- Baixo acoplamento
- Testabilidade
- Flexibilidade

### DTO Pattern

Objetos de transferência para separar modelos de banco de DTOs de API.

**Benefícios**:
- Evita over-posting
- Controle sobre dados expostos
- Validação de entrada

### Fluent Validation

Validação declarativa e reutilizável.

**Benefícios**:
- Validações centralizadas
- Mensagens customizadas
- Separação de concerns

---

## Roadmap

### Concluído Recentemente

- [x] Importação de extratos OFX (preview + import com sugestão de categoria)
- [x] Importação de extratos CSV (Nubank funcional; demais bancos pendentes)
- [x] Dashboard de análise financeira (totais, variações, insights, gráficos)
- [x] Transações manuais (CRUD individual + lote até 100)
- [x] Relatórios em PDF (QuestPDF), Excel (ClosedXML) e CSV
- [x] Exportação de dados síncrona e assíncrona (BackgroundService com polling)

### Em Desenvolvimento

- [ ] Implementação completa do frontend

### Próximas Features

- [ ] Gráficos e visualizações adicionais no frontend
- [ ] Metas financeiras
- [ ] Notificações de alertas
- [ ] Módulo de educação financeira
- [ ] API de terceiros (Open Banking)
- [ ] Compartilhamento de relatórios exportados

### Melhorias Técnicas

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] CI/CD pipeline
- [ ] Logs estruturados avançados
- [ ] Cache com Redis
- [ ] Rate limiting
- [ ] Healthchecks

---

## Licença

Este projeto é parte de um **Trabalho de Conclusão de Curso (TCC)** e não possui licença para uso ou contribuição externa no momento.

---

## Contato

**Repositório**: [https://github.com/TheRermz/orbees](https://github.com/TheRermz/orbees)

---

**Desenvolvido com .NET 8.0, React 19 e PostgreSQL**
