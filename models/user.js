module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
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
};
