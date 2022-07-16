import database from '../db/models/conta.js';

const Auth = (payload) => database.findOne({ where: payload });

export default Auth;
