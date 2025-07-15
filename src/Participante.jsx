import React, { useEffect, useRef } from 'react';

function Participante() {
  const localVideoRef = useRef(null);
  const pc = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    const start = async () => {
      // Obtener la webcam del participante
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Crear peer connection
      pc.current = new RTCPeerConnection();

      stream.getTracks().forEach(track => {
        pc.current.addTrack(track, stream);
      });

      // Conectarse al servidor WebSocket
      ws.current = new WebSocket('ws://localhost:3001');

      ws.current.onopen = async () => {
        // Crear una offer
        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);
        ws.current.send(JSON.stringify(offer));
      };

      ws.current.onmessage = async ({ data }) => {
  const msg = JSON.parse(data);

  if (msg.type === 'answer') {
    await pc.current.setRemoteDescription(new RTCSessionDescription(msg));
  }

  if (msg.type === 'candidate') {
    await pc.current.addIceCandidate(new RTCIceCandidate(msg.candidate));
  }
};
    };

    start();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
      <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '80%', border: '4px solid white' }} />
    </div>
  );
}

export default Participante;
