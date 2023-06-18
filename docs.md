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

