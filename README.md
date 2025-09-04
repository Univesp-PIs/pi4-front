Este é o frontend do sistema EngSol, desenvolvido em Next.js e React, para gestão de projetos de engenharia e acompanhamento de pedidos de clientes.

![image](https://github.com/user-attachments/assets/79db3e09-faaf-4a37-b81e-6ae26592dadc)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padrões e Convenções](#padrões-e-convenções)
- [Contato](#contato)

---

## Sobre o Projeto

O **EngSol** é um sistema web para gerenciamento de projetos de engenharia, permitindo que administradores cadastrem, editem e acompanhem projetos, enquanto clientes podem consultar o andamento de seus pedidos através de uma chave de acesso.

## Funcionalidades

- **Área do Administrador**
  - Dashboard com indicadores de projetos, custos e entregas.
  - Cadastro, edição e exclusão de projetos.
  - Gerenciamento de etapas e status dos projetos.
  - Criação de contas de administradores.
  - Visualização e ordenação de projetos.

- **Área do Cliente**
  - Consulta de pedidos por chave de acesso.
  - Visualização do progresso do projeto em formato de timeline.

- **Geral**
  - Interface responsiva.
  - Feedback visual com Skeletons e Toasts.
  - Autenticação e autorização de administradores.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [date-fns](https://date-fns.org/)
- [Axios](https://axios-http.com/)

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/Univesp-PIs/pi3-front.git
   cd pi3-front
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis necessárias (exemplo: URL da API).

4. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## Estrutura de Pastas

```
src/
  app/                # Páginas e rotas do Next.js
    (administrador)/  # Área administrativa
    (cliente)/        # Área do cliente
  components/         # Componentes reutilizáveis
  contexts/           # Contextos globais (Auth, Admin)
  hooks/              # Hooks customizados (React Query, etc)
  services/           # Serviços de API
  utils/              # Funções utilitárias
  @types/             # Tipos TypeScript globais
```

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Gera a build de produção.
- `start`: Inicia o servidor em modo produção.
- `lint`: Executa o linter.

Exemplo:
```sh
npm run dev
```

## Padrões e Convenções

- **Componentização**: Componentes reutilizáveis ficam em `src/components`.
- **Tipagem**: Uso extensivo de TypeScript para segurança de tipos.
- **Estilização**: Tailwind CSS para estilos utilitários.
- **API**: Comunicação via Axios, centralizada em `src/services/apiClient.ts`.
- **Gerenciamento de Estado**: React Query para dados assíncronos e Context API para autenticação.

## Contato

Dúvidas ou sugestões? Entre em contato pelo [e-mail](mailto:gabriel.hsribeiro19@gmail.com) ou abra uma issue neste repositório.

---

> Projeto desenvolvido para fins acadêmicos e demonstração de habilidades em frontend.
