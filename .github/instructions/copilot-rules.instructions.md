# 🚀 Copilot Instructions – Projeto Bytebank Web Front

Este documento define como o GitHub Copilot deve sugerir código dentro do projeto bytebank-web-front, garantindo consistência arquitetural, estilo e padrões definidos.

## 🎯 Objetivo do Documento

Orientar o Copilot a gerar código alinhado com:

● Next.js com Multizones
● Zustand para estado local
● React Query para dados remotos
● CSS Modules e Tailwind como padrão principal de estilização
● Clean Architecture aplicada ao frontend

### Componentização modular

O Copilot deve evitar sugerir padrões que não fazem parte do projeto (Atomic, Styled Components, Context excessivo, etc).

## Regras de Dependência

presentation → application → domain

infrastructure → application/domain

domain não deve importar nada externo