const express = require('express');
const bodyParser = require('body-parser');
const { error } = require('./src/middlewares');

const { userRouter, loginRouter, postRouter } = require('./src/routes');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);

app.use(error);
