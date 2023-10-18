# User Management API
Api para gerenciamento de usuários - Projeto Curso Formação Nodejs

## Documentação da API

Esta documentação descreve as rotas disponíveis para a API, bem como suas funcionalidades. Certifique-se de seguir as diretrizes de autenticação, quando necessário, para acessar essas rotas.

## Dependências

As seguintes dependências são usadas no projeto:

- nodejs
- bcrypt
- body-parser
- express
- jsonwebtoken
- knex
- mysql2


## Usuário

### Criar um novo usuário

Rota: `POST /user`

Esta rota permite criar um novo usuário no sistema.

### Listar todos os usuários

Rota: `GET /user`

Esta rota permite listar todos os usuários no sistema. A autenticação do administrador é necessária.

### Buscar um usuário pelo ID

Rota: `GET /user/:id`

Esta rota permite buscar um usuário pelo ID especificado. A autenticação do administrador é necessária.

### Editar as informações de um usuário

Rota: `PUT /user`

Esta rota permite editar as informações de um usuário no sistema. A autenticação do administrador é necessária.

### Excluir o registro de um usuário

Rota: `DELETE /user/:id`

Esta rota permite excluir o registro de um usuário pelo ID especificado. A autenticação do administrador é necessária.

## Recuperação de Senha

### Recuperar a senha

Rota: `POST /recoverpassword`

Esta rota permite ao usuário solicitar a recuperação da senha.

## Alteração de Senha

### Alteração da senha do usuário

Rota: `POST /changepassword`

Esta rota permite ao usuário alterar sua senha.

## Login do Usuário

### Login do usuário

Rota: `POST /login`

Esta rota permite ao usuário fazer login no sistema.

Certifique-se de fornecer as informações necessárias no corpo da solicitação (por exemplo, JSON) ao acessar essas rotas. Além disso, siga as diretrizes de autenticação, quando aplicável, para garantir a segurança da API.

Lembre-se de que a documentação pode ser atualizada conforme novas funcionalidades são adicionadas ou alterações são feitas na API.
