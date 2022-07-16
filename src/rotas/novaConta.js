/* eslint-disable import/extensions */
import Router from 'koa-router';
import Conta from '../db/models/conta.js';

const router = new Router();

const NovaConta = router
// ENDPOINTS
  .post('/conta/novaConta', async (ctx) => {
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
  });
export default NovaConta;
