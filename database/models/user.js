module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    pk: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  });
  user.associate = models => {
    user.hasMany(models.board, {
      foreignKey: "user_pk",
      sourceKey: "pk"
    });
    user.hasMany(models.comment, {
      foreignKey: "user_pk",
      sourceKey: "pk"
    });
  }

  return user;
};
