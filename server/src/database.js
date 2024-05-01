import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'})
const { DB_HOST, DB_PASSWORD } = process.env

const sequelize = new Sequelize('auctions', DB_HOST, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.options.logging = false;

export default sequelize;
