# AppoinmentsAPI

O intuito deste projeto é criar uma API de agendamento de horários para um salão, onde o usuário vai poder escolher o horário que quiser dentre os disponíveis. 

---
## Aviso

A maioria das informações aqui está para quem vai usar a aplicação com MONGO, se  for usar com SQL veja o about.md dentro da pasta APIWithSQL
---

## Documentação

Irei descrever o processo de criação deste projeto, como usar, e alguns detalhes que foram pensados durante a produção.

Primeiro, pensando nas funcionalidades, irei fazer um cadastro simples de usuário, e para isso irei iniciar o projeto e instalar as dependências;
```bash
npm init -y
```
```bash
npm install express mongoose bcrypt dotenv jsonwebtoken nodemon cookie-parser 
```

O bcrypt serve para hash de senha aumentando a segurança, pois invés de salvar a senha como ela é, vai salvar um hash da senha de acordo com uma seed.

O cookie-parser serve para receber dados através de cookies.

O jsonwebtoken serve para gerar um tokens de autenticação local para os usuários.

O dotenv serve para integrar o arquivo .env nas requisições, guardando variáveis locais e aumentando a segurança da aplicação.

Para não precisar instalar os drivers do mongo na máquina, usarei o docker para suprir essa finalidade. 

---

# Importante: Primeiro acesso
Antes de tudo, baixe as dependências com ```npm install```.
Se você já tiver no seu computador o driver do mongo rodando, pode pular essa parte. Se não tiver, entre no diretório ".docker", e dê as permissões para o arquivo mongo - ```chmod 777 mongo```.

Para baixar a imagem do mongo use: ```./mongo```.

Para iniciar o driver do mongo use: ```./mongo start```.

Para parar o driver do mongo use: ```./mongo stop```.

Após essa etapa, crie um arquivo chamado ".env" no diretório raiz e copie o conteúdo de ".env.example" - Variáveis locais.

Inicie o projeto com o comando ```npm run dev``` - O nodemon está sendo responsável por reiniciar o projeto automaticamente. Agora, conseguimos ter acesso ao app na rota [local](127.0.0.1:3000).

Quando iniciar o projeto se dirija até a rota responsável por [popular](127.0.0.1:3000/user/populate) o banco de dados.

Aqui estão os dados dos usuários de teste: 
| Email  | Senha |
| ------------- | ------------- |
|  jhonatas@gmail.com | password   |
| adm@gmail.com  | password   |
| sub@gmail.com  | password   |
| grosso@gmail.com  | password   |
| lex@gmail.com  | password   |

---

## Sobre o projeto

As informações de conexão com o banco de dados estão no arquivo db.js.

Dentro da pasta app defini os controllers que estão responsáveis por criar, ver, editar e deletar (CRUD) e também os models que carregam a estrutura para criar cada tabela. 

No arquivo index.js está localizado o principal arquivo do projeto, aqui chamo as importações e defino as rotas. 

## Sobre o Modulo de usuários
Nesse primeiro momento julguei necessário que o usuário tivesse apenas nome, e-mail e senha, porém, futuramente pode ser necessário que o usuário tenha informações bancárias ou algumas outras que sigam a regra do negócio que ainda não foi definida totalmente. 

## Sobre o Modulo de horários
Quando o usuário entrar na tela de visualização de horários, o backend vai verificar se já existem dados referentes ao dia atual, se não existir, o sistema vai popular o backend automaticamente e o usuário não sentirá isso. 

Na tabela timeTable, estou considerando que não podem haver dois horários para o mesmo dia, então considerei uma string time(hora) e date(data) como chave composta, e assim, tudo que o sistema faz é conferir o usuário logado e dar um update com o id desse usuário. 

## Sobre a Autenticação

Com tudo funcionando, preciso definir como funcionará a autenticação de usuário, como o sistema saberá quem está logado? quando o usuário clicar em 'Reservar' o sistema já vai saber quem é ele? 

Para resolver essas questões estarei usando o cookie parser e o JsonWebToken(JWT), o JWT é usado para autenticação entre duas partes por meio de um token assinado que autentica uma requisição web. Esse token é um código em que armazena objetos JSON com os dados que permitem a autenticação da requisição. O Cookie parser vai salvar esse token no header do local storage. Então, se esse token existir, é por que existe alguém logado, quando o usuário clica em 'deslogar' o token é apagado, e dessa forma não tem como autenticar, logo o usuário é efetivamente deslogado e o sistema reconhece que não há ninguém logado. 

---

## Problemas enfrentados pelo dev
Quando a aplicação chegou na  fase na qual eu julguei estar terminado, percebi que algumas coisas não se comportavam como devia, o controller de usuários para login e signup demorava entre 15 e 30 segundos para cadastrar um usuário ou autenticar o mesmo com o login. A partir disso eu vi que era um problema de desempenho e comecei a verificar as possíveis causas, o primeiro método que usei já me deu a resposta, soltei alguns console.log no código e com isso, vi que o bcrypt era a causa de todo essa lentidão, então, pesquisando na internet achei o argon2, outro método de hash de senha. Usando o argon2 consegui resolver esse problema de desempenho e agora a aplicação está mais usável. c

---
# Problemas enfrentados por quem vai testar o app

1. Para conectar com o banco de dados
Caso não consiga fazer a conexão com o banco de dados, dois problemas podem estar acontecendo, ou o docker não está funcionando corretamente (1.1), ou, se você já tem o driver do mongo e não usou o docker (1.2).

    1.1. Nesse caso, o problema pode está na má instalação/configuração do docker na sua máquina local, ou no arquiv mongo, se for esse segundo caso é fácil de resolver, entre nesse arquivo e cópie o código da linha 16, cole no terminei e execute, e depois faça o mesmo com o código da linha 6.

    1.2 Infelizmente, nesse caso não tem muito o que fazer, esse projeto foi configurado para funcionar na versão 4.0 do mongodb e pode existir um problema de compatibilidade. Porém, uma possível solução é parar o serviço do mongo rodando, e fazer o procedimento do docker, usando uma imagem, depois parar container quando terminar. Ao reiniciar o computador, por padrão, o driver do mongo vai voltar a rodar automaticamente, ou, invés de reiniciar, pode-se ativá-lo manualmente após parar o container.



