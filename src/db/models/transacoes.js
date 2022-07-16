import database from './conta.js';

const Saque = async (valor, id) => {
  await database.update({ contaprincipal: valor }, { where: { id } });
};

export default Saque;
