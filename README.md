<h1 align="center">:file_cabinet: FinanceAPI</h1>

## :memo: Descrição

Projeto se trata de uma API onde é possível criar um usuário, associar cartões ao usuário e criar transações para cada cartão desejado
onde existe um limite definido para cada cartão.

## :books: Funcionalidades

- <b>CRUD de Usuários</b>
- <b>CRUD de Cartões</b>
- <b>CRUD de Transações</b>

## :wrench: Tecnologias utilizadas

- Node-JS;
- Typeorm;
- PostgresSQL;
- Docker;

## :rocket: Rodando o projeto

Para rodar o repositório é necessário possuir o docker instalado na sua máquina, clonar o mesmo e com o docker já iniciado
rodar o seguinte comando no terminal para que o docker possa baixar a imagem do postgres e inciar o container:

```
docker-compose up -d
```

Instalar dependências:

```
npm install ou yarn
```

iniciar o projeto:

```
npm start ou yarn start
```
