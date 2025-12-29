# 💰 ByteBank - Tech Challenge (Fase 4)

Este projeto é a continuação do Tech Challenge da Fase 04, com o objetivo de aprimorar e escalar a aplicação de gerenciamento financeiro existente.

---

## 🚀 Tecnologias Utilizadas

- Next.js (com suporte a SSR e SSG)
- React 19+
- TypeScript
- Tailwind CSS
- **Zustand** para gestão de estado global
- **Multi Zones** (Next.js) para arquitetura de microfrontends
- **shadcn/ui** como Design System
- **Turborepo** para gerenciamento monorepo
- Vercel (deploy)
- Figma (referência visual)

---

## 📦 Funcionalidades

### 🏠 Página Inicial (Home)

- Balanço mensal
- Filtro de mês e ano
- Adição de nova transação
- Gráfico de Receitas e Despesas
- Gráfico de % de despesas/transferências por Categoria
- Últimas transações

### 📄 Listagem de Transações

- Filtros de categoria
- Campo de pesquisa
- Paginação na lista de transações
- Envio de extrato em PDF (Itaú)
- Validação de entradas

---

## 🧱 Arquitetura e Organização

### 🧩 Microfrontends com Multi Zones

- Divisão do sistema em aplicações Next.js independentes
- Cada zona (app) é responsável por um domínio funcional (ex: dashboard, transações, api)
- Comunicação via rotas e contexto compartilhado
- Integração orquestrada pela Vercel

### ☁️ Deploy em Cloud

- Uso da **Vercel** para deploy de cada zona com CI/CD automatizado
- Ambientes separados para cada app Next.js (subdomínios ou caminhos distintos)

---

## 📁 Estrutura do Projeto

```
apps/
├── api/                 # App Next.js para API apartada
├── dashboard/           # App Next.js do painel financeiro
├── shell/               # App Next.js que envolve a aplicação
├── transactions/        # App Next.js de listagem e edição de transações
packages/
├── eslint-config/       # Configuração compartilhada do ESLint
├── typescript-config/   # Configurações compartilhadas do TypeScript
├── utils/               # Funções utilitárias reutilizáveis
├── ui/                  # Componentes compartilhados com shadcn/ui
├── types/               # Tipagens globais (TypeScript)
├── store/               # Estado global compartilhado com Zustand
├── tailwind-config/     # Configuração compartilhada do Tailwind CSS
```

---

## 🧪 Como Executar Localmente

Clone o repositório:

```bash
git clone https://github.com/BrunaABraguin/bytebank-web-front.git
```

Instale as dependências:

```bash
yarn
```

Inicie os servidores de desenvolvimento:

```bash
yarn dev
```

Acesse:

- Api: http://localhost:4000
- Shell: http://localhost:3000
- Dashboard: http://localhost:3001
- Transações: http://localhost:3002

---

## ♿ Acessibilidade

- Navegação por teclado
- Suporte a leitores de tela
- Contraste de cores adequado
- Labels semânticos e atributos ARIA aplicados

---

## 🎥 Vídeo Demonstrativo

Demonstração completa da aplicação com:

- Microfrontends com multi zones em execução
- Deploy individual em cloud via Vercel
- Funcionalidades implementadas conforme os requisitos

🔗 [Link para o vídeo Fase 4](https://youtu.be/C8Ahl1Dd-Qo)

---

## 👩‍💻 Desenvolvido por

Bruna de Andrade Braguin
