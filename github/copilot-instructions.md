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

## 📦 Gerenciamento de Estado

### Zustand Best Practices
- **Single Responsibility**: Um store por domínio de negócio
- **Immutable Updates**: Sempre retornar novos objetos/arrays
- **Typed Stores**: Definir interfaces TypeScript para todos os stores
- **Persistence**: Usar middleware persist apenas quando necessário

### Exemplo de Store Pattern
```typescript
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      isAuthenticated: false,
    }),
    { name: 'user-storage' }
  )
);
```

## ⚡ Performance e Otimização

### Code Splitting
- **Lazy Loading**: Implementar React.lazy para rotas e componentes pesados
- **Dynamic Imports**: Carregar bibliotecas sob demanda
- **Bundle Analysis**: Monitorar tamanho dos bundles com turbo

### Caching Strategies
- **React Query**: Implementar cache inteligente para APIs
- **Service Worker**: Cache de assets estáticos
- **Memoization**: Usar React.memo, useMemo, useCallback apropriadamente

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
// ✅ Hook para dados
function useUser(userId: string) {
  return useQuery(['user', userId], () => fetchUser(userId));
}

// ✅ Service para regras
function checkUserPermissions(user: User): boolean {
  return user.role === 'admin' && user.permissions.includes('write');
}

// ✅ Componente apenas UI
function UserProfile({ userId }: { userId: string }) {
  const { data: user } = useUser(userId);
  const isAdmin = user ? checkUserPermissions(user) : false;
  
  return <UserCard user={user} isAdmin={isAdmin} />;
}
```

**Diretriz para o Copilot**: Extrair regras para hooks customizados (useX), services, domain/utils

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

✅ **Usar tipos discriminados:**
```typescript
// ✅ Contrato bem definido
interface BaseCard {
  title: string;
  content: string;
}

interface UserCard extends BaseCard {
  type: 'user';
  user: User;
}

interface ProductCard extends BaseCard {
  type: 'product';
  product: Product;
}

type CardProps = UserCard | ProductCard;

function Card(props: CardProps) {
  switch (props.type) {
    case 'user': return <UserCardComponent {...props} />;
    case 'product': return <ProductCardComponent {...props} />;
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