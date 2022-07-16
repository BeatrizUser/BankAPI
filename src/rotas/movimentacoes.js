/* eslint-disable import/extensions */
import Router from 'koa-router';
import Extrato from '../db/models/extrato.js';

const router = new Router();

const Movimentacoes = router
  .get('/adm/movimentacoes', async (ctx) => {
    const { request, response } = ctx;

    if (Extrato == null) {
      response.body = 'Nenhum extrato encontrado!';
    } else {
      const results = await Extrato.findAll();
      response.body = results;
    }
  });
export default Movimentacoes;
