# ByteBank Web Front - Clean Architecture

Este projeto foi refatorado para seguir os princípios de **Clean Architecture**, organizando o código em camadas bem definidas com responsabilidades específicas.

## Estrutura do Projeto

```text
packages/
├── core/                     # 🧭 CAMADA DE DOMÍNIO
│   ├── entities/            # Entidades de negócio
│   │   ├── transaction.ts
│   │   ├── account.ts
│   │   ├── user.ts
│   │   └── monthly-data.ts
│   ├── repositories/        # Contratos/Interfaces
│   │   ├── transaction-repository.ts
│   │   ├── account-repository.ts
│   │   └── user-repository.ts
│   └── use-cases/          # Regras de negócio
│       ├── transaction/
│       │   ├── get-transactions.ts
│       │   ├── create-transaction.ts
│       │   └── get-monthly-data.ts
│       └── account/
│           └── get-balance.ts
│
├── infrastructure/          # 🔧 CAMADA DE INFRAESTRUTURA
│   └── database/
│       ├── mongo-transaction-repository.ts
│       └── mongo-account-repository.ts
│
├── presentation/            # 🎨 CAMADA DE APRESENTAÇÃO
│   ├── controllers/
│   │   ├── transaction-controller.ts
│   │   └── account-controller.ts
│   ├── hooks/
│   │   ├── use-transactions.ts
│   │   ├── use-balance.ts
│   │   └── use-monthly-data.ts
│   └── providers/
│       ├── AppProvider.tsx
│       ├── QueryProvider.tsx
│       └── StateProvider.tsx
│
└── shared/                  # 🔄 CAMADA DE APLICAÇÃO
    └── di/
        └── container.ts     # Injeção de Dependência
```

## Princípios Aplicados

### 1. **Separação de Responsabilidades**

- **Domínio**: Regras de negócio puras, independentes de frameworks
- **Infraestrutura**: Implementações técnicas (banco de dados, APIs externas)
- **Apresentação**: Interface do usuário, controllers e hooks
- **Aplicação**: Orquestração e configuração

### 2. **Dependency Inversion**

```typescript
// ❌ Antes: Dependência direta
class TransactionService {
  constructor(private mongoDb: MongoRepository) {} // Dependência concreta
}

// ✅ Depois: Inversão de dependência
class GetTransactionsUseCase {
  constructor(private repository: TransactionRepository) {} // Dependência abstrata
}
```

### 3. **Injeção de Dependência**

```typescript
// Container centralizado
const container = {
  getTransactionsUseCase: new GetTransactionsUseCase(
    mongoTransactionRepository
  ),
  createTransactionUseCase: new CreateTransactionUseCase(
    mongoTransactionRepository
  ),
};
```

## Como Usar

### 1. **Entidades de Domínio**

```typescript
import {
  Transaction,
  TransactionType,
} from "@bytebank-web/core/entities/transaction";

const transaction = new Transaction(
  "123",
  "user@example.com",
  "Compra no supermercado",
  -150.0,
  TransactionType.EXPENSE,
  new Date()
);

console.log(transaction.getFormattedValue()); // "R$ -150,00"
console.log(transaction.isExpense()); // true
```

### 2. **Use Cases**

```typescript
import { container } from "@bytebank-web/shared/di/container";

// Buscar transações
const transactions =
  await container.getTransactionsUseCase.execute("user@example.com");

// Criar nova transação
await container.createTransactionUseCase.execute({
  ownerEmail: "user@example.com",
  description: "Salário",
  value: 5000,
  type: TransactionType.INCOME,
});
```

### 3. **Hooks de Apresentação**

```typescript
import { useTransactions } from '@bytebank-web/presentation/hooks/use-transactions';

function TransactionList() {
  const { data: transactions, isLoading } = useTransactions(email);

  if (isLoading) return <Loading />;

  return (
    <ul>
      {transactions?.map(transaction => (
        <li key={transaction.id}>
          {transaction.description}: {transaction.getFormattedValue()}
        </li>
      ))}
    </ul>
  );
}
```

## Benefícios Alcançados

### ✅ **Testabilidade**

- Use cases podem ser testados isoladamente
- Mocks fáceis devido às interfaces bem definidas

### ✅ **Flexibilidade**

- Troca de MongoDB por PostgreSQL sem afetar o domínio
- Troca de React por Vue.js sem afetar as regras de negócio

### ✅ **Manutenibilidade**

- Código organizado por responsabilidades
- Alterações localizadas em camadas específicas

### ✅ **Escalabilidade**

- Estrutura suporta crescimento da aplicação
- Fácil adição de novos recursos

### ✅ **Independência de Frameworks**

- Core não depende de React, Next.js ou MongoDB
- Regras de negócio puras e reutilizáveis

## Exemplo de Teste

```typescript
// test/use-cases/get-transactions.test.ts
import { GetTransactionsUseCase } from "@bytebank-web/core/use-cases/transaction/get-transactions";
import { MockTransactionRepository } from "../mocks/mock-transaction-repository";

describe("GetTransactionsUseCase", () => {
  it("should return filtered transactions", async () => {
    const repository = new MockTransactionRepository();
    const useCase = new GetTransactionsUseCase(repository);

    const result = await useCase.execute("user@test.com");

    expect(result).toHaveLength(5);
    expect(result.every((tx) => tx.isValidTransaction())).toBe(true);
  });
});
```

## Migração

Para migrar código existente:

1. **Substitua imports diretos de APIs** pelos novos hooks
2. **Use entidades de domínio** em vez de tipos TypeScript simples
3. **Aproveite os métodos de negócio** das entidades (ex: `getFormattedValue()`)
4. **Utilize o AppProvider** modular em vez de providers individuais

## Próximos Passos

- [ ] Implementar testes unitários para todos os use cases
- [ ] Adicionar validações mais robustas nas entidades
- [ ] Criar use cases para operações mais complexas
- [ ] Implementar eventos de domínio
- [ ] Adicionar métricas e observabilidade
