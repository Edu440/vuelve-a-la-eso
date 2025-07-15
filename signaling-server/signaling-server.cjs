const WebSocket = require('ws');
const PORT = process.env.PORT || 3001;

const wss = new WebSocket.Server({ port: PORT });

const clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);

  ws.on('message', (message) => {
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) clients.splice(index, 1);
  });
});

console.log(`Servidor WebSocket activo en el puerto ${PORT}`);
