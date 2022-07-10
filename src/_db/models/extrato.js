import Sequelize from 'sequelize';
import database from '../../_config/db.js';

const Extrato = database.define('extrato', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fromUser: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  toUser: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
}, { timestamps: false });

// Extrato.afterCreate(async (extrato, options) => {
//   console.log(`${extrato.tipo} de R$${extrato.valor} feito com sucesso para ${extrato.toUser}!`);
// });

await Extrato.sync();
// await Extrato.sync({ force: true });

export default Extrato;
