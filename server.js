const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configuración del servidor de Socket.io
io.on('connection', (socket) => {
    // Tu lógica de manejo de conexiones de clientes aquí
});

http.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});




    </script>
</body>
</html>
