# ProcessosJudiciasTeste

## 📋 Descrição
Sistema de gerenciamento de processos judiciais desenvolvido com React, TypeScript e Supabase , para projeto de Teste de Estagio

## 🚀 Tecnologias Utilizadas
- React 18
- TypeScript
- Vite
- TailwindCSS
- Supabase (Banco de dados e Back-end utilizando supabase , banco de dados (PostgreSQL), API REST e gerenciamento de dados. O frontend React se comunica diretamente com o Supabase para todas as operações de CRUD.)
- ESLint
- Lucide React (ícones)

## 🛠️ Pré-requisitos
- Node.js (versão LTS recomendada)
- npm ou yarn

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as credenciais do Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🚀 Executando o Projeto

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa a verificação de código com ESLint

## 📁 Estrutura do Projeto
```
src/
├── components/     # Componentes React reutilizáveis
├── pages/         # Páginas da aplicação
├── lib/           # Utilitários e configurações
├── types.ts       # Definições de tipos TypeScript
└── App.tsx        # Componente principal
```

## 🤝 Contribuindo
1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
