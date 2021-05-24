const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model { }

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING(62),
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(62),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING(60),
			allowNull: false,
			validate: {
				len: [7],
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'user',
	}
);

User.addHook('beforeCreate', async (user) => {
	user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
