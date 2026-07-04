# Html-teste — Login e Cadastro

Tela de login e cadastro responsiva (mobile-first) com backend em Node.js + Express
pronto para persistir os usuários em um banco MySQL.

## Estrutura do projeto

```
Html-teste/
├── frontend/            # HTML, CSS e JS puro (nenhum build necessário)
│   ├── index.html        # Tela de login
│   ├── cadastro.html      # Tela de cadastro (nome, email, senha, confirmar senha)
│   ├── style.css
│   ├── reset.css
│   ├── ui.js              # Toggle de mostrar/ocultar senha
│   ├── login.js            # Fetch para /api/auth/login
│   ├── cadastro.js          # Fetch para /api/auth/register
│   └── Img/
├── backend/              # API Node.js + Express + MySQL
│   ├── server.js          # Ponto de entrada (serve o frontend + API)
│   ├── config/db.js        # Pool de conexão MySQL (lê variáveis do .env)
│   ├── routes/auth.js        # Rotas /api/auth/register e /api/auth/login
│   ├── sql/schema.sql          # Script para criar o banco e a tabela usuarios
│   ├── package.json
│   ├── .env                # Configuração local (NÃO é versionado)
│   └── .env.example         # Modelo de variáveis de ambiente
└── README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- MySQL instalado e rodando localmente (ou acessível via rede)

## Como rodar localmente

1. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

2. Crie o banco e a tabela executando o script SQL no seu MySQL:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
   (ou rode o conteúdo de `backend/sql/schema.sql` no MySQL Workbench/DBeaver)

3. Configure o arquivo `backend/.env` com os dados do seu MySQL (copie de `.env.example` se precisar recriá-lo):
   ```env
   PORT=3000

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=html_teste_login
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```
   ou, para reiniciar automaticamente a cada alteração:
   ```bash
   npm run dev
   ```

5. Acesse no navegador: **http://localhost:3000**

O próprio servidor Express serve os arquivos do `frontend/`, então login, cadastro e API
rodam na mesma porta — sem problema de CORS.

## Rotas da API

| Método | Rota                  | Descrição                                   |
|--------|-----------------------|----------------------------------------------|
| POST   | `/api/auth/register`  | Cria um usuário (nome, email, senha)         |
| POST   | `/api/auth/login`     | Autentica com email e senha                  |

As senhas são armazenadas com hash (`bcryptjs`), nunca em texto puro.

## Observação importante sobre variáveis de ambiente

Se a sua máquina já tiver variáveis de ambiente globais chamadas `DB_HOST`, `DB_USER`,
`DB_PASSWORD` ou `DB_NAME` (de outro projeto), elas seriam usadas no lugar do `.env`
por padrão. Este projeto já força o `.env` do `backend/` a ter prioridade
(`dotenv.config({ override: true })` em `server.js`), então basta editar o `backend/.env`
normalmente.
