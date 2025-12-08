# Package Configuration Guide - Clean Architecture

Este documento descreve como configurar novos packages no monorepo ByteBank Web Front seguindo os padrões estabelecidos e documenta a implementação da Clean Architecture.

## 🏗️ Arquitetura Clean Architecture

O projeto implementa Clean Architecture com os seguintes packages:

### Core Packages

1. **@bytebank-web/core** - Camada de Domínio ✅ CONFIGURADO
   - Contém entities, repositories interfaces e use cases
   - Sem dependências externas (framework-independent)
   - Status: Build funcionando, arquivos de saída gerados

2. **@bytebank-web/infrastructure** - Camada de Infraestrutura ✅ CONFIGURADO
   - Implementações dos repositories
   - Integrações com banco de dados (MongoDB)
   - Status: Build funcionando, arquivos de saída gerados

3. **@bytebank-web/presentation** - Camada de Apresentação ✅ CONFIGURADO
   - Providers React
   - Components de UI específicos da aplicação
   - Status: Build funcionando, arquivos de saída gerados

4. **@bytebank-web/shared** - Camada de Aplicação ✅ CONFIGURADO
   - Dependency Injection Container
   - Configurações compartilhadas
   - Status: Build funcionando, arquivos de saída gerados

## 📁 Estrutura de Package Padrão

Cada package deve seguir a seguinte estrutura:

```
packages/[package-name]/
├── index.ts           # Export principal
├── package.json       # Configuração do package
├── tsconfig.json      # Configuração TypeScript
├── index.d.ts         # Tipos gerados (auto)
├── index.js           # JS compilado (auto)
└── dist/              # Diretório de saída (auto)
    ├── index.d.ts
    ├── index.js
    └── [outros arquivos compilados]
```

## ⚙️ Configuração Padrão

### package.json Template

```json
{
  "name": "@bytebank-web/[package-name]",
  "version": "1.0.0",
  "description": "Description of the package",
  "main": "index.js",
  "types": "index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist *.d.ts *.js *.js.map *.d.ts.map"
  },
  "dependencies": {
    // Dependencies específicas do package
  },
  "devDependencies": {
    "@bytebank-web/typescript-config": "*",
    "typescript": "^5.8.2"
  }
}
```

### tsconfig.json Template

```json
{
  "extends": "@bytebank-web/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

## 🔗 Dependências por Package

### @bytebank-web/core

- **Dependências**: Nenhuma
- **DevDependencies**: `@bytebank-web/typescript-config`, `typescript`

### @bytebank-web/infrastructure

- **Dependências**: `@bytebank-web/core`, `mongoose`
- **DevDependencies**: `@bytebank-web/typescript-config`, `@types/node`, `typescript`

### @bytebank-web/presentation

- **Dependências**: `@bytebank-web/core`, `@bytebank-web/shared`, `@tanstack/react-query`
- **PeerDependencies**: `react`
- **DevDependencies**: `@bytebank-web/typescript-config`, `@types/react`, `typescript`

### @bytebank-web/shared

- **Dependências**: `@bytebank-web/core`, `@bytebank-web/infrastructure`
- **DevDependencies**: `@bytebank-web/typescript-config`, `typescript`

## 🚀 Build Process

### Build Individual

```bash
cd packages/[package-name]
yarn build
```

### Build com Turbo (Recomendado)

```bash
# Build de um package específico
yarn build --filter="@bytebank-web/[package-name]"

# Build de todos os Clean Architecture packages
yarn build --filter="@bytebank-web/core" --filter="@bytebank-web/infrastructure" --filter="@bytebank-web/shared" --filter="@bytebank-web/presentation"

# Build completo
yarn build
```

## 📋 Steps para Criar Novo Package

1. **Criar estrutura:**

   ```bash
   mkdir packages/[package-name]
   cd packages/[package-name]
   ```

2. **Criar package.json** (usar template apropriado)

3. **Criar tsconfig.json** (usar template base)

4. **Criar index.ts** com exports principais

5. **Instalar dependências:**

   ```bash
   # No root do projeto
   yarn install
   ```

6. **Primeiro build:**
   ```bash
   yarn build --filter="@bytebank-web/[package-name]"
   ```

## 🛠️ Status Atual dos Packages

| Package                      | Status         | Build | Output   | Imports |
| ---------------------------- | -------------- | ----- | -------- | ------- |
| @bytebank-web/core           | ✅ Configurado | ✅ OK | ✅ dist/ | ✅ OK   |
| @bytebank-web/infrastructure | ✅ Configurado | ✅ OK | ✅ dist/ | ✅ OK   |
| @bytebank-web/shared         | ✅ Configurado | ✅ OK | ✅ dist/ | ✅ OK   |
| @bytebank-web/presentation   | ✅ Configurado | ✅ OK | ✅ dist/ | ✅ OK   |

## 🔍 Troubleshooting

### Problemas Comuns

1. **"no output files found for task"**
   - ✅ RESOLVIDO: `outDir` configurado no tsconfig.json

2. **Circular dependencies**
   - ✅ VERIFICADO: Hierarquia respeitada (Core → Infrastructure → Shared → Presentation)

3. **TypeScript compilation errors**
   - ✅ RESOLVIDO: Todas as dependências instaladas e tipos configurados

### Verificação de Saúde

```bash
# Verificar build de todos os packages Clean Architecture
yarn build --filter="@bytebank-web/core" --filter="@bytebank-web/infrastructure" --filter="@bytebank-web/shared" --filter="@bytebank-web/presentation"
```

## 📝 Convenções

### Naming

- Package names: `@bytebank-web/[kebab-case]`
- Exports: Usar index.ts como ponto único de entrada
- Imports: Usar nomes absolutos `@bytebank-web/[package]`

### Dependencies

- Packages internos: versão `"*"`
- Packages externos: versões específicas
- React packages: usar `peerDependencies`

---

**✅ Status**: Todos os packages da Clean Architecture estão configurados e funcionando.  
**📅 Última atualização**: Dezembro 2024  
**🔧 Configurado por**: AI Assistant
├── index.ts # Exports principais
└── database/ # Implementações MongoDB

````

### Shared Package

```text
packages/shared/
├── package.json          # Configuração do package
├── tsconfig.json         # Configuração TypeScript
├── index.ts             # Exports principais
└── di/                  # Dependency Injection
````

### Presentation Package

```text
packages/presentation/
├── package.json          # Configuração do package
├── tsconfig.json         # Configuração TypeScript
├── index.ts             # Exports principais
├── controllers/         # Controllers para APIs
├── hooks/              # React hooks customizados
└── providers/          # Providers React modulares
```

## 🛠️ Configuração Manual dos Packages

### 1. **Package.json Base**

Para cada package, criar um `package.json` seguindo este padrão:

```json
{
  "name": "@bytebank-web/[PACKAGE-NAME]",
  "version": "1.0.0",
  "license": "MIT",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "check-types": "tsc --noEmit"
  },
  "exports": {
    ".": "./dist/index.js",
    "./*": "./dist/*.js"
  },
  "devDependencies": {
    "@bytebank-web/typescript-config": "*",
    "typescript": "5.8.2"
  },
  "dependencies": {
    // Dependências específicas do package
  }
}
```

### 2. **TypeScript Config**

Para cada package, criar um `tsconfig.json`:

```json
{
  "extends": "@bytebank-web/typescript-config/react-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

### 3. **Dependências por Package**

#### Core (sem dependências externas)

```json
{
  "dependencies": {}
}
```

#### Infrastructure (depende apenas do core)

```json
{
  "dependencies": {
    "@bytebank-web/core": "*"
  }
}
```

#### Shared (depende do core e infrastructure)

```json
{
  "dependencies": {
    "@bytebank-web/core": "*",
    "@bytebank-web/infrastructure": "*"
  }
}
```

#### Presentation (depende do core, shared e React)

```json
{
  "dependencies": {
    "@bytebank-web/core": "*",
    "@bytebank-web/shared": "*",
    "@tanstack/react-query": "^5.83.0",
    "react": "^19.0.1"
  },
  "peerDependencies": {
    "react": "^19.0.1"
  },
  "devDependencies": {
    "@types/react": "^19.0.1"
  }
}
```

## 📝 Arquivo index.ts por Package

### Core

```typescript
export * from "./entities/transaction";
export * from "./entities/account";
export * from "./entities/user";
export * from "./entities/monthly-data";

export * from "./repositories/transaction-repository";
export * from "./repositories/account-repository";
export * from "./repositories/user-repository";

export * from "./use-cases/transaction/get-transactions";
export * from "./use-cases/transaction/create-transaction";
export * from "./use-cases/transaction/get-monthly-data";

export * from "./use-cases/account/get-balance";
```

### Infrastructure

```typescript
export * from "./database/mongo-transaction-repository";
export * from "./database/mongo-account-repository";
```

### Shared

```typescript
export * from "./di/container";
```

### Presentation

```typescript
export * from "./providers";
```

## 🚀 Comandos para Build e Desenvolvimento

### Build de todos os packages

```bash
yarn build
```

### Desenvolvimento com watch mode

```bash
yarn dev
```

### Verificação de tipos

```bash
yarn check-types
```

### Build de um package específico

```bash
cd packages/core
yarn build
```

## 🔄 Ordem de Build (Dependências)

1. **Core** (sem dependências)
2. **Infrastructure** (depende do Core)
3. **Shared** (depende do Core e Infrastructure)
4. **Presentation** (depende do Core e Shared)

O Turborepo automaticamente respeita essa ordem através da configuração `"dependsOn": ["^build"]`.

## 🧪 Como Testar a Configuração

### 1. Instalar dependências

```bash
yarn install
```

### 2. Build dos packages

```bash
yarn build
```

### 3. Verificar se não há erros

```bash
yarn check-types
```

### 4. Testar imports nos apps

```typescript
// Em qualquer app, teste:
import { Transaction } from "@bytebank-web/core";
import { AppProvider } from "@bytebank-web/presentation";
import { container } from "@bytebank-web/shared";
```

## ⚠️ Troubleshooting

### Erro: "Cannot find module @bytebank-web/core"

- Certifique-se que o build foi executado: `yarn build`
- Verifique se o package.json está correto
- Execute `yarn install` novamente

### Erro: "TypeScript compilation failed"

- Verifique se todas as dependências estão listadas corretamente
- Certifique-se que os tipos estão exportados nos index.ts
- Verifique se o tsconfig.json está correto

### Erro: "Circular dependency detected"

- Revise as importações entre packages
- Core nunca deve importar de outros packages
- Infrastructure só deve importar do Core
- Shared só deve importar do Core e Infrastructure

## 📋 Checklist de Configuração

- [ ] Package.json criado para cada package
- [ ] Tsconfig.json criado para cada package
- [ ] Index.ts com exports corretos
- [ ] Dependências configuradas corretamente
- [ ] Build executado sem erros
- [ ] Imports funcionando nos apps
- [ ] Turborepo reconhecendo os packages

Com essa configuração, os packages Clean Architecture estão prontos para uso em todo o projeto!
