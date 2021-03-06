'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		user_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: 'user_id'
			},
			username: DataTypes.STRING(50)
		}, {
			tableName: 'xf_user',
			timestamps: false,
			classMethods: {
				associate: function(models) {
					this.hasMany(models.UserAuthenticate, {
						foreignKey: 'user_id'
					});
					this.hasMany(models.UserFieldValue, {
						foreignKey: 'user_id'
					});
				}
			},
			instanceMethods: {
				extendWithUUID: function() {
					if (this.uuid !== undefined) {
						return this;
					}

					return this.getUserFieldValues({
						where: {
							fieldId: 'minecraft_uuid'
						}
					})
					.bind(this)
					.then(function (fieldValues) {
						this.uuid = fieldValues[0] ? fieldValues[0].fieldValue : null;
						return this;
					});
				}
			}
		}
	);
	return User;
};
