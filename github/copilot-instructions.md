# Instruções do GitHub Copilot - Bytebank Web Frontend

## 🏗️ Arquitetura e Estrutura do Projeto

### Padrões de Organização
- **Monorepo Structure**: Manter a estrutura de packages com separação clara de responsabilidades
- **Clean Architecture**: Implementar camadas bem definidas (presentation, domain, infrastructure)
- **Feature-First Organization**: Agrupar arquivos por funcionalidade, não por tipo
- **Barrel Exports**: Usar arquivos index.ts para exports centralizados

### Estrutura de Pastas
```
packages/
├── core/           # Business logic e casos de uso
├── infrastructure/ # Adapters externos (APIs, storage)
├── presentation/   # Componentes UI reutilizáveis
├── shared/         # Utilities e helpers compartilhados
├── store/          # Estado global (Zustand)
├── types/          # Type definitions TypeScript
└── ui/             # Design system e componentes base
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

### TypeScript Guidelines
- **Strict Mode**: Sempre usar configuração strict
- **Interface First**: Definir types antes da implementação
- **Generic Types**: Criar tipos reutilizáveis e flexíveis
- **Utility Types**: Usar Pick, Omit, Partial quando apropriado

### React Best Practices
- **Functional Components**: Usar apenas function components
- **Custom Hooks**: Extrair lógica complexa para hooks reutilizáveis
- **Error Boundaries**: Implementar tratamento de erros robusto
- **Composition over Inheritance**: Favorecer composição de componentes

### API Integration
```typescript
// Use React Query para todas as requisições
const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,   // 10 minutos
  });
};
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