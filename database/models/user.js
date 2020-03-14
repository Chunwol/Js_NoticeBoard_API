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
  user.associate = function (models) {
    user.hasMany(models.board);
    user.hasMany(models.comment);
  };

  return user;
};
