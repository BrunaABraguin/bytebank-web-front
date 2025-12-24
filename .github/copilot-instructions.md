# Instruções do GitHub Copilot - Bytebank Web Frontend

## 🏗️ Arquitetura e Estrutura do Projeto

### Padrões de Organização
- **Monorepo Structure**: Manter a estrutura de packages com separação clara de responsabilidades
- **Clean Architecture**: Implementar camadas bem definidas (presentation, domain, infrastructure)
- **Feature-First Organization**: Agrupar arquivos por funcionalidade, não por tipo
- **Barrel Exports**: Usar arquivos index.ts para exports centralizados
### 📁 Organização de Pastas (Arquitetura Modular)
```
app/
├── components/     # UI pura e apresentação
├── hooks/          # Regras de domínio e estado
├── services/       # Integração externa (APIs, storage)
├── domain/         # Modelos, regras e contratos
├── lib/            # Funções puras e utilities
└── constants/      # Configurações e constantes
```

Realize as alterações de código respeitando esta estrutura modular. Altere somente os arquivos necessários para manter a organização limpa e coerente. Pastas prioritárias para mudanças são `transactions/`, `shell/` e `dashboard/`.

## 📦 Gerenciamento de Estado

### Zustand State Management Patterns

#### Princípios Fundamentais
- **Previsibilidade**: Estado sempre rastreável e determinístico
- **Centralização**: Estado de domínio apenas na store
- **Imutabilidade**: Todas as atualizações imutáveis
- **Separação**: UI local vs Estado de domínio claramente diferenciados

#### Store de Domínio Financeiro
```typescript
interface TransactionsStore {
  // Estado
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  
  // Ações assíncronas (únicas responsáveis por mutação)
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: CreateTransaction) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
  
  // Ações síncronas internas
  clearError: () => void;
  resetStore: () => void;
}

export const useTransactionsStore = create<TransactionsStore>()(
  (set, get) => ({
    // Estado inicial
    transactions: [],
    isLoading: false,
    error: null,
    
    // Implementação do padrão assíncrono
    fetchTransactions: async () => {
      set({ isLoading: true, error: null });
      try {
        const transactions = await transactionService.getAll();
        set({ transactions, isLoading: false });
      } catch (error) {
        set({ error: error.message, isLoading: false });
      }
    },
    
    addTransaction: async (transactionData) => {
      set({ isLoading: true, error: null });
      try {
        const newTransaction = await transactionService.create(transactionData);
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
          isLoading: false
        }));
      } catch (error) {
        set({ error: error.message, isLoading: false });
      }
    },
    
    clearError: () => set({ error: null }),
    resetStore: () => set({ transactions: [], isLoading: false, error: null })
  })
);
```

#### Hooks de Acesso (Read-Only)
```typescript
// Hook apenas para leitura de transações
export function useTransactions() {
  return useTransactionsStore((state) => state.transactions);
}

// Hook apenas para leitura de loading
export function useTransactionsLoading() {
  return useTransactionsStore((state) => state.isLoading);
}

// Hook apenas para leitura de erro
export function useTransactionsError() {
  return useTransactionsStore((state) => state.error);
}
```

#### Hooks de Ações (Write-Only)
```typescript
// Hook apenas para ações
export function useTransactionsActions() {
  return useTransactionsStore((state) => ({
    fetchTransactions: state.fetchTransactions,
    addTransaction: state.addTransaction,
    updateTransaction: state.updateTransaction,
    removeTransaction: state.removeTransaction,
    clearError: state.clearError
  }));
}
```

## ⚡ Performance e Otimização

### Code Splitting
- **Lazy Loading**: Implementar React.lazy para rotas e componentes pesados
- **Dynamic Imports**: Carregar bibliotecas sob demanda
- **Bundle Analysis**: Monitorar tamanho dos bundles com turbo

### Caching Strategies
- **Zustand Selectors**: Usar seletores otimizados para evitar re-renders
- **React Query**: Cache inteligente apenas para dados externos
- **Service Worker**: Cache de assets estáticos
- **Memoization**: React.memo, useMemo, useCallback com zustand selectors

### Zustand Performance Patterns
```typescript
// ✅ Selector específico evita re-renders desnecessários
const totalBalance = useTransactionsStore((state) => 
  selectCurrentBalance(state.transactions)
);

// ✅ Multiple selectors otimizados
const { transactions, isLoading } = useTransactionsStore(
  useShallow((state) => ({
    transactions: state.transactions,
    isLoading: state.isLoading
  }))
);

// ❌ Evitar selector que retorna objeto novo sempre
const badSelector = useTransactionsStore((state) => ({
  transactions: state.transactions,
  count: state.transactions.length // Cria novo objeto a cada render
}));
```

### Exemplo de Lazy Loading
```typescript
const TransactionsTable = lazy(() => 
  import('./components/TransactionsTable').then(module => ({
    default: module.TransactionsTable
  }))
);
```

## 🔧 Padrões de Desenvolvimento

### Princípios SOLID para React

#### 🎯 Princípios Gerais
- **UI-First Components**: Componentes React focados em UI e orquestração
- **Business Logic Separation**: Lógica de negócio não deve ficar em componentes
- **Composition over Inheritance**: Preferir composição em vez de herança
- **Single Purpose**: Evitar componentes "faz-tudo"
- **Maintainability**: Código fácil de manter, estender e testar

#### 📋 SRP — Single Responsibility Principle
**Cada componente deve ter uma única responsabilidade**

❌ **Evitar componentes que fazem tudo:**
```typescript
// ❌ Componente viola SRP
function UserProfile() {
  const [user, setUser] = useState(null);
  
  // busca dados
  useEffect(() => { /* fetch user */ }, []);
  
  // processa regras
  const isAdmin = user?.role === 'admin' && user?.permissions?.includes('write');
  
  // formata valores
  const formattedDate = new Date(user?.createdAt).toLocaleDateString();
  
  // renderiza UI
  return <div>{/* complex JSX */}</div>;
}
```

✅ **Separar responsabilidades:**
```typescript
// ✅ Hook para dados (apenas leitura)
function useTransactions() {
  return useTransactionsStore((state) => state.transactions);
}

// ✅ Domain/selector para regras de negócio
function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  );
}

// ✅ Hook para ações (apenas escrita)
function useTransactionsActions() {
  return useTransactionsStore((state) => ({
    fetchTransactions: state.fetchTransactions,
    addTransaction: state.addTransaction
  }));
}

// ✅ Componente apenas UI e orquestração
function TransactionsList() {
  const transactions = useTransactions();
  const { fetchTransactions } = useTransactionsActions();
  const balance = calculateBalance(transactions);
  
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  
  return <TransactionsTable transactions={transactions} balance={balance} />;
}
```

**Diretriz para o Copilot**: 
- Extrair regras para selectors puros em `domain/` 
- Separar hooks de leitura e escrita
- Componentes focados em UI e orquestração apenas

#### 🔓 OCP — Open/Closed Principle
**Componentes abertos para extensão, fechados para modificação**

❌ **Evitar switch/if extensos:**
```typescript
// ❌ Viola OCP
function Button({ variant, ...props }) {
  if (variant === 'primary') return <PrimaryButton {...props} />;
  if (variant === 'secondary') return <SecondaryButton {...props} />;
  if (variant === 'danger') return <DangerButton {...props} />;
  // Adicionar novo tipo requer modificar o componente
}
```

✅ **Usar composição e estratégias:**
```typescript
// ✅ Respeitea OCP
const buttonVariants = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  danger: DangerButton,
} as const;

function Button({ variant, ...props }) {
  const ButtonComponent = buttonVariants[variant];
  return <ButtonComponent {...props} />;
}
```

**Diretriz para o Copilot**: Usar composição, objetos de estratégia e render maps

#### 🔄 LSP — Liskov Substitution Principle
**Componentes substituíveis devem respeitar o mesmo contrato**

✅ **Usar tipos discriminados para transações:**
```typescript
// ✅ Contrato bem definido para transações
interface BaseTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

interface IncomeTransaction extends BaseTransaction {
  type: 'income';
  source: string;
}

interface ExpenseTransaction extends BaseTransaction {
  type: 'expense';
  category: ExpenseCategory;
}

interface TransferTransaction extends BaseTransaction {
  type: 'transfer';
  fromAccount: string;
  toAccount: string;
}

type Transaction = IncomeTransaction | ExpenseTransaction | TransferTransaction;

function TransactionItem(props: { transaction: Transaction }) {
  switch (props.transaction.type) {
    case 'income': return <IncomeCard {...props} />;
    case 'expense': return <ExpenseCard {...props} />;
    case 'transfer': return <TransferCard {...props} />;
  }
}
```

**Diretriz para o Copilot**: Garantir que variações respeitem o mesmo contrato

#### 🔍 ISP — Interface Segregation Principle
**Evitar props gigantes ou interfaces genéricas demais**

❌ **Evitar props desnecessárias:**
```typescript
// ❌ Viola ISP
interface MegaProps {
  user: User;
  products: Product[];
  orders: Order[];
  analytics: Analytics;
  settings: Settings;
}

function SimpleUserCard({ user, products, orders, analytics, settings }: MegaProps) {
  // Componente só usa 'user', mas recebe tudo
  return <div>{user.name}</div>;
}
```

✅ **Interfaces pequenas e focadas:**
```typescript
// ✅ Respeita ISP
interface UserCardProps {
  user: User;
}

interface ProductListProps {
  products: Product[];
}

function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>;
}
```

**Diretriz para o Copilot**: Criar interfaces pequenas e focadas

#### 🔄 DIP — Dependency Inversion Principle
**Componentes devem depender de abstrações, não de implementações**

✅ **Criar contratos para serviços:**
```typescript
// ✅ Abstração
interface UserRepository {
  getUser(id: string): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
}

// ✅ Implementações
class ApiUserRepository implements UserRepository {
  async getUser(id: string) { /* API call */ }
  async updateUser(id: string, data: Partial<User>) { /* API call */ }
}

class MockUserRepository implements UserRepository {
  async getUser(id: string) { /* mock data */ }
  async updateUser(id: string, data: Partial<User>) { /* mock update */ }
}

// ✅ Hook depende da abstração
function useUser(repository: UserRepository, id: string) {
  return useQuery(['user', id], () => repository.getUser(id));
}
```

**Diretriz para o Copilot**: Criar contratos para facilitar troca de implementação


**Regra importante**: Nunca concentrar tudo em `pages/` ou `app/`

## 🧮 Selectors e Estado Derivado

### Princípios dos Selectors
- **Funções Puras**: Sem efeitos colaterais
- **Memorização**: Usar seletores otimizados quando necessário
- **Domínio Específico**: Separar por contexto de negócio
- **Reutilização**: Compor selectors menores em maiores

### Selectors Financeiros
```typescript
// domain/selectors/transactions.ts
export function selectTransactionsByType(transactions: Transaction[], type: TransactionType) {
  return transactions.filter(t => t.type === type);
}

export function selectTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function selectTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function selectCurrentBalance(transactions: Transaction[]): number {
  return selectTotalIncome(transactions) - selectTotalExpenses(transactions);
}

export function selectTransactionsByDateRange(
  transactions: Transaction[], 
  startDate: string, 
  endDate: string
) {
  return transactions.filter(t => 
    t.date >= startDate && t.date <= endDate
  );
}
```

### Hooks com Selectors
```typescript
// hooks/useBalance.ts
export function useBalance() {
  return useTransactionsStore((state) => 
    selectCurrentBalance(state.transactions)
  );
}

// hooks/useMonthlyTransactions.ts
export function useMonthlyTransactions(month: string, year: string) {
  return useTransactionsStore((state) => {
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;
    return selectTransactionsByDateRange(state.transactions, startDate, endDate);
  });
}
```

## 🛡️ Segurança e Qualidade

### Security Guidelines
- **Input Validation**: Validar todos os inputs com Zod
- **XSS Prevention**: Sanitizar dados antes da renderização
- **Authentication**: Implementar tokens JWT com refresh
- **Environment Variables**: Nunca expor secrets no frontend

### Code Quality
- **ESLint Rules**: Seguir configuração strict do projeto
- **Type Safety**: Zero any types, preferir unknown
- **Error Handling**: Try/catch em todas as async operations
- **Testing**: Cobertura mínima de 80% para utils e hooks

## 🎨 Design System

### Component Guidelines
- **Atomic Design**: Atoms → Molecules → Organisms → Templates
- **Styled Components**: Usar Tailwind CSS classes consistentemente
- **Accessibility**: Implementar ARIA labels e keyboard navigation
- **Responsive Design**: Mobile-first approach

### Theme Consistency
```typescript
// Usar design tokens definidos
const theme = {
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
  },
};
```

## 🚀 Deploy e CI/CD

### Build Optimization
- **Tree Shaking**: Eliminar código não utilizado
- **Asset Optimization**: Comprimir imagens e fonts
- **Bundle Splitting**: Separar vendor e app bundles
- **Progressive Enhancement**: Funcionar sem JavaScript

### Monitoring
- **Performance Metrics**: Web Vitals (LCP, FID, CLS)
- **Error Tracking**: Implementar error reporting
- **User Analytics**: Métricas de uso e conversão

## 📝 Documentação

### Code Documentation
- **JSDoc**: Documentar funções complexas e APIs
- **README**: Instruções claras de setup e desenvolvimento
- **Changelog**: Manter histórico de mudanças
- **Architecture Decision Records**: Documentar decisões importantes

# State Management

Este projeto segue os princípios de **State Management previsível, centralizado e escalável**, conforme apresentado na **Aula 4 – State Management Patterns (POSTECH)**.

O Copilot deve respeitar rigorosamente as diretrizes abaixo ao sugerir, criar ou refatorar código.

---

## 1. Princípios Gerais

- Diferenciar claramente:
  - **Estado de UI local** (ex: modal, aba ativa, loading visual)
  - **Estado de domínio** (ex: transações, saldo, filtros)
- Priorizar **previsibilidade, imutabilidade e rastreabilidade** do estado.
- Evitar lógica de negócio dentro de componentes de UI.
- Evitar duplicação de estado.
- Preferir composição e isolamento de responsabilidades.

---

## 2. Estado Local (UI)

- Utilize `useState` **apenas** para:
  - Estados visuais
  - Estados temporários
  - Estados que não precisam ser compartilhados
- Nunca usar `useState` para dados de domínio financeiro.

Exemplos válidos:
- Modal aberto/fechado
- Aba selecionada
- Controle visual de loading local

---

## 3. Estado de Domínio (Global / Compartilhado)

- Centralizar o estado de domínio usando **Zustand**.
- O estado global deve conter, no mínimo:
  - `transactions`
  - `isLoading`
  - `error`
- Todas as mutações de estado devem ocorrer **exclusivamente pela store**.

Ações obrigatórias:
- `fetchTransactions`
- `addTransaction`
- `updateTransaction`
- `removeTransaction`

Regras:
- Atualizações devem ser **imutáveis**
- Nenhuma lógica de UI dentro da store
- Nenhum acesso direto à API fora da store

---

## 4. Fluxo Assíncrono Padronizado

Toda ação assíncrona deve seguir o padrão:

1. Antes da requisição:
   - `isLoading = true`
   - `error = null`
2. Sucesso:
   - Atualizar dados
   - `isLoading = false`
3. Erro:
   - Definir `error`
   - `isLoading = false`

Componentes **não** devem:
- Controlar loading global
- Tratar erro de domínio
- Executar fetch diretamente

---

## 5. Separação de Responsabilidades

- **Pages (Next.js)**:
  - Não conter lógica de negócio
  - Não acessar APIs diretamente
  - Apenas orquestrar componentes e ações da store

- **Componentes de apresentação**:
  - Devem ser preferencialmente stateless
  - Receber dados prontos via props
  - Não acessar a store diretamente

---

## 6. Selectors e Estado Derivado

- Toda lógica de cálculo deve ser extraída para **selectors puros**.
- Exemplos:
  - Cálculo de saldo total
  - Filtros de transações
  - Agrupamentos ou somatórios

Regras dos selectors:
- Funções puras
- Sem efeitos colaterais
- Sem acesso à UI ou APIs

---

## 7. Hooks de Acesso ao Estado

- Criar hooks específicos para leitura:
  - `useTransactions`
  - `useBalance`
- Hooks de leitura **não devem expor mutações**.
- Hooks de escrita devem chamar apenas ações da store.

---

## 8. Context API (Boundary)

- Utilizar Context API apenas como **boundary de aplicação**, se necessário.
- Não armazenar estado mutável complexo no Context.
- Context pode expor:
  - Stores
  - Casos de uso
  - Dependências globais

---

## 9. Boas Práticas Obrigatórias

- Não misturar UI, domínio e infraestrutura no mesmo arquivo.
- Não realizar cálculos financeiros dentro de componentes.
- Não duplicar estado entre store e componentes.
- Priorizar clareza arquitetural em vez de atalhos.

---

## 10. Documentação

- Sempre que sugerir alterações relevantes:
  - Atualizar o README
  - Explicar decisões de State Management
  - Relacionar explicitamente com:
    **Aula 4 – State Management Patterns**
- O objetivo é garantir **legibilidade arquitetural para avaliadores e novos desenvolvedores**.

---

## Diretriz Final

Ao gerar código neste projeto, o Copilot deve sempre se perguntar:

> "Este estado é previsível, centralizado e fácil de rastrear?"

Se a resposta for não, a solução deve ser revista.
