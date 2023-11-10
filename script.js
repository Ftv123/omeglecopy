const socket = io();
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const startCallButton = document.getElementById('start-call');

let localStream;
let peerConnection;

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
 .then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
 });

socket.on('connect', () => {
    socket.emit('join');
});

socket.on('joined', data => {
    // You can show a message here that the user has successfully joined
});

socket.on('ready', () => {
    startCallButton.disabled = false;
});

socket.on('offer', async data => {
    const offer = new RTCSessionDescription(data.offer);
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit('answer', { answer });
});

socket.on('answer', async data => {
    const answer = new RTCSessionDescription(data.answer);
    await peerConnection.setRemoteDescription(answer);
});

socket.on('candidate', async data => {
    const candidate = new RTCIceCandidate(data.candidate);
    await peerConnection.addIceCandidate(candidate);
});

startCallButton.addEventListener('click', async () => {
    startCallButton.disabled = true;
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('candidate', { candidate: event.candidate });
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit('offer', { offer });
});
