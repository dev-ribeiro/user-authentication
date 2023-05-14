const { sequelize } = require('../lib/sequelize')
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING,
    },

    lastName: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = User;
