import { WebSocketServer } from 'ws';

function peerProxy(httpServer) {

    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        socket.on('message', (data) => {
            const msg = String.fromCharCode(...data);
            console.log('recieved: %s', msg);
            socket.send(`I heard you say "${msg}"`);
         //function message(data){ 
        //     socketServer.clients.forEach((client) => {
        //         if (client !== socket && client.readyState === WebSocket.OPEN) {
        //             client.send(data);
        //         }
        //     });
        });
        
        //socket.send('Hello webSocket');
        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    setInterval(() => {
        socketServer.clients.forEach(function each(client){
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);
}

export {
    peerProxy
}