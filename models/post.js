module.exports = (sequelize, DataTypes) => {
    let post =  sequelize.define('post', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        writer: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    });
    post.associate = models => {
        post.belongsTo(models.user, {
            foreignKey: "userid"
        })
    };

    return post;
}