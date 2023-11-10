<!DOCTYPE html>
<html>
<head>
    <title>Video Chat</title>
    <style>
      #videos {
    display: flex;
    justify-content: space-around;
}

video {
    width: 45%;
    border: 1px solid black;
}

    </style>
</head>
<body>
    <div id="videos">
        <video id="localVideo" autoplay muted></video>
        <video id="remoteVideo" autoplay></video>
    </div>
    <button id="randomButton">Conectar con un usuario aleatorio</button>

    <script src="https://cdn.socket.io/4.3.2/socket.io.js"></script>
    <script>
            let localStream;
let remoteStream;
let localVideo = document.getElementById('localVideo');
let remoteVideo = document.getElementById('remoteVideo');

function handleError(error) {
    console.error('Error: ', error);
}

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;

        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const peerConnection = new RTCPeerConnection(configuration);

        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.ontrack = event => {
            remoteStream = event.streams[0];
            remoteVideo.srcObject = remoteStream;
        };

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                // Enviar la candidatura ICE al otro par
                // Código para enviar la candidatura ICE al otro usuario
            }
        };

        const createOffer = async () => {
            try {
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);

                // Enviar la oferta al otro par
                // Código para enviar la oferta al otro usuario

                // Lógica para recibir la respuesta desde el otro par
                // Código para recibir la respuesta del otro usuario
                // Setear la respuesta remota
                // await peerConnection.setRemoteDescription(response);
            } catch (e) {
                console.error('Error al crear la oferta:', e);
            }
        };

        const handleOffer = async (offer) => {
            try {
                await peerConnection.setRemoteDescription(offer);
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);

                // Enviar la respuesta al otro par
                // Código para enviar la respuesta al otro usuario

                // Lógica para recibir la respuesta desde el otro par
                // Código para recibir la respuesta del otro usuario
                // Setear la respuesta remota
                // await peerConnection.setRemoteDescription(response);
            } catch (e) {
                console.error('Error al manejar la oferta:', e);
            }
        };

        // Aquí se deben implementar las funciones que envíen y reciban ofertas, respuestas y candidatos ICE.
    })
    .catch(handleError);



const socket = io('https://omeglecopy.onrender.com'); // Especifica la dirección de tu servidor

socket.on('connect', () => {
    console.log('Conectado al servidor de señalización');
    document.getElementById('randomButton').addEventListener('click', findRandomUser);
});

function findRandomUser() {
    // Emitir evento al servidor para buscar un usuario aleatorio
    socket.emit('randomUser');
}

socket.on('randomUserFound', (randomUserId) => {
    // Lógica para manejar el usuario aleatorio encontrado
    // Aquí puedes establecer la conexión con el usuario aleatorio
    // o realizar cualquier otra lógica necesaria.
});






    </script>
</body>
</html>
