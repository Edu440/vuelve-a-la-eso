import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

// Crear servidor HTTP (necesario para que Render lo detecte como activo)
const server = createServer();

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Servidor WebSocket escuchando en puerto ${port}`);
});
