module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    pk: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    board_pk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_pk: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  });
  comment.associate = models => {
    comment.belongsTo(models.board, {
      foreignKey: 'board_pk'
    });
    comment.belongsTo(models.user, {
      foreignKey: 'user_pk'
    });
  };
  return comment;
};
