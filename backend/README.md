# para configurar o back end voce precisa primeiro subir ele e depois configurar a autenticação, importante subir o front end junto com ele e ir seguindo os passos

# o projeto esta em nest e necessita de um keycloac instanciado para autenticação com token e um postgres para as entidades

# para start no projeto só iniciar os comandos

# npm install
# npm run start:dev

# a porta dele voce pode mudar no   await app.listen(3002); do main, porem deve mudar no front end também na pasta das variaveis de ambientes que deixei no readme para integrar.

# apos subir o back e o front voce pode fazer as migrations no postgres configurando ele nas 

# apos  migrations banco e front instanciados, podemos instanciar o keycloac apenas descomentando a linha providers e o key cloac no app.module.ts que já deixei pronto para funcionar, porém deve ser instanciado nas envs as configurações semelhantes as instanciadas no keycloac para funcionar, também já deixei em https para facilitar o cors. 

<!-- TYPEORM_CONNECTION='postgres'   /// banco de dados, pode ser mysql
TYPEORM_HOST='localhost' // localhost ou ip, pr
TYPEORM_PORT=5432 // porta do banco de dados 
TYPEORM_USERNAME='usuariodobanco'
TYPEORM_PASSWORD='senhadobanco'
TYPEORM_DATABASE='nomedodatabase' // nome do database para migrations


NODEJS_KEYCLOAC_AUTO_SERVER_URL="https://localhost:9998" // url do keycloac
NODEJS_KEYCLOAC_RESOURCE= 'dev',
NODEJS_KEYCLOAC_REALM='dev',
NODEJS_KEYCLOAC_CLIENT_ID='dev'
NODEJS_KEYCLOAC_SECRET='ASDÇFLKJASDÇFLKASJÇLK' -->

