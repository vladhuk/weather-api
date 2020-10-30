import { Sequelize } from 'sequelize';

export default new Sequelize(process.env.datasource_url!, {
  username: process.env.datasource_username,
  password: process.env.datasource_password,
  logging: false,
  define: {
    timestamps: false,
    underscored: true,
  },
});
