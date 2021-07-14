const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
	{
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize
	}
);

module.exports = Comment;
