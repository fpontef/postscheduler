# Teste APOIA.se

- Deixei o .env disponível para faciltiar o acesso ao banco de dados remoto, via Atlas (Cloud MongoDB)

- Incluí uma listagem com botão de apagar a postagem, sem muita estilização para facilitar a testagem.

## Utilizado

- Node LTS, Express, Prisma ORM, MongoDB
- NextJS, ReactJS

## Build do Projeto

O controle e pastas `node_modules` do backend ficarão na pasta raiz do projeto, pois usei o concurrently para sincronizar a incialização.

### Backend

- Instalação dos pacotes

Na pasta raiz do projeto que foi clonado na máquina fazer um:

```bash
npm install

# Instalação das dependências de desenvolvimento: concurrently e nodemon, necessárias para a api
npm install -D
```

### Frontend

- Instalação dos Pacotes

```bash
cd frontend
npm install
```

## Inicialização do projeto

- Na pasta raiz do projeto `postscheduler`:

```bash
# Inicia api(http://localhost:5000) e cliente(http://localhost:3000)
npm run dev

# Inicia somente a api
npm run server

# Inicia somente o cliente
npm run client
```

## Rotas da API

- GET
`http://localhost:5000/api/posts`

- POST
`http://localhost:5000/api/posts`
`http://localhost:5000/api/posts?scheduledDate='2023-01-17T22:24:01.015Z`

- DELETE
`http://localhost:5000/api/posts/:postId`

## Telas do projeto

![Mobile Form](https://github.com/fpontef/postscheduler/blob/main/screenshots/mobile_form.png?raw=true)

![Desktop Form](https://github.com/fpontef/postscheduler/blob/main/screenshots/desktop_form.png?raw=true)

![Desktop Form Agendamento](https://github.com/fpontef/postscheduler/blob/main/screenshots/desktop_form_agendamento.png?raw=true)

![Desktop Lista](https://github.com/fpontef/postscheduler/blob/main/screenshots/desktop_lista.png?raw=true)
