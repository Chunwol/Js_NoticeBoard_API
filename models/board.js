module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define('board', {
    pk: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_pk: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  });
  board.associate = models => {
    board.belongsTo(models.user, {
      foreignKey: 'user_pk'
    });
  };

  return board;
};
