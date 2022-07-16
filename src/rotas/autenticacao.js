/* eslint-disable max-len */
import Router from 'koa-router';
import Auth from '../services/auth.js';


const router = new Router();

const Autenticacao = router
// ENDPOINTS
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
  });
export default Autenticacao;
