const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// https://app.betrybe.com/course/live-lectures/sd-cohort-10-a#aula-283-nodejs-testando-apis-com-testes-de-integracao

const {
  StatusCodes: {
    CREATED, BAD_REQUEST, OK, UNAUTHORIZED, CONFLICT, NOT_FOUND, NO_CONTENT,
  },
} = require('http-status-codes');
const server = require('../index');

describe("1 - Utilizando a rota '/users' ", () => {
  describe('ao tentar criar um novo usuário com sucesso', async () => {
    let response;

    response = await chai.request(server)
      .post('/users')
      .send({
        displayName: 'Gabriel Oliva', email: 'gabrielOliva@trybe.com', password: '123456',
      });

    it('retorna Status HTTP 201 - "CREATED"', () => {
      expect(response).to.have.status(CREATED);
    });

    it('retorna um Objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('com a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
    it('e que o token não venha vazio', () => {
      expect(response.body.token).to.not.be.empty;
    });
  });

  describe('Checa se o usuário é único', async () => {
    let response;
    before(async () => {
      await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel Oliva', email: 'gabrielOliva@trybe.com', password: '123456',
        });
    });
    response = await chai.request(server)
      .post('/users')
      .send({
        displayName: 'Gabriel Oliva', email: 'gabrielOliva@trybe.com', password: '123456',
      });

    it("retorna status HTTP - 409 'CONFLICT' ", () => {
      expect(response).to.have.status(CONFLICT);
    });
    it('retorna um Objeto', () => {
      expect(response.body).to.be.a('object');
    });
    it("com a propriedade 'message'", () => {
      expect(response.body).to.have.property('message');
    });
    it("com a mensagem 'Usuário já existe'", () => {
      expect(response.body.message).to.be.equal('Usuário já existe');
    });
  });

  describe('checa se o usuário está inserindo os inputs corretamente', () => {
    it("Verifica se 'displayName' foi inserido!", async () => {
      let response;
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'gabrielOliva@trybe.com', password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal("'displayName' is required");
    });

    it("Verifica se 'displayName' possui ao menos 8 caracteres!", async () => {
      let response;

      response = await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel', email: 'gabrielOliva@trybe.com', password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(
        "'displayName' length must be at least 8 characters long",
      );
    });
    it('Email é requerido!', async () => {
      let response;

      response = await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel Oliva', password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal("'email' is required");
    });
    it('Email sem o nome do usuário!', async () => {
      let response;

      response = await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel Oliva', email: '@trybe.com', password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(
        "'email' must be a valid email",
      );
    });
    it('Email sem o domínio!', async () => {
      let response;

      response = await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel Oliva', email: 'gabrielOliva', password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(
        "'email' must be a valid email",
      );
    });
    it('Password é requerido!', async () => {
      let response;

      response = await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel Oliva', email: 'gabrielOliva@trybe.com',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal("'password' is required");
    });
    it("Verifica se 'password' possui ao menos 6 caracteres!", async () => {
      let response;

      response = await chai.request(server)
        .post('/users')
        .send({
          displayName: 'Gabriel Oliva', email: 'gabrielOliva@trybe.com', password: '12345',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(
        "'password' length must be at least 6 characters long",
      );
    });
  });
});

describe("2 - Utilizando a rota '/login'", () => {
  describe('chega se o usuário loga da forma correta', async () => {
    let response;

    response = await chai.request(server)
      .post('/login')
      .send({
        email: 'gabrielOliva@trybe.com', password: '123456',
      });
    it('retorna Status HTTP 200 - "OK"', () => {
      expect(response).to.have.status(OK);
    });
    it('retorna um Objeto', () => {
      expect(response.body).to.be.a('object');
    });
    it('com a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('checa se o usuário está inserindo os inputs corretamente', () => {
    it('Email é requerido!', async () => {
      let response;

      response = await chai.request(server)
        .post('/login')
        .send({
          password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal("'email' is required");
    });
    it('Email não pode ser vazio!', async () => {
      let response;

      response = await chai.request(server)
        .post('/login')
        .send({
          email: '', password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(
        "'email' is not allowed to be empty",
      );
    });
    it('Password é requerido!', async () => {
      let response;

      response = await chai.request(server)
        .post('/login')
        .send({
          password: '123456',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal("'password' is required");
    });
    it('Password não pode ser vazio!', async () => {
      let response;

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'gabrielOliva@trybe.com', password: '',
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal(
        "'password' is not allowed to be empty",
      );
    });
    it('Verifica se as credenciais estão incorretas', async () => {
      let response;

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'gabrielOliva@trybe.com', password: '654321',
        });

      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Campos inválidos');
    });
    it('Verifica se as credenciais estão incorretas', async () => {
      let response;

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'gabrielOlivaDaSilva@trybe.com', password: '123456',
        });

      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Campos inválidos');
    });
  });
});

describe("3 - Utilizando a rota GET '/user'", () => {
  describe('Verifica-se a possibilidade de obter a lista de todos os usuários', () => {
    let response;
    let Authorization;

    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).post('/login').send({
        email: 'silvinha.gianattasio@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });

    it('Devidamente autenticado', async () => {
      response = await chai
        .request(server)
        .get('/user')
        .set({ Authorization });
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a('array');
    });
    it('Sem o token', async () => {
      response = await chai
        .request(server)
        .get('/user');
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token não encontrado');
    });
    it('Token adulterado', async () => {
      const wrongToken = 'notRealToken';
      response = await chai
        .request(server)
        .get('/user')
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token expirado ou inválido');
    });
  });
});

describe("4 - Utilizando a rota GET '/user/:id'", () => {
  let response;
  let Authorization;

  before(async () => {
    const {
      body: { token },
    } = await chai.request(server).get('/login').send({
      email: 'marina.drummond@trybe.com',
      password: '123456',
    });
    Authorization = token;
  });
  describe('Verifica-se retorna a pessoa usuária buscada', () => {
    it('Devidamente autenticado', async () => {
      response = await chai
        .request(server)
        .get('/user/1')
        .set({ Authorization });
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('displayName');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('image');
    });
    it('se a pessoa usuária não existe', async () => {
      response = await chai
        .request(server)
        .get('/user/99999999999999999999999999')
        .set({ Authorization });
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Usuário não existe');
    });
    it('Sem o token', async () => {
      response = await chai
        .request(server)
        .get('/user/1');
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token não encontrado');
    });
    it('Token adulterado', async () => {
      const wrongToken = 'xablau';
      response = await chai
        .request(server)
        .get('/user/1')
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token expirado ou inválido');
    });
  });
});

describe("5 - Utilizando a rota DELETE '/users/me'", () => {
  describe('Verifica-se deleta o usuário', () => {
    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).get('/login').send({
        email: 'marina.drummond@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });
    it('Obtendo sucesso', async () => {
      response = await chai
        .request(server)
        .delete('/user/me')
        .set({ Authorization });
      expect(response).to.have.status(NO_CONTENT);
    });
    it('Sem o token', async () => {
      response = await chai
        .request(server)
        .delete('/user/me');
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token não encontrado');
    });
    it('Token adulterado', async () => {
      const wrongToken = 'SempreÉBomPraticar';
      response = await chai
        .request(server)
        .delete('/user/me')
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token expirado ou inválido');
    });
  });
});
