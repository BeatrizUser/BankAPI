import Router from 'koa-router';
import sequelize from '../src/_config/db.js';
import Conta from '../src/_db/models/conta.js';
import Extrato from '../src/_db/models/extrato.js';
import auth from '../src/_db/models/auth.js';

const router = new Router();

const Rotas = router
// ENDPOINTS
  .post('/conta/newConta', async (ctx) => {
    const cliente = ctx.request.body;

    const NovaConta = await Conta.create({
      firstname: cliente.firstname,
      lastname: cliente.lastname,
      user: cliente.user,
      password: cliente.password,
      contaprincipal: cliente.contaprincipal,
      contapoupanca: cliente.contapoupanca,
    });
  })
  .post('/conta/newTransacao', async (ctx) => {
    const transacao = ctx.request.body;

    const NovaTransacao = await Extrato.create({
      tipo: transacao.tipo,
      fromUser: transacao.fromUser,
      toUser: transacao.toUser,
      valor: transacao.valor,
    });
  })
  .get('/conta/extratos/', async (ctx) => {
    const { request, response } = ctx;
    const { tipo } = request.query;
    if (tipo) {
      const results = await Extrato.findOne({ where: { tipo } });
      const result = results == null ? response.body = `Nenhuma transacoa do tipo ${tipo} foi encontrada` : response.body = results;
    } else {
      response.body = 'Informe o tipo de movimentacao.';
    }
  })
  .get('/adm/extratos', async (ctx) => {
    const { request, response } = ctx;

    if (Extrato == null) {
      response.body = 'Nenhum extrato encontrado!';
    } else {
      const results = await Extrato.findAll();
      response.body = results;
    }
  })
  .post('/auth', async (ctx) => {
    const { request, response } = ctx;

    if (!request.body.user && !request.body.password) {
      response.body = 'Informe login e senha válidos';
    } else
    if (!request.body.user) {
      response.body = 'Informe um login válido';
    } else
    if (!request.body.password) {
      response.body = 'Informe uma senha válida';
    } else {
      const user = await auth(request.body);
      if (user) {
        response.body = user;
      } else {
        response.status = 401;
      }
    }
  });
export default Rotas;
