const express = require('express');
const app = express();

// estamos adotando o servidor do Node ao invés do express
const http = require('http').createServer(app);
const io = require('socket.io') (http);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  socket.on('iniciaChat', (data) => {
    console.log('SERVER: ', data);
    socket.emit('showMessage', data);
    // notificando todos os usuários da nova mensagem
    socket.broadcast.emit('showMessage', data);
  });
});

// executando servidor na porta 5000
http.listen(5000, () => {
  console.log('servidor rodando: http://localhost:5000');
});