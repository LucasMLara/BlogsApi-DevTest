'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Posts',
      [{
        id: 1,
        userId: 1,
        title: 'Título criado pela Silvinha',
        content: 'Conteúdo criado pela Silvinha',
        published:'2022-02-25 21:53:42',
        updated: '2022-02-25 21:54:45'
      },
      {
        id: 2,
        userId: 2,
        title: 'Título criado pela Mari',
        content: 'Content criado pela Mari',
        published:'2022-02-25 21:52:42',
        updated: '2022-02-25 21:53:45'
      },
      {
        id: 3,
        userId: 3,
        title: 'Título criado pelo Goyas',
        content: 'Content criado pelo Goyas',
        published:'2022-02-25 21:51:42',
        updated: '2022-02-25 21:52:45'
      },
      ], { timestamps: false })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
