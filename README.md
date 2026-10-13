# Dashboard de Vendas e Faturamento

Demo de portfólio: dashboard interativo de vendas de uma loja fictícia, com KPIs,
gráficos, filtros e exportação de dados.

**Projeto de demonstração, dados fictícios.**

## O que faz

- 4 KPIs: faturamento, ticket médio, número de pedidos e crescimento vs. mês anterior.
- Gráfico de linha (faturamento por mês), barras (por categoria) e top 10 produtos.
- Filtros por período, categoria e região, todos combináveis.
- Tabela de pedidos com busca e exportação para CSV.
- Responsivo (celular e desktop) e com suporte a modo claro/escuro.

## O que não faz

- Não há backend nem banco de dados: os ~2.000 pedidos são gerados uma vez por
  script (`scripts/gerar-dados.mjs`) e carregados de um arquivo JSON estático.
- Não há autenticação nem múltiplas lojas/usuários.
- Os dados não refletem nenhuma empresa real.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, Recharts.

## Rodando localmente

```bash
npm install
npm run dev
```

Para regenerar o dataset fictício:

```bash
node scripts/gerar-dados.mjs
```
