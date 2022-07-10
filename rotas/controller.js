import Router from 'koa-router';
import Conta from '../src/_db/models/conta.js';
import Extrato from '../src/_db/models/extrato.js';
import Auth from '../src/_db/models/auth.js';
import Saque from '../src/_db/models/auth.js';

const router = new Router();

const Rotas = router
// ENDPOINTS
  .post('/conta/newConta', async (ctx) => {
    const { request, response } = ctx;
    const {
      firstname, lastname, user, password, contaprincipal, contapoupanca,
    } = request.body;

    const NovaConta = await Conta.create({
      firstname,
      lastname,
      user,
      password,
      contaprincipal,
      contapoupanca,
    });
    const results = await Conta.findOne({ where: { firstname } });
    const result = await results == null ? response.body = `Nenhum(a) cliente com o nome ${firstname} foi encontrado(a)` : response.body = results;
  })
  .post('/conta/newTransacao', async (ctx) => {
    const { request, response } = ctx;
    const {
      tipo, fromUser, toUser, valor,
    } = request.body;

    const cadastro = ctx.request.body;

    const NovaTransacao = await Extrato.create({
      tipo,
      fromUser,
      toUser,
      valor,
    });
    const results = await Extrato.findOne({
      where: {
        tipo, fromUser, toUser, valor,
      },
    });
    const result = await results == null ? response.body = `Nenhuma transacao do tipo ${tipo} foi encontrada` : response.body = results;
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
      const user = await Auth(request.body);
      if (user) {
        response.body = user;
      } else {
        response.status = 401;
      }
    }
  })
  .get('/saque', async (ctx) => {
    const { request, response } = ctx;
    const { tipo, valor, id } = request.body;
    const database = Conta;

    if (valor) {
      const saldo = await database.findByPk(id);
      const saque = saldo.contaprincipal - valor;

      await database.update({ contaprincipal: saque }, { where: { id } });

      const ContaSaque = await Conta.findOne({ where: { id } });
      const result = await
      ContaSaque == null
        ? response.body = 'Saque não realizado'
        : response.body = `Saque de R$${valor} foi feito da conta de ${ContaSaque.firstname}. Saldo atual: R$${ContaSaque.contaprincipal}.`;

      const NovaTransacao = await Extrato.create({
        tipo,
        fromUser: ContaSaque.firstname,
        toUser: ContaSaque.firstname,
        valor,
      });
    } else {
      response.body = 'Error';
    }
  })
  .get('/deposito', async (ctx) => {
    const { request, response } = ctx;
    const {
      tipo, valor, id, fromUser, toUser,
    } = request.body;
    const database = Conta;

    if (valor) {
      const saldo = await database.findByPk(id);
      const deposito = saldo.contaprincipal + valor;

      await database.update({ contaprincipal: deposito }, { where: { id } });

      const ContaDeposito = await Extrato.findOne({ where: { tipo, valor, id } });
      const result = await
      ContaDeposito
        ? response.body = 'Deposito não realizado'
        : response.body = `Depósito de R$${valor} foi feito!`;

      const NovaTransacao = Extrato.create({
        tipo,
        fromUser,
        toUser,
        valor,
      });
    } else {
      response.body = 'Error';
    }
  })
  .get('/transferencia', async (ctx) => {
    const { request, response } = ctx;
    const {
      tipo, valor, id, to,
    } = request.body;
    const database = Conta;

    if (valor) {
      const saldo1 = await database.findByPk(id);
      const transfer1 = saldo1.contaprincipal - valor;

      const saldo2 = await database.findByPk(to);
      const transfer2 = saldo2.contaprincipal + valor;

      const conta1 = await database.update({ contaprincipal: transfer1 }, { where: { id } });
      const conta2 = await database.update({ contaprincipal: transfer2 }, { where: { id: to } });

      const idAtualizado = await database.findByPk(to);

      const NovaTransacao = await Extrato.create({
        tipo,
        fromUser: id,
        toUser: to,
        valor,
      });

      response.body = idAtualizado;
    } else {
      response.body = 'Error';
    }
  });
export default Rotas;
