import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import User from './user.js'
import Bid from './bid.js'

const Auction = sequelize.define('Auction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    itemDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bid: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
    },
    highestBid: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true,
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dispatch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bidStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bidLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sellersDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    returns: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, // Disable Sequelize's built-in timestamps
});

const AuctionImage = sequelize.define('AuctionImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    auctionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Define associations
Auction.hasMany(AuctionImage, { foreignKey: 'auctionId' });
Auction.belongsTo(User, { foreignKey: 'userId' })
Auction.hasMany(AuctionImage, {foreignKey: 'auctionId'})
AuctionImage.belongsTo(Auction, { foreignKey: 'auctionId' });
User.hasMany(Auction, { foreignKey: 'userId' })
Auction.hasMany(Bid, { foreignKey: 'auctionId' })
Bid.belongsTo(Auction, {foreignKey: 'auctionId'})

export { Auction, AuctionImage };
