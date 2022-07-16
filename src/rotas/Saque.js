/* eslint-disable import/extensions */
import Router from 'koa-router';
import Extrato from '../db/models/extrato.js';
import Conta from '../db/models/conta.js';

const router = new Router();

const Saque = router

  .get('/conta/saque', async (ctx) => {
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
        fromUser: id,
        toUser: id,
        valor,
      });
    } else {
      response.body = 'Error';
    }
  });

export default Saque;
