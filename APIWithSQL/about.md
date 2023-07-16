# AppoinmentsAPI With SQL

Com a finalidade de implementar a aplicação funcionando com SQL, resolvi usar o SQLite com o sequelize. 

Da maneira que está, caso resolva usar outro banco de dados, basta modificar o arquivo ./config/config.js

Antes de começar, abra a pasta no terminal e digite os seguintes comandos: 
```bash
npm i #Para instalar as dependências
npx sequelize-cli db:migrate #Para realizar as migrações
npx sequelize-cli db:migrate:undo:all #CASO queira apagar as migraçoes
```

Realize as instalações das depências e depois realize as migrações, para que o banco de dados seja criado localmente e as tabelas sejam criadas, após isso, basta iniciar a aplicação com: 
```bash
npm run dev
```

E usar normalmente.

---

## Avisos 
Resolvi usar o SQLite para não baixar o SQL ou o Postgres na minha máquina, porém, se futuramente eu quiser usar algumas dessas tecnologias as mudanças no meu projeto serão mínimas.

Pequenas mudanças no arquivo .env, mudanças no arquivo de conexão, e como estou usando o sequelize para facilitar essa troca de informações entre servidor e banco de dados, os controllers, migrations e models não seriam, ou seriam minimamente modificados. 

Não precisa de docker para rodar essa versão da aplicação, o SQLite funciona em qualquer máquina. 

## Para VSCode
Recomendo baixar a extensão do SQLite do alexcvzz, após isso apertar o comando ctrl + p e digitar "> SQLite: Open Database" e clicar na opção que tiver "dev.sqlite3", dessa forma você irá ter acesso á todas as tabelas. 






