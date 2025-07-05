import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });
let client = null;

wss.on('connection', (ws) => {
  if (!client) client = ws;
  ws.on('message', (msg) => {
    wss.clients.forEach(c => {
      if (c !== ws && c.readyState === WebSocket.OPEN) {
        c.send(msg);
      }
    });
  });
  ws.on('close', () => { if (ws === client) client = null; });
});

console.log('Signaling server escuchando en ws://localhost:3001');
