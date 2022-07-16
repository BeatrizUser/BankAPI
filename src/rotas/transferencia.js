/* eslint-disable import/extensions */
import Router from 'koa-router';
import Extrato from '../db/models/extrato.js';
import Conta from '../db/models/conta.js';

const router = new Router();

const Transferencia = router
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
export default Transferencia;
