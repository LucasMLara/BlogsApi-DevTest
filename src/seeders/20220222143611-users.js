module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Silvinha Gianattasio',
        email: 'silvinha.gianattasio@trybe.com',
        password: '123456',
        image: '../../assets/silvinha.png',
      },
      {
        id: 2,
        displayName: 'Marina Drummond',
        email: 'marina.drummond@trybe.com',
        password: '123456',
        image: '../../assets/mari.jpeg',
      },
      {
        id: 3,
        displayName: 'Matheus Goyas',
        email: 'matheus.goyas@trybe.com',
        password: '123456',
        image: '../../assets/goyas.jpeg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
