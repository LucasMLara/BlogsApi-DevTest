const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    OK,
    UNAUTHORIZED,
    NOT_FOUND,
    NO_CONTENT,
  },
} = require('http-status-codes');
const server = require('../index');

describe("6 - Utilizando a rota POST '/post' ", () => {
  describe('ao tentar criar um novo post', () => {
    let response;
    let Authorization;
    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).post('/login').send({
        email: 'marina.drummond@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });
    it('retorna Status HTTP 201 - "CREATED"', async () => {
      response = await chai
        .request(server)
        .post('/post')
        .send({
          title: 'Eu Quero trabalhar na Trybe',
          content: 'Tomara que eu consiga',
        })
        .set({ Authorization });
      expect(response).to.have.status(CREATED);
    });
    it('retorna um Objeto com as propriedades corretas', async () => {
      const ALLOWED_KEYS = ['title', 'content', 'userId'];
      response = await chai
        .request(server)
        .post('/post')
        .send({
          title: 'Eu Quero trabalhar na Trybe',
          content: 'Tomara que eu consiga',
        })
        .set({ Authorization });
      expect(response.body).to.have.all.keys(...ALLOWED_KEYS);
    });
    it('Sem o token', async () => {
      response = await chai.request(server).post('/post').send({
        title: 'Eu Quero trabalhar na Trybe',
        content: 'Tomara que eu consiga',
      });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({ message: 'Token não encontrado' });
    });

    it('Token adulterado', async () => {
      const wrongToken = 'xablau';
      response = await chai
        .request(server)
        .post('/post')
        .send({
          title: 'Eu Quero trabalhar na Trybe',
          content: 'Tomara que eu consiga',
        })
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        message: 'Token expirado ou inválido',
      });
    });
    describe('checa se o usuário está inserindo os inputs corretamente', () => {
      it('Se o título está sendo inserido', async () => {
        response = await chai
          .request(server)
          .post('/post')
          .send({ content: 'Tomara que eu consiga' })
          .set({ Authorization });
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.deep.equal({ message: '"title" is required' });
      });

      it('Se o conteúdo está sendo inserido', async () => {
        response = await chai
          .request(server)
          .post('/post')
          .send({ title: 'Eu Quero trabalhar na Trybe' })
          .set({ Authorization });
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.deep.equal({
          message: '"content" is required',
        });
      });
    });
  });
});

describe("7 - Utilizando a rota GET '/post'", () => {
  describe('checa se o usuário consegue a lista de posts corretamente', () => {
    let response;
    let Authorization;
    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).post('/login').send({
        email: 'marina.drummond@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });
    it('retorna a lista de Posts com sucesso', async () => {
      response = await chai.request(server).get('/post').set({ Authorization });
      expect(response).to.have.status(OK);
      expect(response.body).to.be.a('array');
    });
  });
  describe('Verifica-se existe autenticação para obter a lista de todos os posts', () => {
    let response;
    it('Sem o token', async () => {
      response = await chai
        .request(server)
        .get('/post');
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({ message: 'Token não encontrado' });
    });
    it('Token adulterado', async () => {
      const wrongToken = 'tokenAdulterado';
      response = await chai
        .request(server)
        .get('/post')
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        message: 'Token expirado ou inválido',
      });
    });
  });
});

describe("8 - Utilizando a rota GET '/post/:id'", () => {
  describe('Verifica-se a possibilidade de obter um post específico', () => {
    let response;
    let Authorization;
    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).post('/login').send({
        email: 'marina.drummond@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });
    it('Devidamente autenticado', async () => {
      response = await chai
        .request(server)
        .get('/post/2')
        .set({ Authorization });
      expect(response).to.have.status(OK);
      expect(response.body).to.have.all.keys(
        'id',
        'published',
        'updated',
        'title',
        'content',
        'user',
      );
      expect(response.body.user).to.have.all.keys(
        'id',
        'displayName',
        'email',
        'image',
      );
    });
    it('Sem o token', async () => {
      response = await chai.request(server).get('/post/:id');
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({ message: 'Token não encontrado' });
    });
    it('Token adulterado', async () => {
      const wrongToken = 'TokenAdult';
      response = await chai
        .request(server)
        .get('/post/:id')
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        message: 'Token expirado ou inválido',
      });
    });
    it('Verifica se o post existe', async () => {
      response = await chai
        .request(server)
        .get('/post/9999999999999')
        .set({ Authorization });
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.deep.equal({ message: 'Post não existe' });
    });
  });
});

describe("9 - Utilizando a rota PUT '/post/:id'", () => {
  describe('Verifica-se o post é editado com sucesso', () => {
    let response;
    let Authorization;
    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).post('/login').send({
        email: 'marina.drummond@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });
    it('Devidamente autenticado', async () => {
      const ALLOWED_BODY_KEYS = ['id', 'title', 'content', 'published', 'updated', 'user'];
      const ALLOWED_USER_KEYS = ['id', 'displayName', 'email', 'image'];
      response = await chai
        .request(server)
        .put('/post/2')
        .send({ title: 'Verdades absolutas', content: 'Nunca neguei' })
        .set({ Authorization });
      expect(response).to.have.status(OK);
      expect(response.body).to.have.all.keys(...ALLOWED_BODY_KEYS);
      expect(response.body.user).to.have.all.keys(...ALLOWED_USER_KEYS);
    });
    it('Verifica se o post existe', async () => {
      response = await chai
        .request(server)
        .put('/post/9999999999999')
        .send({ title: 'Titulo do post', content: 'Conteudo do post' })
        .set({ Authorization });
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.deep.equal({ message: 'Post não existe' });
    });
    it('Se o título está sendo inserido', async () => {
      response = await chai
        .request(server)
        .put('/post/1')
        .send({ content: 'Conteudo do post' })
        .set({ Authorization });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.deep.equal({ message: '"title" is required' });
    });
    it('Se o conteúdo está sendo inserido', async () => {
      response = await chai
        .request(server)
        .put('/post/1')
        .send({ title: 'Título do Post' })
        .set({ Authorization });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.deep.equal({ message: '"content" is required' });
    });

    it('somente o dono do post pode edita-lo', async () => {
      response = await chai
        .request(server)
        .put('/post/1')
        .send({ title: 'Título do Post', content: 'Conteudo do Post' })
        .set({ Authorization });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        message: 'Usuário não autorizado',
      });
    });
    it('Sem o token', async () => {
      response = await chai
        .request(server)
        .put('/post/1')
        .send({ title: 'Título do Post', content: 'Conteudo do Post' });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({ message: 'Token não encontrado' });
    });
    it('Token adulterado', async () => {
      const wrongToken = 'TokenAdulterado';
      response = await chai
        .request(server)
        .put('/post/1')
        .send({ title: 'Título do Post', content: 'Conteudo do Post' })
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        message: 'Token expirado ou inválido',
      });
    });
  });
});

describe("10 - Utilizando a rota DELETE '/post/:id'", () => {
  describe('Verifica-se deleta o post', () => {
    let response;
    let Authorization;
    before(async () => {
      const {
        body: { token },
      } = await chai.request(server).post('/login').send({
        email: 'marina.drummond@trybe.com',
        password: '123456',
      });
      Authorization = token;
    });
    it('Obtendo sucesso', async () => {
      response = await chai
        .request(server)
        .delete('/post/2')
        .set({ Authorization });
      expect(response).to.have.status(NO_CONTENT);
    });
    it('Sem o token', async () => {
      response = await chai
        .request(server)
        .delete('/post/1');
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Token não encontrado');
    });
    it('Token adulterado', async () => {
      const wrongToken = 'TokenAdulterado';
      response = await chai
        .request(server)
        .delete('/post/1')
        .set({ Authorization: wrongToken });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body.message).to.be.equal('Token expirado ou inválido');
    });
    it('Verifica se o post existe', async () => {
      response = await chai
        .request(server)
        .delete('/post/99999999999999999')
        .set({ Authorization });
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body.message).to.be.equal('Post não existe');
    });

    it('somente o dono do post pode deleta-lo', async () => {
      response = await chai
        .request(server)
        .delete('/post/1')
        .set({ Authorization });
      expect(response).to.have.status(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        message: 'Usuário não autorizado',
      });
    });
  });
});
