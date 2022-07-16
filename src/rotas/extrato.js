/* eslint-disable import/extensions */
import Router from 'koa-router';
import extrato from '../db/models/extrato.js';

const router = new Router();

const Extrato = router
  .get('/conta/extratos/', async (ctx) => {
    const { request, response } = ctx;
    const { tipo } = request.query;
    if (tipo) {
      const results = await extrato.findOne({ where: { tipo } });
      const result = results == null ? response.body = `Nenhuma transacoa do tipo ${tipo} foi encontrada` : response.body = results;
    } else {
      response.body = 'Informe o tipo de movimentacao.';
    }
  });
export default Extrato;
