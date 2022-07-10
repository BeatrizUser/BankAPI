import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import Rotas from '../rotas/controller.js';

const app = new Koa();
const router = new Router();
app.use(bodyParser());
// ---------------------------------------------------
// ROTAS
app.use(Rotas.routes());

// MIDDLEWARES

// ---------------------------------------------------
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log('Servidor Funcionando em http://localhost:3001');
  console.log('Para encerrar o servidor: ctrl + c');
});
