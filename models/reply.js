module.exports = (sequelize, DataTypes) => {
    let reply = sequelize.define('reply', {
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        writer: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
    });

    reply.associate = models => {
        reply.belongsTo(models.post, {
          foreignKey: "postid"
        })
    };
    reply.associate = models => {
        reply.belongsTo(models.user, {
          foreignKey: "userid"
        })
    };
    return reply;
}