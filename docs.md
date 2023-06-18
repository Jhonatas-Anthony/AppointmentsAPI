Estou começando esse projeto com express e mongodb, onde farei um sistema de agenda de horários para um salão, a proposta desse sistema é que o usuário possa escolher um horário disponível no dia pra si, sem precisar depender do tempo de resposta do  dono do salão. 

Primeiro, pensando nas funcionalidades, irei fazer um cadastro simples de usuário, e para isso irei iniciar o projeto e instalar as dependências;
```bash
npm init -y
```
```bash
npm install express mongoose bcrypt 
```

O bcrypt serve para hash de senha aumentando a segurança.

Para não precisar instalar os drivers do mongo na máquina, usarei o docker para suprir essa finalidade. 

Para rodar o driver do mongo entre na pasta .docker, e dê as permissões para o arquivo mongo - ```chmod 777 mongo```

Para iniciar o driver use: ```./mongo start```
Para parar o driver use: ```./mongo stop```

Com isso, já conseguimos começar o projeto. 

As informações de conexão com o banco de dados estão no arquivo db.js

Dentro da pasta app defini os controllers que estão responsáveis por criar, ver, editar e deletar (CRUD) e também os models que carregam a estrutura de cada tabela. 

Puxando esses arquivos no index.js e rodando o comando ```node index.js``` conseguimos ter acesso ao app na rota [local](127.0.0.1:3000)
