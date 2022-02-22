/**
* @param {import('sequelize').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
* @return
*/
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'Posts',
    timestamps: false,
  });
  Posts.associate = ({ User }) => {
    Posts.belongsTo(User, {
      foreignKey: 'userId', as: 'user',
    });
  };
  return Posts;
};
