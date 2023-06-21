O intuito deste projeto é criar uma API de agendamento de horários para um salão, onde o usuário vai poder escolher o horário que quiser dentre os disponíveis. 

Primeiro, pensando nas funcionalidades, irei fazer um cadastro simples de usuário, e para isso irei iniciar o projeto e instalar as dependências;
```bash
npm init -y
```
```bash
npm install express mongoose bcrypt 
```

O bcrypt serve para hash de senha aumentando a segurança, pois invés de salvar a senha como ela é, vai salvar um hash da senha de acordo com uma seed.

Para não precisar instalar os drivers do mongo na máquina, usarei o docker para suprir essa finalidade. 
---

## Importante: Primeiro acesso
Para rodar o driver do mongo entre na pasta .docker, e dê as permissões para o arquivo mongo - ```chmod 777 mongo```

Para iniciar o driver use: ```./mongo start```

Para parar o driver use: ```./mongo stop```

Inicie o projeto com o comando ```npm run dev``` - O nodemon está sendo responsável por reiniciar o projeto automaticamente.

Quando iniciar o projeto se dirija até a rota responsável por [popular](127.0.0.1:3000/user/populate) o banco de dados.

Aqui estão os dados dos usuários de teste: 
| Email  | Senha |
| ------------- | ------------- |
|  jhonatas@gmail.com | 123   |
| adm@gmail.com  | 123   |
| sub@gmail.com  | 123   |
| grosso@gmail.com  | 123   |
| lex@gmail.com  | 123   |

---

As informações de conexão com o banco de dados estão no arquivo db.js

Dentro da pasta app defini os controllers que estão responsáveis por criar, ver, editar e deletar (CRUD) e também os models que carregam a estrutura de cada tabela. 

Puxando esses arquivos no index.js e rodando o comando ```node index.js``` conseguimos ter acesso ao app na rota [local](127.0.0.1:3000)

O nodemon está sendo usado para que o servidor reinicie automaticamente, invés do comanto anterior use 

## Modulo de usuários
Nesse primeiro momento julguei necessário que o usuário tivesse apenas nome, e-mail e senha, porém, futuramente pode ser necessário que o usuário tenha informações bancárias ou algumas outras que sigam a regra do negócio que ainda não foi definida totalmente. 

## Modulo de horários
Nesse primeiro momento, para facilitar o trabalho, estou considerando que o usuário conseguirá visualizar apenas os horários referentes ao dia atual. Quando o usuário entrar na tela de visualização de horários, o backend vai verificar se já existem dados referentes ao dia atual, se não existir, o sistema vai popular o backend automaticamente e o usuário não sentirá isso. 
Futuramente, um input tipo date pode ser incluído para que o usuário escolha qualquer dia que quiser, porém, antes de lançar essa feature, quero ter certeza que o sistema está funcionando. 
Na tabela timeTable, estou considerando que não podem haver dois horários para o mesmo dia, então considerei uma string time(hora) e date(data) como chave composta, e assim, tudo que devo fazer, é dar um put com o id do usuário logado. 

Com tudo funcionando, preciso definir como funcionará a autenticação de usuário, dessa forma, quando o usuário clicar em 'Reservar' o sistema já vai saber quem é ele. 

Estarei usando o cookie parser e o JsonWebToken(JWT), o JWT é usado para autenticação entre duas partes por meio de um token assinado que autentica uma requisição web. Esse token é um código em Base64 que armazena objetos JSON com os dados que permitem a autenticação da requisição. O Cookie parser vai salvar esse token no header da requisição no local storage. Então, se esse token existir, é por que existe alguém logado, quando o usuário clica em 'deslogar' o token é apagado, e dessa forma não tem como autenticar, logo o usuário é efetivamente deslogado. 

Agora, podemos desconstruir esse token e verificar qual o usuário logado com ele. 


