import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import Autenticacao from './rotas/autenticacao.js';
import Deposito from './rotas/deposito.js';
import Transferencia from './rotas/transferencia.js';
import NovaConta from './rotas/novaConta.js';
import Saque from './rotas/Saque.js';
import Movimentacoes from './rotas/movimentacoes.js';
import Extrato from './rotas/extrato.js';

const app = new Koa();
const router = new Router();
app.use(bodyParser());
// ---------------------------------------------------
// ROTAS
app.use(Autenticacao.routes());
app.use(NovaConta.routes());
app.use(Saque.routes());
app.use(Deposito.routes());
app.use(Transferencia.routes());
app.use(Movimentacoes.routes());
app.use(Extrato.routes());
// MIDDLEWARES

// ---------------------------------------------------
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log('Servidor Funcionando em http://localhost:3001');
  console.log('Para encerrar o servidor: ctrl + c');
});
