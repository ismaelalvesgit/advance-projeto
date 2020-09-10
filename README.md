# Projeto Advance - @Author Ismael Alves <cearaismael1997@gmail.com>

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 8.3.26, [Express.js](https://expressjs.com/pt-br/) versão 4.17.1, 
[mongoDB](https://www.mongodb.com/) versão 3.4.9, [redis](https://redis.io/) versão 6.0.8.

# Projetos desenvolvidos

## Angular
Rode `ng serve` para pode acessar o servidor de desenvolvimento. Navegar para `http://localhost:4200/#`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.
## Express.js
Rode `npm run dev` no cmd para rodar o servidor dev. Navege para `http://localhost:3000`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.
## Cypress.js
Rode `npm run cypress:open` no cmd para iniciar o painel de testes.

# Instalação e configuração de Ambientes

## Ambiente na maquina local
para que este projeto funcione na sua maquina primeiro você vai precisar de algumas ferramentas instaladas em usa maquina
- 1º [node.js](https://nodejs.org/en/) qualquer versão acima da V5
- 2º [Angular CLI](https://github.com/angular/angular-cli) versão 8.3.26 rode o comando ```npm i @angular/cli@8 -g```
- 3º [Cypress.js](https://www.cypress.io/) versão 5.1.0 rode o comando ```npm i cypress -g```
- 4º [mongoDB](https://www.mongodb.com/) versão 3.4.9.

## Ambiente em Docker
Rode ```docker-compose -d up --build``` para gerar o build de todo o ambiente do projeto.

## IMPORTANTE Configuração da base de dados
Antes de iniciar qual ambiente sejá ele `LOCAL | DOCKERIZADO` deve ser criado duas base de dados no [mongoDB](https://www.mongodb.com/) uma para ambiente de DEV outra para ambiente de TEST. Para mais informações veirifique `./backend/config/environments.js` para as variaveis de ambiente ou `./backend/olheaqui/*.png` para demostração da criação das bases de dados usando [robot3T](https://robomongo.org/)

Database Name | User Database | Password Database
--------------|---------------|------------------
advance_dev   |    `root`     | advance2020
advance_test  |    `test`     | advance2020

# Teste
[husky](https://www.npmjs.com/package/husky) versão 3.1.0
para auto teste quando o projeto for subido para o repositorio do git, por motivos de melhor execução dos teste na parte de selecionar drives e etc decedi usar [cypress.js](https://www.cypress.io/) 
pois ele vai automaticamente pegar o drive correto para o navegador que instalado no SO de quem vai executar.

# Importante
Não atualizar nenhuma lib pois não estou usando a ultima versão do angula a atualização de alguma lib deste projeto pode levar a falha em sua execução, para que seja possivel executar os teste devera
esta rodando no SO este projeto.

## Mais Ajuda
Deixei outros `README.md` nas pastas dos prejeto com maior detalhamento do projeto respectivo.

## Extra 
O projeto BACKEND possui uma documentação das rotas da api basta roda o comando ```npm run doc```, depois
navegar para `http://localhost:3000/documentacao/`, tambem deixei um arquivo localicado `./backend/docker-compose.yml` para facilitar os teste teste projeto.

![App UI](/app.png)