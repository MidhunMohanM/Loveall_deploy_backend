import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const Transaction = sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'business',
            key: 'business_id'
        },
        onDelete: 'CASCADE'
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    customer_product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discounted_amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    after_discount_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discounted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'transactions',
    timestamps: false
});

export default Transaction;