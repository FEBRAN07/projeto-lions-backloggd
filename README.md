<div align="center">

# Boilerplate Lions Dev

API didática em **Node.js**, **Express**, **MongoDB**, **Mongoose**, **JWT** e **bcryptjs**, organizada em camadas MVC para servir como base de projetos, aulas e desafios.

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img alt="bcryptjs" src="https://img.shields.io/badge/Senhas-bcryptjs-FFB020?style=for-the-badge">
</p>

<p>
  <strong>Boilerplate pronto para cadastro, login, rotas protegidas, hash de senha, tratamento de erros, MongoDB Atlas e deploy no Render.</strong>
</p>

</div>

---

## Sumário

- [Visão geral](#visão-geral)
- [Comece em 5 minutos](#comece-em-5-minutos)
- [Stack utilizada](#stack-utilizada)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como o MVC funciona neste boilerplate](#como-o-mvc-funciona-neste-boilerplate)
- [Fluxo de uma requisição](#fluxo-de-uma-requisição)
- [Blocos de código explicados](#blocos-de-código-explicados)
- [Autenticação completa](#autenticação-completa)
- [bcryptjs e segurança de senha](#bcryptjs-e-segurança-de-senha)
- [JWT e rotas protegidas](#jwt-e-rotas-protegidas)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rotas disponíveis](#rotas-disponíveis)
- [Como criar uma nova entidade MVC](#como-criar-uma-nova-entidade-mvc)
- [Arquivos extras do projeto](#arquivos-extras-do-projeto)
- [Deploy no Render](#deploy-no-render)
- [Checklist de segurança](#checklist-de-segurança)
- [Padrão de resposta](#padrão-de-resposta)
- [Boas práticas para evoluir este boilerplate](#boas-práticas-para-evoluir-este-boilerplate)
- [Licença](#licença)

---

## Visão Geral

Este repositório é uma base pronta para criar APIs com autenticação e organização profissional. Ele foi pensado para estudantes e times que querem começar um projeto sem perder tempo repetindo a estrutura inicial.

Ele já entrega:

| Recurso | O que já vem pronto |
| --- | --- |
| API Express | Servidor HTTP com rotas registradas e JSON habilitado |
| Arquitetura MVC | Separação entre rotas, controllers, services, repositories e models |
| MongoDB + Mongoose | Conexão centralizada e model de usuário |
| Cadastro | Criação de usuário com validação e hash de senha |
| Login | Validação de credenciais e geração de token JWT |
| Rotas protegidas | Middleware que valida `Authorization: Bearer TOKEN` |
| Segurança de senha | Uso de `bcryptjs` para salvar apenas `senhaHash` |
| Tratamento de erros | Middleware central para respostas padronizadas |
| Testes manuais | Arquivo `requests.http` para usar com a extensão REST Client |
| Deploy | `render.yaml` pronto para publicar no Render |

---

## Comece em 5 Minutos

### 1. Clone o repositório

```bash
git clone git@github.com:nicolassmotta/boilerplate-lions-dev.git
cd boilerplate-lions-dev
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env`

No PowerShell:

```powershell
Copy-Item .env.example .env
```

No Git Bash, Linux ou macOS:

```bash
cp .env.example .env
```

Depois preencha a variável `MONGO_URI` com a connection string do MongoDB Atlas.

### 4. Inicie a API

```bash
npm start
```

Se tudo estiver certo, a API ficará disponível em:

```txt
http://localhost:3000
```

### 5. Teste as rotas

Abra o arquivo `requests.http` no VS Code e use a extensão **REST Client** para testar:

```txt
POST /api/auth/cadastro
POST /api/auth/login
GET  /api/usuarios/perfil
```

---

## Stack Utilizada

| Tecnologia | Papel no projeto |
| --- | --- |
| Node.js | Ambiente de execução JavaScript no servidor |
| Express | Framework HTTP para criar rotas, middlewares e respostas |
| MongoDB | Banco de dados NoSQL usado para persistir os usuários |
| Mongoose | ODM que cria schemas, models, validações e consultas |
| bcryptjs | Biblioteca usada para gerar hash e comparar senhas |
| jsonwebtoken | Biblioteca usada para criar e verificar tokens JWT |
| dotenv | Carrega variáveis do `.env` para `process.env` |
| Render | Plataforma usada para deploy da API |

O projeto usa **ES Modules**, por isso os imports seguem este formato:

```js
import express from "express";
```

Isso acontece porque o `package.json` contém:

```json
{
  "type": "module"
}
```

---

## Estrutura do Projeto

```txt
.
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── usuario.controller.js
│   ├── middlewares/
│   │   ├── autenticacao.middleware.js
│   │   ├── erro.middleware.js
│   │   └── validarCampos.middleware.js
│   ├── models/
│   │   └── usuario.model.js
│   ├── repositories/
│   │   └── usuario.repository.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── usuario.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── usuario.service.js
│   └── utils/
│       └── criarErro.js
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── render.yaml
├── requests.http
└── README.md
```

### Responsabilidades por camada

| Camada | Responsabilidade |
| --- | --- |
| `src/models` | Define o formato dos dados no MongoDB usando Mongoose |
| `src/repositories` | Executa as operações reais de banco de dados |
| `src/services` | Guarda as regras de negócio da aplicação |
| `src/controllers` | Recebe `req`, chama services e responde com `res` |
| `src/routes` | Define os endpoints HTTP e aplica middlewares |
| `src/middlewares` | Executa validações antes da rota ou tratamento depois da rota |
| `src/config` | Centraliza configurações externas, como banco de dados |
| `src/utils` | Guarda funções pequenas e reutilizáveis |
| `src/app.js` | Monta a aplicação Express |
| `src/server.js` | Conecta no banco e inicia o servidor |

---

## Como o MVC Funciona Neste Boilerplate

MVC significa **Model, View, Controller**. Em APIs REST, normalmente não existe uma View renderizando HTML, então a resposta JSON ocupa o lugar da saída enviada ao cliente.

Este projeto usa MVC com duas camadas extras muito comuns em APIs Node.js:

| Camada | O que faz | O que não deve fazer |
| --- | --- | --- |
| Route | Define URL, método HTTP e middlewares | Não deve conter regra de negócio grande |
| Controller | Lê `req.body`, `req.params`, `req.query` e devolve resposta HTTP | Não deve acessar MongoDB diretamente |
| Service | Aplica regras de negócio, valida fluxos e coordena ações | Não deve conhecer `req` nem `res` |
| Repository | Faz consultas, criação, atualização e remoção no banco | Não deve decidir regra de negócio |
| Model | Define schema, validações e transformação do documento | Não deve lidar com HTTP |

Uma boa regra mental:

```txt
HTTP fica no controller.
Regra de negócio fica no service.
Banco de dados fica no repository.
Formato dos dados fica no model.
```

Essa separação deixa o projeto mais fácil de testar, manter e evoluir.

---

## Fluxo de uma Requisição

Exemplo: login em `POST /api/auth/login`.

```mermaid
flowchart TD
  A[Cliente] -->|POST /api/auth/login| B[app.js]
  B --> C[auth.routes.js]
  C --> D[validarLogin]
  D --> E[auth.controller.js]
  E --> F[auth.service.js]
  F --> G[usuario.repository.js]
  G --> H[usuario.model.js]
  H --> I[(MongoDB)]
  I -.->|usuario + senhaHash| F
  F -.->|usuario seguro + token JWT| E
  E -.->|200 + JSON| A
```

As setas cheias mostram o caminho da requisição descendo pelas camadas. As setas
tracejadas mostram a resposta voltando até o cliente.

Passo a passo:

| Ordem | Camada | O que acontece |
| --- | --- | --- |
| 1 | `app.js` | Recebe a requisição e encaminha para `/api/auth` |
| 2 | `auth.routes.js` | Encontra a rota `POST /login` |
| 3 | `validarLogin` | Confere se `email` e `senha` vieram no body |
| 4 | `auth.controller.js` | Lê o body e chama o service |
| 5 | `auth.service.js` | Busca usuário, compara senha e gera token |
| 6 | `usuario.repository.js` | Consulta o MongoDB usando o Model |
| 7 | `usuario.model.js` | Define como o documento de usuário existe no banco |
| 8 | Controller | Retorna status HTTP e JSON para o cliente |

---

## Blocos de Código Explicados

Esta seção explica os principais blocos do projeto e o motivo de cada um existir.

### `src/server.js`

O `server.js` é o ponto de entrada da aplicação. Ele carrega variáveis de ambiente, conecta no banco e só depois inicia o servidor HTTP.

```js
dotenv.config();

const PORT = process.env.PORT || 3000;

try {
  await conectarBanco();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
  });
} catch (error) {
  console.error("Erro ao iniciar a aplicação:", error.message);
  process.exit(1);
}
```

O que esse bloco resolve:

| Linha | Explicação |
| --- | --- |
| `dotenv.config()` | Carrega o arquivo `.env` no ambiente local |
| `process.env.PORT || 3000` | Usa a porta do Render em produção ou `3000` localmente |
| `await conectarBanco()` | Garante que o MongoDB conectou antes de aceitar requisições |
| `app.listen(PORT)` | Inicia o servidor Express |
| `process.exit(1)` | Encerra a aplicação caso a conexão inicial falhe |

### `src/app.js`

O `app.js` monta o Express. Ele registra middlewares globais, rotas e tratamento de erro.

```js
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Boilerplate API MVC está rodando." });
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
```

O que esse bloco faz:

| Bloco | Função |
| --- | --- |
| `express()` | Cria a aplicação Express |
| `express.json()` | Permite ler JSON enviado no corpo da requisição |
| `GET /` | Rota simples para verificar se a API está online |
| `/api/auth` | Prefixo das rotas de cadastro e login |
| `/api/usuarios` | Prefixo das rotas protegidas de usuário |

No final do mesmo arquivo:

```js
app.use((req, res, next) => {
  return next(criarErro("Rota não encontrada.", 404));
});

app.use(erroMiddleware);
```

Esse trecho garante que rotas inexistentes recebam `404` e que qualquer erro seja enviado para uma resposta padronizada.

### `src/config/database.js`

Este arquivo centraliza a conexão com o MongoDB.

```js
async function conectarBanco() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI não configurada no ambiente.");
  }

  await mongoose.connect(mongoUri);

  console.log("MongoDB conectado com sucesso.");
}

export default conectarBanco;
```

Por que isso é importante:

| Ponto | Explicação |
| --- | --- |
| `MONGO_URI` vem do ambiente | Evita colocar senha do banco no código |
| Erro se `MONGO_URI` faltar | A aplicação falha cedo com uma mensagem clara |
| `mongoose.connect` fica centralizado | Nenhum controller ou service precisa saber como conectar |

### `src/models/usuario.model.js`

O Model define como o usuário será salvo no MongoDB.

```js
const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true,
      minlength: [2, "O nome deve ter pelo menos 2 caracteres."],
    },
    email: {
      type: String,
      required: [true, "O email é obrigatório."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido."],
    },
    senhaHash: {
      type: String,
      required: [true, "A senhaHash é obrigatória."],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
```

Detalhes importantes:

| Campo | Explicação |
| --- | --- |
| `nome` | Obrigatório, sem espaços extras e com tamanho mínimo |
| `email` | Obrigatório, único, salvo em minúsculo e validado por formato |
| `senhaHash` | Guarda o hash da senha, nunca a senha pura |
| `select: false` | Impede que `senhaHash` venha nas consultas por padrão |
| `timestamps: true` | Cria `createdAt` e `updatedAt` automaticamente |

Antes de responder para o cliente, os services usam `montarUsuarioSeguro` para remover campos que não devem aparecer na API.

### `src/repositories/usuario.repository.js`

O Repository é a camada que conversa com o banco.

```js
async function buscarPorEmail(email) {
  return Usuario.findOne({ email: email.trim().toLowerCase() });
}

async function buscarPorEmailComSenha(email) {
  const query = Usuario.findOne({ email: email.trim().toLowerCase() });
  return query.select("+senhaHash");
}
```

No cadastro usamos `buscarPorEmail`, porque não precisamos da senhaHash. No login usamos `buscarPorEmailComSenha`, porque precisamos comparar a senha digitada com a `senhaHash`.

Outras funções do repository:

```js
async function criar(dadosDoUsuario) {
  return Usuario.create(dadosDoUsuario);
}

async function buscarPorId(id) {
  return Usuario.findById(id);
}

async function listarTodos() {
  return Usuario.find().sort({ createdAt: -1 });
}

async function atualizarPorId(id, dadosAtualizados) {
  return Usuario.findByIdAndUpdate(id, dadosAtualizados, {
    new: true,
    runValidators: true,
  });
}
```

O `runValidators: true` é importante porque faz as validações do Schema continuarem valendo durante atualizações.

### `src/services/auth.service.js`

O `AuthService` concentra as regras de cadastro, login, senha e token.

#### Validação de senha

```js
function validarSenha(senha) {
  if (!senha || senha.length < 6) {
    throw criarErro("A senha deve ter pelo menos 6 caracteres.", 400);
  }
}
```

O service valida a senha antes de criar hash. Neste boilerplate, a regra mínima é simples: pelo menos 6 caracteres.

#### Geração do token JWT

```js
function gerarToken(usuario) {
  if (!process.env.JWT_SECRET) {
    throw criarErro("JWT_SECRET não configurado no ambiente.", 500);
  }

  const dadosDoToken = {
    id: usuario._id.toString(),
    email: usuario.email,
  };

  const opcoesDoToken = {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  };

  const token = jwt.sign(
    dadosDoToken,
    process.env.JWT_SECRET,
    opcoesDoToken
  );

  return token;
}
```

O token guarda dados mínimos do usuário:

| Dado | Motivo |
| --- | --- |
| `id` | Identificar o usuário nas rotas protegidas |
| `email` | Apoiar logs, auditoria simples ou verificações futuras |

O token é assinado com `JWT_SECRET`. Sem essa chave, a API não consegue garantir que o token é confiável.

#### Cadastro com bcrypt

```js
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
const senhaHash = await bcrypt.hash(senha, saltRounds);

const usuarioCriado = await UsuarioRepository.criar({
  nome: nome.trim(),
  email: emailNormalizado,
  senhaHash,
});
```

Aqui acontece a parte mais importante do cadastro: a senha pura vira `senhaHash`. O banco recebe somente o hash.

Fluxo do cadastro:

```txt
Recebe nome, email e senha
Valida campos obrigatórios
Valida tamanho mínimo da senha
Normaliza email
Verifica se o email já existe
Gera senhaHash com bcrypt
Cria usuário no MongoDB
Retorna usuário seguro e token JWT
```

#### Login com comparação segura

```js
const usuario = await UsuarioRepository.buscarPorEmailComSenha(email);

if (!usuario) {
  throw criarErro("Email ou senha incorretos.", 401);
}

const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

if (!senhaCorreta) {
  throw criarErro("Email ou senha incorretos.", 401);
}
```

O login nunca compara senha pura com senha pura. Ele compara:

```txt
senha digitada pelo usuário + senhaHash salva no banco
```

A mensagem de erro é genérica de propósito: ela não revela se o email existe.

### `src/services/usuario.service.js`

Este service cuida das regras do usuário logado.

```js
async function atualizarPerfil(idDoUsuario, dados) {
  if (!dados) {
    throw criarErro("Envie nome e/ou senha para atualizar.", 400);
  }

  const dadosAtualizados = {};

  if (dados.nome) {
    dadosAtualizados.nome = dados.nome.trim();
  }

  if (dados.senha) {
    validarSenha(dados.senha);

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

    dadosAtualizados.senhaHash = await bcrypt.hash(dados.senha, saltRounds);
  }

  if (Object.keys(dadosAtualizados).length === 0) {
    throw criarErro("Envie nome e/ou senha para atualizar.", 400);
  }

  const usuarioAtualizado = await UsuarioRepository.atualizarPorId(idDoUsuario, dadosAtualizados);

  if (!usuarioAtualizado) {
    throw criarErro("Usuário não encontrado.", 404);
  }

  return montarUsuarioSeguro(usuarioAtualizado);
}
```

Esse bloco protege a atualização:

| Proteção | Como acontece |
| --- | --- |
| Campos permitidos | Só aceita `nome` e `senha` |
| Senha segura | Se vier senha nova, gera novo `senhaHash` |
| Body vazio | Retorna erro se nada válido foi enviado |
| Validação do Model | O repository usa `runValidators: true` |

### Controllers

Controller é a única camada que deve lidar diretamente com `req`, `res` e `next`.

Exemplo em `auth.controller.js`:

```js
async function login(req, res, next) {
  try {
    const resultado = await AuthService.login(req.body);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}
```

O padrão é sempre o mesmo:

```txt
Ler dados da requisição
Chamar o service correto
Responder com status e JSON
Enviar erros para next(error)
```

Isso mantém o controller pequeno e fácil de entender.

### Routes

Routes definem o caminho da API.

Em `auth.routes.js`:

```js
router.post("/cadastro", validarCampos.validarCadastro, AuthController.cadastrar);
router.post("/login", validarCampos.validarLogin, AuthController.login);
```

Cada rota faz duas coisas, na ordem:

| Parte | Responsabilidade |
| --- | --- |
| `validarCadastro` / `validarLogin` | Confere se o body tem os campos obrigatórios |
| `AuthController...` | Executa a ação da rota |

Em `usuario.routes.js`:

```js
router.get("/perfil", autenticar, UsuarioController.perfil);
router.patch("/perfil", autenticar, UsuarioController.atualizarPerfil);
router.delete("/perfil", autenticar, UsuarioController.removerMinhaConta);
```

O middleware `autenticar` aparece em cada rota protegida, antes do controller.

### Middlewares

Middlewares são funções que ficam no meio do caminho da requisição.

#### `validarCampos.middleware.js`

Define duas funções de middleware, uma para cada rota de autenticação, e as
exporta juntas em um objeto:

```js
function validarCadastro(req, res, next) {
  const { nome, email, senha } = req.body;
  if (!nome)  return next(criarErro("O campo 'nome' é obrigatório.", 400));
  if (!email) return next(criarErro("O campo 'email' é obrigatório.", 400));
  if (!senha) return next(criarErro("O campo 'senha' é obrigatório.", 400));
  return next();
}

const validarCampos = {
  validarCadastro,
  validarLogin,
};

export default validarCampos;
```

Cada função confere se o body trouxe os campos obrigatórios antes de a
requisição chegar no controller. Se faltar algum, encerra com erro 400.

#### `autenticacao.middleware.js`

```js
const authHeader = req.headers.authorization;
const [tipo, token] = authHeader.split(" ");

if (tipo !== "Bearer" || !token) {
  return next(criarErro("Formato do token inválido. Use: Bearer TOKEN.", 401));
}

const dadosDoToken = jwt.verify(token, process.env.JWT_SECRET);

req.usuario = {
  id: dadosDoToken.id,
  email: dadosDoToken.email,
};
```

Esse middleware valida o JWT e adiciona `req.usuario`. Depois disso, controllers e services sabem qual usuário está autenticado.

#### `erro.middleware.js`

```js
let status = error.status;

if (!status) {
  status = 500;
}

const message = error.message;

return res.status(status).json({ message });
```

Esse middleware centraliza as respostas de erro. Assim os controllers não precisam repetir `res.status(...).json(...)` para cada falha.

### `src/utils/criarErro.js`

```js
function criarErro(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export default criarErro;
```

Esse helper permite criar erros com status HTTP:

```js
throw criarErro("Usuário não encontrado.", 404);
```

O middleware de erro lê esse `status` e transforma em resposta JSON.

---

## Autenticação Completa

Este boilerplate já possui autenticação com cadastro, login e rotas protegidas.

### Cadastro

Endpoint:

```txt
POST /api/auth/cadastro
```

Body:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

O que acontece por dentro:

| Etapa | Arquivo | O que faz |
| --- | --- | --- |
| 1 | `auth.routes.js` | Valida `nome`, `email` e `senha` |
| 2 | `auth.controller.js` | Encaminha o body para o service |
| 3 | `auth.service.js` | Valida senha e email duplicado |
| 4 | `auth.service.js` | Gera `senhaHash` com bcrypt |
| 5 | `usuario.repository.js` | Salva o usuário no MongoDB |
| 6 | `auth.service.js` | Gera token JWT |
| 7 | Controller | Retorna `201 Created` |

Resposta esperada:

```json
{
  "usuario": {
    "_id": "id_do_usuario",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "createdAt": "2026-06-01T00:00:00.000Z",
    "updatedAt": "2026-06-01T00:00:00.000Z"
  },
  "token": "jwt_gerado_aqui"
}
```

Observe que a resposta não contém `senha` nem `senhaHash`.

### Login

Endpoint:

```txt
POST /api/auth/login
```

Body:

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

Fluxo do login:

```txt
Recebe email e senha
Busca usuário pelo email incluindo senhaHash
Compara senha digitada com bcrypt.compare
Se estiver correto, gera JWT
Retorna usuário seguro e token
```

Erro propositalmente genérico:

```json
{
  "message": "Email ou senha incorretos."
}
```

Essa mensagem evita revelar se o problema foi o email ou a senha.

### Rotas protegidas

Depois do login ou cadastro, copie o token e envie no header:

```txt
Authorization: Bearer TOKEN_AQUI
```

Exemplo:

```http
GET http://localhost:3000/api/usuarios/perfil
Authorization: Bearer {{token}}
```

Se o token for válido, o middleware cria:

```js
req.usuario = {
  id: dadosDoToken.id,
  email: dadosDoToken.email,
};
```

Isso permite buscar o perfil do usuário logado sem precisar enviar o ID no body.

---

## bcryptjs e Segurança de Senha

Este projeto usa `bcryptjs`, uma implementação em JavaScript do algoritmo bcrypt.

### Por que não salvar senha pura?

Nunca salve isto no banco:

```json
{
  "senha": "123456"
}
```

Se o banco vazar, todas as senhas ficam expostas imediatamente.

O correto é salvar apenas um hash:

```json
{
  "senhaHash": "$2b$10$..."
}
```

Hash não é criptografia reversível. A aplicação não precisa descobrir a senha original. No login, ela apenas compara a senha digitada com o hash salvo.

### Onde o hash é criado?

No cadastro:

```js
const senhaHash = await bcrypt.hash(senha, saltRounds);
```

Na atualização de senha:

```js
dadosAtualizados.senhaHash = await bcrypt.hash(dados.senha, saltRounds);
```

### Onde a senha é comparada?

No login:

```js
const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
```

### O que é `BCRYPT_SALT_ROUNDS`?

`BCRYPT_SALT_ROUNDS` controla o custo do hash.

```env
BCRYPT_SALT_ROUNDS=10
```

Quanto maior o número:

| Valor maior | Efeito |
| --- | --- |
| Mais segurança contra tentativa em massa | Gerar cada hash fica mais caro |
| Mais custo para o servidor | Cadastro e troca de senha ficam mais lentos |

Para projetos didáticos e APIs pequenas, `10` é um bom ponto de partida.

---

## JWT e Rotas Protegidas

JWT significa **JSON Web Token**. Ele é usado para provar que o usuário fez login.

### Como o token é criado

```js
const dadosDoToken = {
  id: usuario._id.toString(),
  email: usuario.email,
};

const opcoesDoToken = {
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
};

const token = jwt.sign(
  dadosDoToken,
  process.env.JWT_SECRET,
  opcoesDoToken
);

return token;
```

O token possui:

| Parte | Explicação |
| --- | --- |
| Dados do token | Dados mínimos do usuário, como `id` e `email` |
| Chave secreta | Chave privada usada para assinar o token |
| Expiração | Tempo de validade definido por `JWT_EXPIRES_IN` |

### Como o token é verificado

```js
const dadosDoToken = jwt.verify(token, process.env.JWT_SECRET);
```

Se o token foi alterado, expirou ou foi assinado com outro segredo, a verificação falha e a API responde `401 Unauthorized`.

### Autenticação vs autorização

| Conceito | Significado neste projeto |
| --- | --- |
| Autenticação | Saber quem é o usuário logado |
| Autorização | Decidir o que esse usuário pode fazer |

Este boilerplate já resolve a autenticação. Para permissões mais avançadas, você pode adicionar campos como `role`, `tipo` ou `permissoes` no usuário e validar em novos middlewares.

---

## Variáveis de Ambiente

Crie seu `.env` a partir do `.env.example`.

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/nome_do_projeto
JWT_SECRET=troque_essa_chave_por_uma_chave_grande
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
```

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `PORT` | Não no Render | Porta local da aplicação |
| `MONGO_URI` | Sim | Connection string do MongoDB Atlas |
| `JWT_SECRET` | Sim | Chave usada para assinar e verificar tokens |
| `JWT_EXPIRES_IN` | Não | Tempo de validade do JWT |
| `BCRYPT_SALT_ROUNDS` | Não | Custo usado para gerar hash das senhas |

Boas práticas:

- Nunca envie `.env` para o GitHub.
- Use uma `JWT_SECRET` longa, aleatória e exclusiva por projeto.
- Em produção, configure variáveis no painel da plataforma.
- Troque a connection string se ela for exposta acidentalmente.

---

## Rotas Disponíveis

| Método | Rota | Protegida | Controller | Descrição |
| --- | --- | --- | --- | --- |
| `GET` | `/` | Não | `app.js` | Verifica se a API está online |
| `POST` | `/api/auth/cadastro` | Não | `AuthController.cadastrar` | Cria usuário e retorna token |
| `POST` | `/api/auth/login` | Não | `AuthController.login` | Faz login e retorna token |
| `GET` | `/api/usuarios/perfil` | Sim | `UsuarioController.perfil` | Retorna perfil do usuário logado |
| `PATCH` | `/api/usuarios/perfil` | Sim | `UsuarioController.atualizarPerfil` | Atualiza nome e/ou senha |
| `DELETE` | `/api/usuarios/perfil` | Sim | `UsuarioController.removerMinhaConta` | Remove a própria conta |

### Testando com `requests.http`

O arquivo `requests.http` já possui exemplos prontos.

```http
@baseUrl = http://localhost:3000
@token = cole_o_token_aqui

POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "maria@email.com",
  "senha": "123456"
}
```

Depois de fazer login, copie o token para:

```http
@token = token_copiado_aqui
```

E teste uma rota protegida:

```http
GET {{baseUrl}}/api/usuarios/perfil
Authorization: Bearer {{token}}
```

---

## Como Criar Uma Nova Entidade MVC

Exemplo: criar um módulo de produtos.

### 1. Criar o Model

Arquivo:

```txt
src/models/produto.model.js
```

Responsabilidade:

```txt
Definir campos, tipos, obrigatoriedade e validações do produto.
```

Exemplo:

```js
const ProdutoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true,
    },
    preco: {
      type: Number,
      required: [true, "O preço é obrigatório."],
      min: [0, "O preço não pode ser negativo."],
    },
  },
  { timestamps: true }
);
```

### 2. Criar o Repository

Arquivo:

```txt
src/repositories/produto.repository.js
```

Responsabilidade:

```txt
Concentrar as consultas ao MongoDB.
```

Exemplos de funções:

```js
async function criar(dados) {
  return Produto.create(dados);
}

async function listarTodos() {
  return Produto.find().sort({ createdAt: -1 });
}
```

### 3. Criar o Service

Arquivo:

```txt
src/services/produto.service.js
```

Responsabilidade:

```txt
Aplicar regras de negócio antes de chamar o repository.
```

Exemplos de regras:

- Não permitir preço negativo.
- Verificar se o produto existe antes de atualizar.
- Impedir exclusão se houver dependências.
- Normalizar campos antes de salvar.

### 4. Criar o Controller

Arquivo:

```txt
src/controllers/produto.controller.js
```

Responsabilidade:

```txt
Ler requisição HTTP, chamar o service e responder JSON.
```

Padrão recomendado:

```js
async function criar(req, res, next) {
  try {
    const produto = await ProdutoService.criar(req.body);
    return res.status(201).json({ produto });
  } catch (error) {
    return next(error);
  }
}
```

### 5. Criar as Routes

Arquivo:

```txt
src/routes/produto.routes.js
```

Responsabilidade:

```txt
Definir endpoints e middlewares.
```

Exemplo:

```js
router.post("/", autenticar, ProdutoController.criar);
router.get("/", autenticar, ProdutoController.listar);
router.get("/:id", autenticar, ProdutoController.buscarPorId);
router.patch("/:id", autenticar, ProdutoController.atualizar);
router.delete("/:id", autenticar, ProdutoController.remover);
```

### 6. Registrar no `app.js`

```js
import produtoRoutes from "./routes/produto.routes.js";

app.use("/api/produtos", produtoRoutes);
```

### Checklist da nova entidade

- Criar `model`.
- Criar `repository`.
- Criar `service`.
- Criar `controller`.
- Criar `routes`.
- Registrar as rotas no `app.js`.
- Adicionar exemplos no `requests.http`.
- Atualizar a documentação do projeto.

---

## Arquivos Extras do Projeto

| Arquivo | Para que serve |
| --- | --- |
| `.env.example` | Mostra quais variáveis o projeto precisa |
| `.gitignore` | Evita enviar arquivos sensíveis ou desnecessários |
| `package.json` | Define scripts, dependências e metadados |
| `requests.http` | Permite testar endpoints pelo VS Code |
| `render.yaml` | Configura o deploy da API no Render |
| `README.md` | Documentação principal do repositório |
| `LICENSE` | Texto completo da licença MIT do projeto |

### `package.json`

Script principal:

```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

Esse comando é usado tanto localmente quanto no Render.

### `render.yaml`

O arquivo define como o Render deve publicar a API.

```yaml
services:
  - type: web
    name: lionsdev-api-mvc-boilerplate
    runtime: node
    plan: free
    buildCommand: "npm install"
    startCommand: "npm start"
    autoDeploy: true
```

Ele também declara variáveis de ambiente:

```yaml
envVars:
  - key: NODE_ENV
    value: "production"
  - key: MONGO_URI
    sync: false
  - key: JWT_SECRET
    generateValue: true
  - key: JWT_EXPIRES_IN
    value: "1d"
  - key: BCRYPT_SALT_ROUNDS
    value: "10"
```

`sync: false` indica que o valor sensível deve ser configurado no painel do Render, não salvo no repositório.

---

## Deploy no Render

### Opção 1: usando o `render.yaml`

1. Suba o projeto para o GitHub.
2. Acesse o Render.
3. Crie um novo Blueprint ou conecte o repositório usando o arquivo `render.yaml`.
4. Configure `MONGO_URI` quando o Render pedir.
5. Confirme o deploy.

### Opção 2: configurando manualmente

No Render, crie um **Web Service** com:

| Campo | Valor |
| --- | --- |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Auto Deploy | Ativado, se quiser publicar a cada push |

Variáveis de ambiente:

| Key | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `MONGO_URI` | Connection string do MongoDB Atlas |
| `JWT_SECRET` | Chave grande e secreta |
| `JWT_EXPIRES_IN` | `1d` |
| `BCRYPT_SALT_ROUNDS` | `10` |

Não configure `PORT` manualmente no Render. A plataforma injeta essa variável automaticamente, e o projeto já usa:

```js
const PORT = process.env.PORT || 3000;
```

### Cuidados no deploy

- Configure `MONGO_URI` como variável secreta.
- Não coloque `.env` no GitHub.
- Confirme se o MongoDB Atlas permite conexão da aplicação hospedada.
- Use uma `JWT_SECRET` diferente da usada localmente.
- Teste `/` depois do deploy para confirmar que a API está online.
- Teste cadastro e login em produção usando `requests.http` ou outra ferramenta HTTP.

---

## Checklist de Segurança

- Salvar `senhaHash`, nunca `senha`.
- Usar `bcrypt.hash` no cadastro e na troca de senha.
- Usar `bcrypt.compare` no login.
- Manter `senhaHash` com `select: false`.
- Remover `senhaHash` antes de responder para o cliente.
- Usar mensagem genérica em falha de login.
- Proteger rotas privadas com JWT.
- Enviar token no formato `Authorization: Bearer TOKEN`.
- Guardar `JWT_SECRET` apenas em variável de ambiente.
- Nunca versionar `.env`.
- Colocar regra de negócio no service.
- Colocar acesso ao banco no repository.
- Usar middleware central para erros.
- Validar dados antes de salvar.
- Usar `runValidators: true` em updates do Mongoose.

---

## Padrão de Resposta

O projeto segue respostas JSON simples e previsíveis.

Sucesso no cadastro ou login:

```json
{
  "usuario": {
    "_id": "id_do_usuario",
    "nome": "Maria Silva",
    "email": "maria@email.com"
  },
  "token": "jwt_gerado_aqui"
}
```

Erro:

```json
{
  "message": "Mensagem explicando o erro."
}
```

---

## Boas Práticas Para Evoluir Este Boilerplate

- Crie uma pasta por camada, não uma pasta gigante com tudo misturado.
- Não coloque `req` e `res` dentro de services.
- Não chame `Model.find...` dentro de controllers.
- Não repita validações iguais em vários lugares.
- Crie middlewares para regras que se repetem em várias rotas.
- Retorne sempre JSON em APIs REST.
- Use status HTTP coerentes: `201`, `200`, `400`, `401`, `404`, `409` e `500`.
- Atualize `requests.http` sempre que criar uma rota nova.
- Atualize este README sempre que a estrutura mudar.

---

## Licença

Este projeto está sob licença MIT, conforme definido no `package.json` e no arquivo `LICENSE`.

---

<div align="center">

Feito para acelerar o começo de APIs Express com uma estrutura clara, segura e fácil de ensinar.

</div>
