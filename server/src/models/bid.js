import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Bid = sequelize.define('Bid', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	auctionId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	amount: {
		type: DataTypes.DECIMAL(7, 2),
		allowNull: false,
	},
	timestamp: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
	}
}, {
	timestamps: false
})

export default Bid