# Módulo de Educação Financeira — Orbees

O módulo de Educação Financeira foi desenvolvido para auxiliar usuários a desenvolver habilidades de gestão financeira pessoal através de conteúdo educativo interativo e calculadoras práticas.

---

## Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Módulo](#estrutura-do-módulo)
- [Trilha de Aprendizado](#trilha-de-aprendizado)
- [Fundamentos](#fundamentos)
- [Direitos e Tributos](#direitos-e-tributos)
- [Calculadoras Financeiras](#calculadoras-financeiras)
- [Componentes Compartilhados](#componentes-compartilhados)

---

## Visão Geral

O módulo de Educação Financeira é 100% frontend, sem persistência de dados. Todos os cálculos são realizados client-side em JavaScript/TypeScript.

**Objetivos pedagógicos:**

1. **Alfabetização financeira básica**: Ensinar conceitos fundamentais como orçamento, juros, poupança
2. **Empoderamento legal**: Informar sobre direitos trabalhistas e obrigações tributárias
3. **Ferramentas práticas**: Fornecer calculadoras para decisões financeiras do dia a dia

**Público-alvo:**
- Adultos em início de vida financeira independente
- Pessoas buscando organizar suas finanças pessoais
- Usuários que desejam entender melhor direitos trabalhistas e impostos

---

## Estrutura do Módulo

```
src/pages/Education/
├── Home/                           # Página inicial da trilha
│   ├── EducationHomePage.tsx
│   └── EducationHomePage.styles.ts
│
├── Fundamentals/                   # Conceitos básicos
│   ├── FundamentalsPage.tsx
│   └── FundamentalsPage.styles.ts
│
├── Law/                            # Direitos e tributos
│   ├── LawPage.tsx
│   └── LawPage.styles.ts
│
└── Calculators/                    # 7 calculadoras
    ├── CalculatorsPage.tsx
    ├── CalculatorsPage.styles.ts
    ├── JurosSimplesCalculator.tsx
    ├── JurosCompostosCalculator.tsx
    ├── FeriasCltCalculator.tsx
    ├── CustoParcelamentoCalculator.tsx
    ├── MetasPoupancaCalculator.tsx
    ├── QuitacaoDividasCalculator.tsx
    └── SimuladorIrpfCalculator.tsx

src/components/Education/
├── EducationHeroBanner/           # Banner principal da home
├── EducationStatCard/             # Cards de estatísticas
├── EducationTrailStep/            # Steps da trilha de aprendizado
├── EducationWhyCard/              # Cards "Por que aprender?"
├── PillarCard/                    # Cards dos 4 pilares
├── Rule502030/                    # Visualização da regra 50-30-20
├── CompoundInterest/              # Calculadora de juros compostos
├── FundamentalsAccordion/         # Accordion de fundamentos
├── CalloutBox/                    # Caixas de destaque
├── LawCalloutBox/                 # Caixas de destaque (Law)
├── LawAccordionContent/           # Accordion de direitos/tributos
├── CltContent/                    # Conteúdo CLT
├── HoleriteContent/               # Conteúdo Holerite
└── IrpfContent/                   # Conteúdo IRPF
```

---

## Trilha de Aprendizado

### Rota: `/education/home`

**Componente**: `EducationHomePage`

**Estrutura da página:**

1. **Hero Banner**
   - Título principal: "Domine Suas Finanças"
   - Subtítulo motivacional
   - CTA: "Começar a Aprender"

2. **Estatísticas Motivacionais** (4 cards)
   - "76% dos brasileiros não controlam suas finanças"
   - "Organize suas finanças em 4 passos"
   - "7 calculadoras práticas disponíveis"
   - "100% gratuito e sem anúncios"

3. **Trilha de Aprendizado** (4 etapas)
   - **Etapa 1**: Fundamentos (`/education/fundamentals`)
     - Ícone: 📚
     - Duração estimada: ~15 min
     - Tópicos: 4 pilares, regra 50-30-20, juros
   - **Etapa 2**: Direitos e Tributos (`/education/law`)
     - Ícone: ⚖️
     - Duração estimada: ~20 min
     - Tópicos: CLT, holerite, IRPF
   - **Etapa 3**: Calculadoras (`/education/calculators`)
     - Ícone: 🧮
     - 7 ferramentas práticas
   - **Etapa 4**: Investimentos (futuro)
     - Ícone: 📈
     - Status: Em breve

4. **Por que aprender?** (4 cards)
   - Controle financeiro
   - Redução de dívidas
   - Planejamento do futuro
   - Conhecimento de direitos

---

## Fundamentos

### Rota: `/education/fundamentals`

**Componente**: `FundamentalsPage`

### Conteúdo

#### 1. Os 4 Pilares da Educação Financeira

**Componente**: `PillarCard`

**Pilares:**

1. **Ganhar**
   - Ícone: 💰
   - Descrição: "Sua renda é a base de tudo. Busque aumentá-la através de qualificação, empreendedorismo ou fontes passivas."
   - Dicas:
     - Invista em capacitação profissional
     - Diversifique fontes de renda
     - Considere renda passiva (aluguéis, dividendos)

2. **Poupar**
   - Ícone: 🏦
   - Descrição: "Guarde parte do que você ganha. A regra básica é poupar ao menos 10% da renda mensal."
   - Dicas:
     - Pague-se primeiro (reserve antes de gastar)
     - Crie uma reserva de emergência (6 meses de despesas)
     - Automatize a poupança

3. **Gastar**
   - Ícone: 🛒
   - Descrição: "Gaste conscientemente. Diferencie necessidades de desejos e evite gastos impulsivos."
   - Dicas:
     - Faça orçamento mensal
     - Espere 48h antes de compras não planejadas
     - Compare preços

4. **Investir**
   - Ícone: 📈
   - Descrição: "Faça seu dinheiro trabalhar para você. Invista de forma inteligente e diversificada."
   - Dicas:
     - Estude antes de investir
     - Diversifique investimentos
     - Pense no longo prazo

#### 2. Regra 50-30-20

**Componente**: `Rule502030`

**Distribuição ideal da renda:**

- **50% Essenciais**: Moradia, alimentação, transporte, saúde, educação
- **30% Estilo de vida**: Lazer, hobbies, restaurantes, streaming, viagens
- **20% Prioridades financeiras**: Poupança, investimentos, quitação de dívidas

**Visualização**: Gráfico de pizza interativo mostrando a distribuição com exemplos para cada categoria.

**Exemplo prático** (salário de R$ 3.000):
- R$ 1.500 → Essenciais
- R$ 900 → Estilo de vida
- R$ 600 → Poupança/Investimentos

#### 3. Juros Simples vs Compostos

**Componente**: `CompoundInterestCalculator`

**Explicação pedagógica:**

**Juros Simples:**
- Incidem apenas sobre o valor inicial (capital)
- Fórmula: `J = C × i × t`
- Exemplo: R$ 1.000 a 5% a.m. por 12 meses = R$ 600 de juros

**Juros Compostos:**
- Incidem sobre o montante acumulado (capital + juros anteriores)
- Fórmula: `M = C × (1 + i)^t`
- Exemplo: R$ 1.000 a 5% a.m. por 12 meses = R$ 795,86 de juros

**Calculadora interativa:**
- Inputs: Capital inicial, taxa de juros, período
- Output: Gráfico comparativo de evolução ao longo do tempo
- Tabela com valores mês a mês

#### 4. Orçamento Pessoal

**Componente**: `FundamentalsAccordion`

**Tópicos:**

1. **Como fazer um orçamento**
   - Liste todas as fontes de renda
   - Liste todas as despesas fixas
   - Liste despesas variáveis médias
   - Categorize gastos
   - Identifique onde cortar

2. **Ferramentas de orçamento**
   - Planilhas (Excel/Google Sheets)
   - Apps de finanças (como o Orbees!)
   - Caderno físico (método envelope)

3. **Dicas para manter o orçamento**
   - Registre TODAS as despesas
   - Revise semanalmente
   - Ajuste conforme necessário
   - Seja realista

---

## Direitos e Tributos

### Rota: `/education/law`

**Componente**: `LawPage`

### Conteúdo

#### 1. CLT — Consolidação das Leis do Trabalho

**Componente**: `CltContent`

**Tópicos abordados:**

**Direitos básicos do trabalhador CLT:**

1. **Jornada de trabalho**
   - 44 horas semanais (8h/dia + 4h no sábado) ou 8h20min/dia em 5 dias
   - Hora extra: mínimo 50% adicional (dias úteis) ou 100% (domingos/feriados)
   - Intervalo mínimo: 1h (jornadas acima de 6h)

2. **Férias**
   - 30 dias corridos após 12 meses trabalhados
   - Direito a 1/3 adicional sobre o salário
   - Pode dividir em até 3 períodos (sendo 1 de no mínimo 14 dias)
   - Venda de até 10 dias (abono pecuniário)

3. **13º Salário**
   - Pago em 2 parcelas (até 30/11 e 20/12)
   - Proporcional aos meses trabalhados
   - Calculado sobre salário + adicionais (noturno, periculosidade, insalubridade)

4. **FGTS**
   - 8% do salário depositado mensalmente
   - Pode sacar em: demissão sem justa causa, compra de imóvel, doenças graves, aposentadoria

5. **Aviso prévio**
   - 30 dias mínimo
   - +3 dias por ano trabalhado (máximo 90 dias)
   - Pode trabalhar ou receber indenizado

6. **Rescisão**
   - **Sem justa causa**: FGTS + 40% multa, saldo salário, férias, 13º, aviso prévio
   - **Com justa causa**: apenas saldo salário
   - **Pedido de demissão**: saldo salário, férias vencidas, 13º proporcional (sem FGTS e multa)

#### 2. Como Ler o Holerite

**Componente**: `HoleriteContent`

**Seções do holerite explicadas:**

**Cabeçalho:**
- Dados da empresa (CNPJ, razão social)
- Dados do empregado (CPF, cargo, departamento)
- Período de referência

**Proventos (ganhos):**
- **Salário base**: valor contratado
- **Horas extras**: quantidade × valor
- **Adicional noturno**: 20% sobre hora trabalhada entre 22h-5h
- **Adicional de insalubridade**: 10%, 20% ou 40% do salário mínimo
- **Adicional de periculosidade**: 30% do salário base
- **Comissões**: vendas, produtividade
- **DSR sobre horas extras**: repouso sobre extras

**Descontos:**
- **INSS**: 7,5% a 14% (tabela progressiva)
- **IRRF**: 0% a 27,5% (tabela progressiva com dedução)
- **Vale transporte**: máximo 6% do salário
- **Vale refeição/alimentação**: conforme acordo
- **Plano de saúde**: conforme contrato
- **Contribuição sindical**: se autorizado
- **Pensão alimentícia**: se houver

**Líquido:**
- Proventos totais - Descontos totais = Valor a receber

**Exemplo prático de holerite:**

```
PROVENTOS:
Salário base:              R$ 3.000,00
Horas extras (10h):        R$   225,00
DSR s/ horas extras:       R$    37,50
──────────────────────────────────────
Total de proventos:        R$ 3.262,50

DESCONTOS:
INSS (11%):                R$   358,87
IRRF (7,5%):               R$    91,97
Vale transporte (6%):      R$   180,00
Vale refeição:             R$   110,00
──────────────────────────────────────
Total de descontos:        R$   740,84

LÍQUIDO A RECEBER:         R$ 2.521,66
```

#### 3. IRPF — Imposto de Renda Pessoa Física

**Componente**: `IrpfContent`

**Tabela Progressiva 2026** (valores atualizados):

| Base de cálculo (mensal) | Alíquota | Dedução |
|--------------------------|----------|---------|
| Até R$ 2.259,20 | Isento | R$ 0,00 |
| De R$ 2.259,21 até R$ 2.826,65 | 7,5% | R$ 169,44 |
| De R$ 2.826,66 até R$ 3.751,05 | 15% | R$ 381,44 |
| De R$ 3.751,06 até R$ 4.664,68 | 22,5% | R$ 662,77 |
| Acima de R$ 4.664,68 | 27,5% | R$ 896,00 |

**Deduções permitidas:**

- Dependentes: R$ 189,59 por dependente
- INSS: valor total descontado
- Pensão alimentícia: valor total pago (judicial)
- Saúde: sem limite (despesas próprias e dependentes)
- Educação: até R$ 3.561,50 por pessoa/ano

**Exemplo de cálculo:**

Salário: R$ 5.000,00
- Base: R$ 5.000,00
- INSS (14%): R$ 700,00
- Base após INSS: R$ 4.300,00
- Faixa: 22,5% (R$ 3.751,06 a R$ 4.664,68)
- Cálculo: (R$ 4.300,00 × 22,5%) - R$ 662,77 = R$ 304,73
- **IRRF a pagar: R$ 304,73**

**Declaração anual:**

Obrigatória se:
- Rendimentos tributáveis > R$ 30.639,90/ano
- Rendimentos isentos > R$ 200.000,00
- Possui bens/direitos > R$ 800.000,00
- Operações em bolsa de valores
- Passou a residir no Brasil em 2025

**Prazo**: 15 de março a 31 de maio de cada ano

---

## Calculadoras Financeiras

### Rota: `/education/calculators`

**Componente**: `CalculatorsPage`

Layout: Grid de cards, cada card leva para uma calculadora específica.

### 1. Calculadora de Juros Simples

**Componente**: `JurosSimplesCalculator`

**Fórmula**: `J = C × i × t`

**Inputs:**
- Capital inicial (R$)
- Taxa de juros (% ao mês ou ano)
- Período (meses ou anos)

**Outputs:**
- Juros acumulados
- Montante final
- Gráfico de evolução linear

**Exemplo de uso:**
> "Tenho R$ 5.000 aplicados a 1% a.m. em um CDB com juros simples. Quanto terei em 12 meses?"

### 2. Calculadora de Juros Compostos

**Componente**: `JurosCompostosCalculator`

**Fórmula**: `M = C × (1 + i)^t`

**Inputs:**
- Capital inicial (R$)
- Aporte mensal (R$) — opcional
- Taxa de juros (% ao mês ou ano)
- Período (meses ou anos)

**Outputs:**
- Montante final
- Total investido
- Total de juros
- Gráfico de evolução exponencial
- Tabela mês a mês (capital + juros + aportes)

**Exemplo de uso:**
> "Se eu investir R$ 1.000 iniciais + R$ 500/mês a 0,8% a.m. (CDI), quanto terei em 5 anos?"

### 3. Calculadora de Férias CLT

**Componente**: `FeriasCltCalculator`

**Fórmula**: `Férias = (Salário ÷ 12 × Meses) + (Férias × 1/3)`

**Inputs:**
- Salário bruto (R$)
- Meses trabalhados (1-12)
- Vendeu 10 dias? (checkbox)

**Outputs:**
- Valor das férias
- 1/3 constitucional
- Abono pecuniário (se vendeu 10 dias)
- Total a receber bruto
- Descontos estimados (INSS + IRRF)
- Líquido estimado

**Exemplo de uso:**
> "Ganho R$ 3.000/mês, trabalhei 12 meses. Vou vender 10 dias de férias. Quanto vou receber?"

### 4. Calculadora de Custo de Parcelamento

**Componente**: `CustoParcelamentoCalculator`

**Fórmula**: `Parcela = Valor × [(1 + i)^n × i] ÷ [(1 + i)^n - 1]` (Price)

**Inputs:**
- Valor à vista (R$)
- Taxa de juros mensal (%)
- Número de parcelas

**Outputs:**
- Valor de cada parcela
- Total a pagar
- Juros totais
- Comparação: à vista vs parcelado
- Recomendação (se juros > 2%/mês, vale pagar à vista)

**Exemplo de uso:**
> "Um produto custa R$ 1.500 à vista ou 12× de R$ 145. Vale a pena parcelar?"

### 5. Calculadora de Metas de Poupança

**Componente**: `MetasPoupancaCalculator`

**Fórmula**: `PMT = FV × [i ÷ ((1 + i)^n - 1)]`

**Inputs:**
- Meta (valor desejado) (R$)
- Prazo (meses)
- Rentabilidade esperada (% a.m.)
- Valor inicial já poupado (R$) — opcional

**Outputs:**
- Quanto poupar por mês
- Total que será investido
- Total de juros
- Gráfico de evolução da meta
- Tabela mês a mês

**Exemplo de uso:**
> "Quero juntar R$ 30.000 para comprar um carro em 3 anos. Quanto preciso guardar por mês se meu investimento rende 0,7% a.m.?"

### 6. Calculadora de Quitação de Dívidas

**Componente**: `QuitacaoDividasCalculator`

**Métodos:**

**Bola de Neve (Snowball):**
- Prioriza dívida de menor valor
- Motiva com "vitórias rápidas"
- Recomendado para quem precisa de motivação psicológica

**Avalanche:**
- Prioriza dívida de maior juros
- Matematicamente mais eficiente
- Recomendado para quem quer pagar menos juros

**Inputs:**
- Lista de dívidas (nome, valor, juros mensal, parcela mínima)
- Valor disponível para pagar dívidas por mês

**Outputs:**
- Ordem de quitação (Bola de Neve vs Avalanche)
- Tempo para quitar todas as dívidas
- Total de juros pagos em cada método
- Comparação de economia
- Recomendação

**Exemplo de uso:**
> Tenho 3 dívidas:
> - Cartão 1: R$ 2.000 a 10% a.m.
> - Cartão 2: R$ 500 a 8% a.m.
> - Empréstimo: R$ 5.000 a 3% a.m.
>
> Tenho R$ 800/mês. Qual método usar?

### 7. Simulador de IRPF

**Componente**: `SimuladorIrpfCalculator`

**Inputs:**
- Salário bruto mensal (R$)
- Número de dependentes
- Contribuição INSS (checkbox para calcular automaticamente)
- Despesas médicas mensais (R$)
- Despesas com educação mensais (R$)
- Pensão alimentícia (R$)

**Outputs:**
- Base de cálculo
- Alíquota efetiva
- IRRF mensal
- IRRF anual
- Salário líquido estimado (bruto - INSS - IRRF)
- Dicas para reduzir IR legalmente

**Exemplo de uso:**
> "Ganho R$ 8.000/mês, tenho 2 dependentes e gasto R$ 500/mês com plano de saúde. Quanto vou pagar de IR?"

---

## Componentes Compartilhados

### EducationHeroBanner

**Props:**
- `title`: string
- `subtitle`: string
- `ctaText`: string
- `ctaLink`: string

**Estilo:**
- Background gradient (laranja → amarelo)
- Tipografia grande e chamativa
- Botão CTA destacado

---

### EducationStatCard

**Props:**
- `icon`: ReactNode (ícone Lucide)
- `stat`: string (ex: "76%")
- `description`: string

**Estilo:**
- Card branco com sombra
- Ícone colorido no topo
- Estatística em destaque (font-size: xxl)
- Descrição em texto menor

---

### EducationTrailStep

**Props:**
- `step`: number (1, 2, 3, 4)
- `title`: string
- `description`: string
- `icon`: string (emoji)
- `duration`: string (ex: "~15 min")
- `link`: string
- `isLocked`: boolean (para etapa 4)

**Estilo:**
- Card horizontal com número do step à esquerda
- Título e descrição
- Botão "Começar" ou "Em breve" (se locked)
- Connector line entre steps

---

### PillarCard

**Props:**
- `icon`: string (emoji)
- `title`: string
- `description`: string
- `tips`: string[]

**Estilo:**
- Card com ícone grande no topo
- Título em destaque
- Lista de dicas com bullets

---

### Rule502030

**Props:** nenhuma (componente completo)

**Funcionalidades:**
- Gráfico de pizza com 3 fatias coloridas (50% verde, 30% azul, 20% roxo)
- Legenda explicativa
- Exemplos de gastos para cada categoria
- Input opcional para calcular com base no salário do usuário

---

### CompoundInterestCalculator

**Props:** nenhuma (componente completo)

**Funcionalidades:**
- Formulário com inputs (capital, taxa, período)
- Cálculo em tempo real
- Gráfico de linha (Recharts) mostrando evolução
- Tabela com valores mês a mês
- Comparação visual com juros simples

---

### CalloutBox / LawCalloutBox

**Props:**
- `type`: "info" | "warning" | "tip" | "important"
- `title`: string
- `children`: ReactNode

**Estilo:**
- Caixa com borda colorida conforme type
- Ícone à esquerda (ℹ️ 💡 ⚠️ ❗)
- Fundo levemente colorido

---

## Navegação no Módulo

**Barra de navegação específica do módulo:**

Quando o usuário está em qualquer página de `/education/*`, exibe uma barra secundária abaixo da barra principal:

- Início
- Fundamentos
- Direitos e Tributos
- Calculadoras

**Breadcrumbs:**

Exibe caminho: `Educação Financeira > Fundamentos`

---

## Acessibilidade

- Todos os gráficos possuem labels descritivas
- Calculadoras possuem validação de inputs
- Mensagens de erro claras
- Suporte a navegação por teclado
- Contraste adequado (WCAG AA)
- Textos alternativos em ícones

---

## Roadmap Futuro

**Etapa 4: Investimentos** (não implementado)

Conteúdo planejado:
- Tipos de investimento (renda fixa, variável, fundos)
- Tesouro Direto
- CDB, LCI, LCA
- Ações e FIIs
- Diversificação de portfólio
- Calculadora de rentabilidade de investimentos
- Simulador de aposentadoria

**Gamificação** (planejado):

- Badges ao completar cada etapa
- Quiz de conhecimento ao final de cada módulo
- Progresso salvo (requer backend)
- Metas educacionais personalizadas

---

## Tecnologias Utilizadas

- **React 19**: Framework UI
- **TypeScript**: Tipagem
- **Styled Components**: Estilização
- **Recharts**: Gráficos interativos
- **Lucide React**: Ícones
- **react-hook-form**: Validação de formulários nas calculadoras

---

## Manutenção e Atualizações

**Tabelas que requerem atualização anual:**

- Tabela de IRPF (alíquotas e deduções)
- Tabela de INSS (alíquotas)
- Salário mínimo (referências nas calculadoras)
- Valores de dedução por dependente

**Localização:** Hardcoded nos componentes. Recomenda-se criar arquivo de constantes para facilitar atualização.

**Arquivo sugerido:** `src/constants/taxTables.ts`

```typescript
export const IRPF_TABLE_2026 = [
  { min: 0, max: 2259.20, rate: 0, deduction: 0 },
  { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
  // ...
];

export const INSS_TABLE_2026 = [
  { min: 0, max: 1412.00, rate: 0.075 },
  // ...
];

export const DEDUCTION_PER_DEPENDENT = 189.59;
export const MIN_WAGE_2026 = 1412.00;
```

---

## Referências e Fontes

- Consolidação das Leis do Trabalho (CLT)
- Receita Federal do Brasil (tabelas IRPF/INSS)
- Banco Central do Brasil (dados de educação financeira)
- OCDE — Recomendações de educação financeira
