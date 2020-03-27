//Foi colocado separada do App.js a função de subir o servidor para ele não subir ao realizar os testes automatizados.
const app = require('./app');

app.listen(3333)