const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configuración del servidor de Socket.io
io.on('connection', (socket) => {
    // Lógica de manejo de conexiones de clientes aquí
    socket.on('offerFromOtherUser', (offer) => {
        // Aquí generarías la respuesta del otro usuario
        const respuesta = '¡Esta es la respuesta del otro usuario!';

        // Emitir la respuesta al usuario que envió la oferta
        socket.emit('answerFromOtherUser', respuesta);
    });
});

http.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});

