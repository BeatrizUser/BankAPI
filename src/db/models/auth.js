import database from './conta.js';

const Auth = (payload) => database.findOne({ where: payload });

export default Auth;
