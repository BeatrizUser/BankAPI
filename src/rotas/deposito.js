/* eslint-disable import/extensions */
import Router from 'koa-router';
import Conta from '../db/models/conta.js';
import Extrato from '../db/models/extrato.js';

const router = new Router();

const Deposito = router
// ENDPOINTS
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
  });

export default Deposito;
