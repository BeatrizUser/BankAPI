import Sequelize from 'sequelize';
import database from '../../_config/db.js';

const Conta = database.define('conta', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contaprincipal: Sequelize.DOUBLE,
  contapoupanca: Sequelize.DOUBLE,

}, { timestamps: false });

Conta.afterCreate(async (conta, options) => {
  console.log('Nova conta criada com sucesso!');
  console.log(`Titular: ${conta.firstname} ${conta.lastname}`);
  console.log(`User: ${conta.user}`);
  console.log(`Senha: ${conta.password}`);
});

await Conta.sync();
// await Conta.sync({ force: true });

export default Conta;
